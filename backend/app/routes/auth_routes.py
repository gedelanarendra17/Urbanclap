from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import UserCreate, TokenResponse
from app.services.auth_service import create_user, authenticate_user, create_tokens_for_user, get_user_by_email
from app.auth.auth import create_access_token, create_refresh_token, get_password_hash, jwt, SECRET_KEY, ALGORITHM
from app.utils.email_utils import send_verification_email, send_password_reset_email
from app.models.models import EmailVerificationToken, PasswordResetToken, User
from app.auth.deps import get_current_user
from datetime import datetime, timedelta
import uuid
import os

router = APIRouter()

VERIFICATION_TOKEN_EXPIRY_HOURS = 24
PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 2
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")


@router.post("/register", response_model=dict)
def register(
    user_in: UserCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    existing = get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    # check phone uniqueness separately for a cleaner error
    from app.models.models import User as UserModel
    existing_phone = db.query(UserModel).filter(UserModel.phone == user_in.phone).first()
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this phone number already exists",
        )
    user = create_user(
        db,
        email=user_in.email,
        phone=user_in.phone,
        full_name=user_in.full_name,
        password=user_in.password,
    )
    # Auto-verify for now (no real email service configured)
    user.is_verified = True
    db.add(user)
    db.commit()
    return {"msg": "Registration successful! You can now log in."}


@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    v = db.query(EmailVerificationToken).filter(EmailVerificationToken.token == token).first()
    if not v or v.used:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or used token")
    if v.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token expired")
    user = db.query(User).filter(User.id == v.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = True
    v.used = True
    db.add(user)
    db.add(v)
    db.commit()
    return {"msg": "Email verified successfully."}


@router.post("/login", response_model=TokenResponse)
def login(form_data: dict, db: Session = Depends(get_db)):
    email = form_data.get("email")
    password = form_data.get("password")
    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and password required",
        )
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token, refresh_token = create_tokens_for_user(user)
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(payload: dict):
    refresh = payload.get("refresh_token")
    if not refresh:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Refresh token required")
    try:
        data = jwt.decode(refresh, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = data.get("sub")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    access = create_access_token({"sub": user_id})
    new_refresh = create_refresh_token({"sub": user_id})
    return {"access_token": access, "refresh_token": new_refresh, "token_type": "bearer"}


@router.post("/request-password-reset")
def request_password_reset(
    payload: dict,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email required")
    user = get_user_by_email(db, email)
    if not user:
        return {"msg": "If the email exists, a reset link has been sent."}
    token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=PASSWORD_RESET_TOKEN_EXPIRY_HOURS)
    pr = PasswordResetToken(user_id=user.id, token=token, expires_at=expires_at)
    db.add(pr)
    db.commit()
    background_tasks.add_task(send_password_reset_email, email, token)
    return {"msg": "If the email exists, a reset link has been sent."}


@router.post("/reset-password")
def reset_password(payload: dict, db: Session = Depends(get_db)):
    token = payload.get("token")
    new_password = payload.get("new_password")
    if not token or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token and new_password required",
        )
    pr = db.query(PasswordResetToken).filter(PasswordResetToken.token == token).first()
    if not pr or pr.used:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or used token")
    if pr.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token expired")
    user = db.query(User).filter(User.id == pr.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.hashed_password = get_password_hash(new_password)
    pr.used = True
    db.add(user)
    db.add(pr)
    db.commit()
    return {"msg": "Password reset successful."}


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "phone": current_user.phone,
        "role": current_user.role.value,
        "is_verified": current_user.is_verified,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at.isoformat(),
    }


@router.post("/google/callback", response_model=TokenResponse)
def google_callback(payload: dict, db: Session = Depends(get_db)):
    """
    Receives an authorization code from the frontend (auth-code flow),
    exchanges it with Google for user info, then creates/logs in the user.
    """
    code = payload.get("code")
    if not code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Authorization code required")

    if not GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth not configured. Set GOOGLE_CLIENT_ID on the server.",
        )

    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "https://web-tau-bay-24.vercel.app")

    # Exchange code for tokens with Google
    import httpx as _httpx
    token_resp = _httpx.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": "postmessage",  # used by @react-oauth/google auth-code flow
            "grant_type": "authorization_code",
        },
    )
    if token_resp.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google token exchange failed: {token_resp.text}",
        )

    google_tokens = token_resp.json()
    id_token_str = google_tokens.get("id_token")

    if not id_token_str:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No ID token from Google")

    # Verify and decode the ID token
    try:
        from google.oauth2 import id_token as google_id_token
        from google.auth.transport import requests as google_requests
        idinfo = google_id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid Google token: {e}")

    email = idinfo.get("email")
    full_name = idinfo.get("name", email)
    google_sub = idinfo.get("sub", "")

    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not get email from Google")

    # Find or create user
    user = get_user_by_email(db, email)
    if not user:
        import secrets
        random_password = secrets.token_urlsafe(32)
        phone_placeholder = f"g_{google_sub[:20]}"
        # Check placeholder isn't taken
        existing_phone = db.query(User).filter(User.phone == phone_placeholder).first()
        if existing_phone:
            phone_placeholder = f"g_{uuid.uuid4().hex[:20]}"
        user = create_user(
            db,
            email=email,
            phone=phone_placeholder,
            full_name=full_name,
            password=random_password,
        )
        user.is_verified = True
        db.add(user)
        db.commit()
        db.refresh(user)

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")

    access_token, refresh_token = create_tokens_for_user(user)
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
