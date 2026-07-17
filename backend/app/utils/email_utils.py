import logging

logger = logging.getLogger(__name__)

def send_verification_email(email: str, token: str):
    # Placeholder - integrate real email provider (SendGrid, SES, SMTP) in production
    verification_link = f"http://localhost:3000/verify-email?token={token}"
    logger.info(f"Verification email for {email}: {verification_link}")
    print(f"[EMAIL] To: {email} | Verify at: {verification_link}")

def send_password_reset_email(email: str, token: str):
    reset_link = f"http://localhost:3000/reset-password?token={token}"
    logger.info(f"Password reset email for {email}: {reset_link}")
    print(f"[EMAIL] To: {email} | Reset at: {reset_link}")
