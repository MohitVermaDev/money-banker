from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"

class TransactionBase(BaseModel):
    amount: float = Field(..., gt=0, description="Transaction amount")
    description: str | None = None
    type: TransactionType
    bank_id: int | None = None
    category: str | None
    transaction_date: datetime = Field(..., description="Transaction date in YYYY-MM-DD format")

    @classmethod
    def validate_transaction_date(cls, value: datetime):
        if not isinstance(value, datetime):
            raise ValueError("Invalid transaction date format. Must be YYYY-MM-DD.")
        return value

class TransferCreate(TransactionBase):
    from_account: int | None = None
    to_account: int | None = None
    type: TransactionType = TransactionType.TRANSFER

class TransactionCreate(TransactionBase):
    pass

class IncomeCreate(TransactionBase):
    type: TransactionType = TransactionType.INCOME

class ExpenseCreate(TransactionBase):
    type: TransactionType = TransactionType.EXPENSE

class TransactionResponse(BaseModel):
    status: bool
    code: int
    message: str
    data: dict
    
    class Config:
        from_attributes = True

class TransactionDelete(BaseModel):
    id: int
