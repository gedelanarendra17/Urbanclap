from sqlalchemy.orm import Session
from app.models.models import Service, ServiceProvider

def list_services(db: Session, skip: int = 0, limit: int = 50):
    return db.query(Service).filter(Service.is_active == True).offset(skip).limit(limit).all()

def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id, Service.is_active == True).first()

def create_service(db: Session, provider: ServiceProvider, data):
    svc = Service(
        provider_id=provider.id,
        category=data.get('category'),
        name=data.get('name'),
        description=data.get('description'),
        base_price=data.get('base_price'),
        duration_minutes=data.get('duration_minutes')
    )
    db.add(svc)
    db.commit()
    db.refresh(svc)
    return svc

def update_service(db: Session, service: Service, data):
    for k, v in data.items():
        if hasattr(service, k):
            setattr(service, k, v)
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

def soft_delete_service(db: Session, service: Service):
    service.is_active = False
    db.add(service)
    db.commit()
    return service
