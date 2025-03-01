import random
import smtplib
from email.message import EmailMessage
from core.config import settings
from core.database import SessionLocal
from models.user import User

class OTPService:
    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    @staticmethod
    def send_otp(email: str, otp: str):
        msg = EmailMessage()
        msg["Subject"] = "Your OTP Code"
        msg["From"] = settings.SMTP_USERNAME
        msg["To"] = email
        msg.set_content(f"Your OTP code is: {otp}")

        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)

    @staticmethod
    def store_otp(email: str, otp: str):
        db = SessionLocal()
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.otp = otp
            db.commit()
        db.close()

    @staticmethod
    def verify_otp(email: str, otp: str):
        db = SessionLocal()
        user = db.query(User).filter(User.email == email, User.otp == otp).first()
        if user:
            user.otp = None  # Clear OTP after verification
          
