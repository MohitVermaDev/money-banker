from models.transaction import Transaction
from core.database import SessionLocal
from schemas.transaction import TransactionCreate
from sqlalchemy.orm import Session

class ExpenseService:
    @staticmethod
    def create_expense(user_id: int, expense_data: TransactionCreate):
        db: Session = SessionLocal()
        expense = Transaction(**expense_data.dict(), user_id=user_id)
        db.add(expense)
        db.commit()
        db.refresh(expense)
        return expense

    @staticmethod
    def get_user_expenses(user_id: int):
        db: Session = SessionLocal()
        expenses = db.query(Transaction).filter(Transaction.user_id == user_id, Transaction.type=='expense').all()
        return expenses

    @staticmethod
    def delete_expense(user_id: int, expense_id: int):
        db: Session = SessionLocal()
        expense = db.query(Transaction).filter(Transaction.id == expense_id, Transaction.user_id == user_id, Transaction.type=='expense').first()
        if expense:
            db.delete(expense)
            db.commit()
            return True
        return False
