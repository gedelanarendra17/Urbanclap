from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.models import Base
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ServiceNow API",
    description="A marketplace for local services",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routes.auth_routes import router as auth_router
from app.routes.service_routes import router as service_router

app.include_router(auth_router, prefix="/api/auth")
app.include_router(service_router, prefix="/api/services")

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to ServiceNow API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
