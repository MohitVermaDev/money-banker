from core.database import SessionLocal
from models.transaction import Transaction
from sqlalchemy.orm import Session
from datetime import datetime, date
from sqlalchemy import func
from typing import List, Dict

class ReportService:
    @staticmethod
    def get_monthly_summary(user_id: int, year: int, month: int) -> Dict[str, float]:
        db: Session = SessionLocal()
        
        income_total = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.type == 'income',
            Transaction.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).with_entities(func.sum(Transaction.amount)).scalar() or 0

        expense_total = db.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.type == 'expense',
            Transaction.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).with_entities(func.sum(Transaction.amount)).scalar() or 0

        db.close()
        return {"total_income": income_total, "total_expense": expense_total, "balance": income_total - expense_total}

    @staticmethod
    def get_category_summary(user_id: int, year: int, month: int) -> List[Dict[str, float]]:
        db: Session = SessionLocal()
        category_expenses = db.query(Transaction.category, func.sum(Transaction.amount)).filter(
            Transaction.user_id == user_id,
            Transaction.date.between(date(year, month, 1), date(year, month + 1, 1))
        ).group_by(Transaction.category).all()

        db.close()
        return [{"category": category, "total_spent": total} for category, total in category_expenses]
