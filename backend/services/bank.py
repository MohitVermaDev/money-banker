from models.bank import Bank
from core.database import SessionLocal
from schemas.bank import BankCreate
from sqlalchemy.orm import Session
from sqlalchemy.sql import func, case
from models.transaction import Transaction, TransactionType

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
    def get_user_banks(user_id: int, is_credit_allowed):
        db: Session = SessionLocal()
        total_income = func.coalesce(
            func.sum(case((Transaction.type == TransactionType.INCOME, Transaction.amount), else_=0)), 0
        ).label("total_income")

        total_expense = func.coalesce(
            func.sum(case((Transaction.type == TransactionType.EXPENSE, Transaction.amount), else_=0)), 0
        ).label("total_expense")

        net_balance = (total_income - total_expense).label("net_balance")

        query = (
            db.query(
                Bank.id,
                Bank.name,
                Bank.account_number,
                Bank.is_credit_allow,
                total_income,
                total_expense,
                net_balance
            )
            .outerjoin(Transaction, Bank.id == Transaction.bank_id)
            .filter(Bank.user_id == user_id)
            .group_by(Bank.id)
        )

        if is_credit_allowed != -1 and is_credit_allowed is not None:
            query = query.filter(Bank.is_credit_allow == True)

        results = query.all()

        banks = [
            {
                "id": bank.id,
                "name": bank.name,
                "account_number": bank.account_number,
                "is_credit_allow": bank.is_credit_allow,
                "total_income": bank.total_income or 0,
                "total_expense": bank.total_expense or 0,
                "net_balance": bank.net_balance or 0,
            }
            for bank in results
        ]

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
