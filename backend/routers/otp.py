from fastapi import APIRouter
from services.otp import OTPService

router = APIRouter(prefix="/otp", tags=["OTP"])

@router.post("/send")
def send_otp(email: str):
    otp = OTPService.generate_otp()
    OTPService.store_otp(email, otp)
    OTPService.send_otp(email, otp)
    return {"message": "OTP sent successfully"}

@router.post("/verify")
def verify_otp(email: str, otp: str):
    if OTPService.verify_otp(email, otp):
        return {"message": "OTP verified"}
    return {"message": "Invalid OTP"}
