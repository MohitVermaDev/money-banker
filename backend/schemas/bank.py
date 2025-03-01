from pydantic import BaseModel, Field
from typing import Optional

class BankBase(BaseModel):
    name: str = Field(..., min_length=1, description="Name of the bank")
    account_number: str = Field(..., min_length=5, description="Bank account number")
    balance: float = Field(0, description="Current balance in the bank account")

class BankCreate(BankBase):
    pass

class BankResponse(BankBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
