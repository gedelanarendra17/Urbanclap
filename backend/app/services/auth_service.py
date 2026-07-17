from sqlalchemy.orm import Session
from app.models.models import User, UserRole
from app.auth.auth import verify_password, get_password_hash, create_access_token, create_refresh_token
from datetime import timedelta

ACCESS_TOKEN_EXPIRE_MINUTES = 60

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, phone: str, full_name: str, password: str, role: UserRole = UserRole.CUSTOMER):
    hashed = get_password_hash(password)
    user = User(email=email, phone=phone, full_name=full_name, hashed_password=hashed, role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_tokens_for_user(user):
    data = {"sub": str(user.id), "role": user.role.value}
    access_token = create_access_token(data, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token(data)
    return access_token, refresh_token
