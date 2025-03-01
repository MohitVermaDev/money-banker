from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class IncomeBase(BaseModel):
    amount: float = Field(..., gt=0, description="Amount of income")
    source: str = Field(..., min_length=1, description="Source of income")
    bank_id: Optional[int] = None

class IncomeCreate(IncomeBase):
    pass

class IncomeResponse(IncomeBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
