from fastapi import APIRouter, Depends
from schemas.income import IncomeCreate, IncomeResponse
from services.income import IncomeService

router = APIRouter(prefix="/income", tags=["Income"])

@router.post("/", response_model=IncomeResponse)
def add_income(income: IncomeCreate, user_id: int):
    return IncomeService.create_income(user_id, income)

@router.get("/")
def get_incomes(user_id: int):
    return IncomeService.get_user_incomes(user_id)
