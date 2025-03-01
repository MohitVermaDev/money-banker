from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from schemas.user import UserLogin, UserCreate
from services.auth import AuthService
from routers.response import standard_response

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate):
    try:
        AuthService.register_user(user.email, user.password)
        token = AuthService.authenticate_user(user.email, user.password)
        if not token:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return standard_response(True, 200, "Registration succesfull", data={'token':token})
    except IntegrityError as e:
        return standard_response(False, 300, 'Duplicate Entry')
    except HTTPException as e:
        return standard_response(False, e.status_code, e.detail)
    except Exception as e:
        return standard_response(False, 300, repr(e))

@router.post("/login")
def login(user: UserLogin):
    try:
        token = AuthService.authenticate_user(user.email, user.password)
        if not token:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return standard_response(True, 200, "Login succesfull", data={'token':token})
    except HTTPException as e:
        return standard_response(False, e.status_code, e.detail)
    except Exception as e:
        return standard_response(False, 300, repr(e))
    
