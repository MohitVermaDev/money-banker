from models.transaction import Transaction
from core.database import SessionLocal
from schemas.transaction import TransferCreate, TransactionType
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from datetime import datetime

class TransactionService:
    @staticmethod
    def create_transfer(user_id: int, transfer: TransferCreate):
        db: Session = SessionLocal()
        from_data = {
            "amount":transfer.amount,
            "bank_id":transfer.from_account,
            "category":transfer.category,
            "description":transfer.description,
            "transaction_date":transfer.transaction_date,
            "type":TransactionType.EXPENSE
        }
        to_data = {
            "amount":transfer.amount,
            "bank_id":transfer.to_account,
            "category":transfer.category,
            "description":transfer.description,
            "transaction_date":transfer.transaction_date,
            "type":TransactionType.INCOME
        }
        f_data = Transaction(**from_data, user_id=user_id)
        t_data = Transaction(**to_data, user_id=user_id)
        db.add(f_data)
        db.add(t_data)
        db.commit()
        db.refresh(f_data)
        db.refresh(t_data)
        return f_data

    @staticmethod
    def get_user_transactions(user_id: int, from_date: str, to_date: str, page: int = 1, page_size: int = 10):
        db: Session = SessionLocal()
        
        # Convert string dates to datetime
        from_date_obj = datetime.strptime(from_date, "%Y-%m-%d")
        to_date_obj = datetime.strptime(to_date, "%Y-%m-%d")

        query = (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= from_date_obj,
                Transaction.transaction_date <= to_date_obj
            )
            .order_by(Transaction.id.desc())
            .options(joinedload(Transaction.bank))  # Load bank details
        )

        # Pagination logic
        total_count = query.count()
        transactions = query.offset((page - 1) * page_size).limit(page_size).all()

        result = [
            {
                "id": txn.id,
                "amount": txn.amount,
                "category": txn.category,
                "description": txn.description,
                "type": txn.type.value,
                "transaction_date": txn.transaction_date.strftime("%Y-%m-%d"),
                "bank_name": txn.bank.name if txn.bank else "N/A"  # Include bank name
            }
            for txn in transactions
        ]

        return {
            "transactions": result,
            "total_pages": (total_count + page_size - 1) // page_size,
            "current_page": page,
            "total_count": total_count
        }

    # @staticmethod
    # def delete_transfer(user_id: int, income_id: int):
    #     db: Session = SessionLocal()
    #     income = db.query(Transaction).filter(Transaction.id == income_id, Transaction.user_id == user_id, Transaction.type=='income').first()
    #     if income:
    #         db.delete(income)
    #         db.commit()
    #         return True
    #     return False
