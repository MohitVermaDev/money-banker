from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from core.config import settings
from routers.response import standard_response
# from schemas.user import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class EXHTTP(HTTPException):
    data = {}
    # def __str__(self):
    #     return standard_response(False,self.status_code,self.detail)


def get_current_user(token: str = Depends(oauth2_scheme)) -> int:
    """Extracts user ID from the JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = payload.get("id")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception
