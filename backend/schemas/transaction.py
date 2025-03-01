from pydantic import BaseModel, Field
from enum import Enum

class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"

class TransactionBase(BaseModel):
    amount: float = Field(..., gt=0, description="Transaction amount")
    description: str | None = None
    type: TransactionType
    bank_id: int | None = None
    category: str | None

class TransactionCreate(TransactionBase):
    pass

class IncomeCreate(TransactionBase):
    type: TransactionType = 'income'

class ExpenseCreate(TransactionBase):
    type: TransactionType = 'expense'

class TransactionResponse(BaseModel):
    status: bool
    code: int
    message: str
    data: dict
    
    class Config:
        from_attributes = True

class TransactionDelete(BaseModel):
    id: int
