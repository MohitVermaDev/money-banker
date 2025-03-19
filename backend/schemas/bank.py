from pydantic import BaseModel, Field
from typing import Optional

class BankBase(BaseModel):
    name: str = Field(..., min_length=1, description="Name of the bank")
    account_number: str = Field(..., min_length=5, description="Bank account number")
    is_credit_allow: bool

class BankCreate(BankBase):
    pass

class BankDelete(BaseModel):
    id: int

class BankResponse(BankBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
