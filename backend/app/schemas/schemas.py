from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    phone: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ServiceProviderCreate(BaseModel):
    business_name: str
    description: str
    years_of_experience: int

class ServiceProviderResponse(BaseModel):
    id: int
    business_name: str
    description: str
    rating: float
    total_reviews: int
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    category: str
    name: str
    description: str
    base_price: float
    duration_minutes: int

class ServiceResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str
    base_price: float
    duration_minutes: int
    rating: float
    total_reviews: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    service_id: int
    provider_id: int
    scheduled_date: datetime
    address: str
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    status: str
    scheduled_date: datetime
    address: str
    total_price: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    payment_method: str

class PaymentResponse(BaseModel):
    id: int
    booking_id: int
    amount: float
    status: str
    transaction_id: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class ReviewCreate(BaseModel):
    booking_id: int
    rating: int
    comment: str

class ReviewResponse(BaseModel):
    id: int
    booking_id: int
    rating: int
    comment: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int
    role: str
