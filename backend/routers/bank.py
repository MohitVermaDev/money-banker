from fastapi import APIRouter, Depends
from schemas.bank import BankCreate, BankDelete
from services.bank import BankService
from routers.response import standard_response
from core.jwt_token import get_current_user

router = APIRouter(prefix="/bank", tags=["Bank"])

@router.post("/create")
def create_bank(bank: BankCreate, user_id: int = Depends(get_current_user)):
    try:
        BankService.create_bank(user_id, bank)
        return standard_response(True, 200, "Bank Created succesfully")
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.get("/list")
def list(user_id: int = Depends(get_current_user)):
    try:
        banks = BankService.get_user_banks(user_id)
        return standard_response(True, 200, "Bank List", data=banks)
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.delete("/delete")
def delete(bank: BankDelete, user_id: int = Depends(get_current_user)):
    try:
        bank_result = BankService.delete_bank(user_id, bank.id)
        if not bank_result:
            raise Exception("Bank Not Found")
        return standard_response(True, 200, "Bank deleted succesfull")
    except Exception as e:
        return standard_response(False, 300, str(e))

