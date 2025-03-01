from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ExpenseBase(BaseModel):
    amount: float = Field(..., gt=0, description="Amount of expense")
    category: str = Field(..., min_length=1, description="Expense category")
    bank_id: Optional[int] = None
    is_cash: bool = False

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseResponse(ExpenseBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
