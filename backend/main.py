from fastapi import FastAPI
from core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import auth, income, expense, otp, report, bank, transaction

app = FastAPI(title="Money Banker")

origins = [
    "http://localhost:3000",  # React frontend (adjust if needed)
    "http://192.168.1.35:3000",
    "*",  # Allow all origins (for development only)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(bank.router)
app.include_router(income.router)
app.include_router(expense.router)
app.include_router(otp.router)
app.include_router(report.router)
app.include_router(transaction.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Money Banker API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
    # uvicorn main:app --host 0.0.0.0 --port 8000

