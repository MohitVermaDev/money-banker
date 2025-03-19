from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from core.database import Base

class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    account_number = Column(String(255), unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_credit_allow = Column(Boolean, nullable=True, default=True)

    user = relationship("User", back_populates="banks")
    transactions = relationship("Transaction", back_populates="bank")
