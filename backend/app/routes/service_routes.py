from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.services.service_service import list_services, get_service, create_service, update_service, soft_delete_service
from app.auth.deps import get_current_user
from app.models.models import ServiceProvider, UserRole

router = APIRouter()

@router.get("/", response_model=List[dict])
def services_list(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    svcs = list_services(db, skip, limit)
    return [
        {
            "id": s.id,
            "name": s.name,
            "category": s.category,
            "description": s.description,
            "base_price": s.base_price,
            "duration_minutes": s.duration_minutes,
            "provider_id": s.provider_id,
        }
        for s in svcs
    ]

@router.get("/{service_id}")
def service_detail(service_id: int, db: Session = Depends(get_db)):
    s = get_service(db, service_id)
    if not s:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return {
        "id": s.id,
        "name": s.name,
        "category": s.category,
        "description": s.description,
        "base_price": s.base_price,
        "duration_minutes": s.duration_minutes,
        "provider_id": s.provider_id,
    }

@router.post("/")
def service_create(payload: dict, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Only providers can create services
    if current_user.role.name != UserRole.PROVIDER.name and current_user.role.value != UserRole.PROVIDER.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only providers can create services")
    provider = db.query(ServiceProvider).filter(ServiceProvider.user_id == current_user.id).first()
    if not provider:
        # auto-create provider profile
        provider = ServiceProvider(user_id=current_user.id, business_name=current_user.full_name, description="", years_of_experience=0)
        db.add(provider)
        db.commit()
        db.refresh(provider)
    svc = create_service(db, provider, payload)
    return {"msg": "Service created", "service_id": svc.id}

@router.put("/{service_id}")
def service_update(service_id: int, payload: dict, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    svc = db.query(Service).filter(Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if svc.provider.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to edit this service")
    updated = update_service(db, svc, payload)
    return {"msg": "Service updated", "service_id": updated.id}

@router.delete("/{service_id}")
def service_delete(service_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    svc = db.query(Service).filter(Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if svc.provider.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete this service")
    soft_delete_service(db, svc)
    return {"msg": "Service deleted"}
