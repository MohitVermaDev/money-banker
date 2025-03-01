from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base
from passlib.hash import bcrypt

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(255), default="member")

    banks = relationship("Bank", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")

    def set_password(self, password: str):
        self.password_hash = bcrypt.hash(password)

    def verify_password(self, password: str) -> bool:
        return bcrypt.verify(password, self.password_hash)
