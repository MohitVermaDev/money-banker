from fastapi import APIRouter
from services.report import ReportService

router = APIRouter(prefix="/report", tags=["Report"])

@router.get("/monthly")
def get_monthly_report(user_id: int, year: int, month: int):
    return ReportService.get_monthly_summary(user_id, year, month)

@router.get("/category")
def get_category_report(user_id: int, year: int, month: int):
    return ReportService.get_category_summary(user_id, year, month)
