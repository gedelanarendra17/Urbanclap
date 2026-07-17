import logging
import os

logger = logging.getLogger(__name__)

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://web-tau-bay-24.vercel.app")


def send_verification_email(email: str, token: str):
    verification_link = f"{FRONTEND_URL}/verify-email?token={token}"
    logger.info(f"[EMAIL] Verification for {email}: {verification_link}")
    print(f"[EMAIL] To: {email} | Verify at: {verification_link}", flush=True)


def send_password_reset_email(email: str, token: str):
    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"
    logger.info(f"[EMAIL] Password reset for {email}: {reset_link}")
    print(f"[EMAIL] To: {email} | Reset at: {reset_link}", flush=True)
