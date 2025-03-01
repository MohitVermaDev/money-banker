from fastapi import APIRouter, Depends
from schemas.transaction import ExpenseCreate, TransactionDelete
from services.expense import ExpenseService
from routers.response import standard_response
from core.jwt_token import get_current_user

router = APIRouter(prefix="/expenses", tags=["Bank"])

@router.post("/create")
def create_bank(bank: ExpenseCreate, user_id: int = Depends(get_current_user)):
    try:
        ExpenseService.create_expense(user_id, bank)
        return standard_response(True, 200, "Expense Created succesfully")
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.get("/list")
def list(user_id: int = Depends(get_current_user)):
    try:
        banks = ExpenseService.get_user_expenses(user_id)
        return standard_response(True, 200, "Expense List", data=banks)
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.delete("/delete")
def delete(bank: TransactionDelete, user_id: int = Depends(get_current_user)):
    try:
        expense_result = ExpenseService.delete_expense(user_id, bank.id)
        if not expense_result:
            raise Exception("Expense Not Found")
        return standard_response(True, 200, "Expense deleted succesfull")
    except Exception as e:
        return standard_response(False, 300, str(e))
