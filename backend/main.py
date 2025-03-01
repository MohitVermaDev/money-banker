from fastapi import FastAPI
from core.database import Base, engine
from routers import auth, income, expense, otp, report

app = FastAPI(title="Money Banker")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(income.router)
app.include_router(expense.router)
app.include_router(otp.router)
app.include_router(report.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Money Banker API"}
