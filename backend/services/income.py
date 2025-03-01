from models.transaction import Transaction
from core.database import SessionLocal
from schemas.transaction import TransactionCreate
from sqlalchemy.orm import Session

class IncomeService:
    @staticmethod
    def create_income(user_id: int, income_data: TransactionCreate):
        db: Session = SessionLocal()
        income = Transaction(**income_data.model_dump(), user_id=user_id)
        db.add(income)
        db.commit()
        db.refresh(income)
        return income

    @staticmethod
    def get_user_incomes(user_id: int):
        db: Session = SessionLocal()
        incomes = db.query(Transaction).filter(Transaction.user_id == user_id, Transaction.type=='income').all()
        return incomes

    @staticmethod
    def delete_income(user_id: int, income_id: int):
        db: Session = SessionLocal()
        income = db.query(Transaction).filter(Transaction.id == income_id, Transaction.user_id == user_id, Transaction.type=='income').first()
        if income:
            db.delete(income)
            db.commit()
            return True
        return False
