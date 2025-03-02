from models.user import User
from core.database import SessionLocal
from passlib.hash import bcrypt
import jwt
import datetime
from core.config import settings

class AuthService:
    @staticmethod
    def register_user(email, password, name):
        db = SessionLocal()
        hashed_password = bcrypt.hash(password)
        user = User(email=email, password=hashed_password, name=name)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def authenticate_user(email, password):
        db = SessionLocal()
        user = db.query(User).filter(User.email == email).first()
        if user and bcrypt.verify(password, user.password):
            return jwt.encode({"id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, settings.SECRET_KEY)
        return None
