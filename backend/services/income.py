from models.income import Income
from core.database import SessionLocal
from schemas.income import IncomeCreate
from sqlalchemy.orm import Session

class IncomeService:
    @staticmethod
    def create_income(user_id: int, income_data: IncomeCreate):
        db: Session = SessionLocal()
        income = Income(**income_data.dict(), user_id=user_id)
        db.add(income)
        db.commit()
        db.refresh(income)
        return income

    @staticmethod
    def get_user_incomes(user_id: int):
        db: Session = SessionLocal()
        incomes = db.query(Income).filter(Income.user_id == user_id).all()
        return incomes

    @staticmethod
    def delete_income(user_id: int, income_id: int):
        db: Session = SessionLocal()
        income = db.query(Income).filter(Income.id == income_id, Income.user_id == user_id).first()
        if income:
            db.delete(income)
            db.commit()
            return True
        return False
