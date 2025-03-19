from fastapi import APIRouter, Depends, Query
from schemas.transaction import TransferCreate
from services.transaction import TransactionService
from datetime import datetime
from routers.response import standard_response
from core.jwt_token import get_current_user

router = APIRouter(prefix="/transaction", tags=["Bank"])

@router.post("/transfer/create")
def create_transfer(transfer: TransferCreate, user_id: int = Depends(get_current_user)):
    try:
        print(transfer)
        TransactionService.create_transfer(user_id, transfer)
        return standard_response(True, 200, "transfer Created succesfully")
    except Exception as e:
        return standard_response(False, 300, str(e))

@router.get("/list")
def list(
    user_id: int = Depends(get_current_user),
    from_date: str = Query(..., description="Start date (YYYY-MM-DD)"),
    to_date: str = Query(..., description="End date (YYYY-MM-DD)"),
    page: int = Query(1, description="Page number", ge=1),
    page_size: int = Query(10, description="Items per page", ge=1)
):
    try:
        # Validate date format
        datetime.strptime(from_date, "%Y-%m-%d")
        datetime.strptime(to_date, "%Y-%m-%d")

        transactions = TransactionService.get_user_transactions(user_id, from_date, to_date, page, page_size)
        return standard_response(True, 200, "Transaction List", data=transactions)

    except ValueError:
        return standard_response(False, 400, "Invalid date format. Use YYYY-MM-DD.")
    
    except Exception as e:
        return standard_response(False, 500, str(e))
