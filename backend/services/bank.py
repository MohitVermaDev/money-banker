from models.bank import Bank
from core.database import SessionLocal
from schemas.bank import BankCreate
from sqlalchemy.orm import Session

class BankService:
    @staticmethod
    def create_bank(user_id: int, bank_data: BankCreate):
        print(bank_data.model_dump())
        db: Session = SessionLocal()
        bank = Bank(**bank_data.model_dump(), user_id=user_id)
        db.add(bank)
        db.commit()
        db.refresh(bank)
        return bank

    @staticmethod
    def get_user_banks(user_id: int):
        db: Session = SessionLocal()
        banks = db.query(Bank).filter(Bank.user_id == user_id).all()
        return banks

    @staticmethod
    def delete_bank(user_id: int, bank_id: int):
        db: Session = SessionLocal()
        bank = db.query(Bank).filter(Bank.id == bank_id, Bank.user_id == user_id).first()
        if bank:
            db.delete(bank)
            db.commit()
            return True
        return False
