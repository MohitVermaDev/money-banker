from models.expense import Expense
from core.database import SessionLocal
from schemas.expense import ExpenseCreate
from sqlalchemy.orm import Session

class ExpenseService:
    @staticmethod
    def create_expense(user_id: int, expense_data: ExpenseCreate):
        db: Session = SessionLocal()
        expense = Expense(**expense_data.dict(), user_id=user_id)
        db.add(expense)
        db.commit()
        db.refresh(expense)
        return expense

    @staticmethod
    def get_user_expenses(user_id: int):
        db: Session = SessionLocal()
        expenses = db.query(Expense).filter(Expense.user_id == user_id).all()
        return expenses

    @staticmethod
    def delete_expense(user_id: int, expense_id: int):
        db: Session = SessionLocal()
        expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == user_id).first()
        if expense:
            db.delete(expense)
            db.commit()
            return True
        return False
