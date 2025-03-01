from fastapi import APIRouter, Depends
from schemas.transaction import IncomeCreate, TransactionDelete
from services.income import IncomeService
from routers.response import standard_response
from core.jwt_token import get_current_user

router = APIRouter(prefix="/income", tags=["Bank"])

@router.post("/create")
def create_bank(bank: IncomeCreate, user_id: int = Depends(get_current_user)):
    try:
        IncomeService.create_income(user_id, bank)
        return standard_response(True, 200, "Income Created succesfully")
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.get("/list")
def list(user_id: int = Depends(get_current_user)):
    try:
        banks = IncomeService.get_user_incomes(user_id)
        return standard_response(True, 200, "Income List", data=banks)
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.delete("/delete")
def delete(bank: TransactionDelete, user_id: int = Depends(get_current_user)):
    try:
        expense_result = IncomeService.delete_income(user_id, bank.id)
        if not expense_result:
            raise Exception("Income Not Found")
        return standard_response(True, 200, "Income deleted succesfull")
    except Exception as e:
        return standard_response(False, 300, str(e))
