from fastapi import APIRouter, Depends
from schemas.expense import ExpenseCreate, ExpenseResponse
from services.expense import ExpenseService

router = APIRouter(prefix="/expense", tags=["Expense"])

@router.post("/", response_model=ExpenseResponse)
def add_expense(expense: ExpenseCreate, user_id: int):
    return ExpenseService.create_expense(user_id, expense)

@router.get("/")
def get_expenses(user_id: int):
    return ExpenseService.get_user_expenses(user_id)
