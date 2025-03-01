from fastapi import APIRouter, Depends
from schemas.bank import BankCreate, BankResponse
from services.bank import BankService

router = APIRouter(prefix="/bank", tags=["Bank"])

@router.post("/", response_model=BankResponse)
def create_bank(bank: BankCreate):
    return BankService.create_bank(bank)
