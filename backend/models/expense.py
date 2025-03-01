from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String(255), nullable=False)
    bank_id = Column(Integer, ForeignKey("banks.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_cash = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="expenses")
    bank = relationship("Bank", back_populates="expenses")
