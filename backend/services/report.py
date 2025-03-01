from core.database import SessionLocal
from models.expense import Expense
from models.income import Income
from sqlalchemy.orm import Session
from datetime import datetime, date
from typing import List, Dict

class ReportService:
    @staticmethod
    def get_monthly_summary(user_id: int, year: int, month: int) -> Dict[str, float]:
        db: Session = SessionLocal()
        
        income_total = db.query(Income).filter(
            Income.user_id == user_id,
            Income.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).with_entities(func.sum(Income.amount)).scalar() or 0

        expense_total = db.query(Expense).filter(
            Expense.user_id == user_id,
            Expense.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).with_entities(func.sum(Expense.amount)).scalar() or 0

        db.close()
        return {"total_income": income_total, "total_expense": expense_total, "balance": income_total - expense_total}

    @staticmethod
    def get_category_summary(user_id: int, year: int, month: int) -> List[Dict[str, float]]:
        db: Session = SessionLocal()
        category_expenses = db.query(Expense.category, func.sum(Expense.amount)).filter(
            Expense.user_id == user_id,
            Expense.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).group_by(Expense.category).all()

        db.close()
        return [{"category": category, "total_spent": total} for category, total in category_expenses]
