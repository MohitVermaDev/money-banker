from sqlalchemy import Column, Integer, String, ForeignKey, Float, Enum, DateTime
from core.database import Base
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

class TransactionType(enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String(255), nullable=True)
    description = Column(String(255))
    type = Column(Enum(TransactionType), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    bank_id = Column(Integer, ForeignKey("banks.id"), nullable=True)
    transaction_date = Column(DateTime, nullable=False, default=datetime.utcnow)

    user = relationship("User", back_populates="transactions")
    bank = relationship("Bank", back_populates="transactions")
