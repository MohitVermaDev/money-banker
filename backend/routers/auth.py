from fastapi import APIRouter, Depends, HTTPException
from schemas.user import UserLogin, UserCreate
from services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate):
    return AuthService.register_user(user.email, user.password)

@router.post("/login")
def login(user: UserLogin):
    token = AuthService.authenticate_user(user.email, user.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}
