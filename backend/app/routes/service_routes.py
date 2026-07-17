from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.services.service_service import list_services, get_service, create_service, update_service, soft_delete_service
from app.auth.deps import get_current_user
from app.models.models import Service, ServiceProvider, UserRole, User

router = APIRouter()

GARDENING_SERVICES = [
    {"name": "Lawn Care & Mowing",       "category": "Gardening", "description": "Professional lawn mowing, edging, and trimming to keep your grass neat and healthy.", "base_price": 499,  "duration_minutes": 120},
    {"name": "Plant & Tree Planting",    "category": "Gardening", "description": "Expert planting of flowers, shrubs, trees, and seasonal plants with soil preparation.", "base_price": 799,  "duration_minutes": 180},
    {"name": "Garden Design & Landscaping", "category": "Gardening", "description": "Transform your outdoor space with custom garden design, layout planning, and installation.", "base_price": 2499, "duration_minutes": 480},
    {"name": "Pruning & Trimming",       "category": "Gardening", "description": "Skilled pruning of trees, hedges, and ornamental plants to promote healthy growth.", "base_price": 599,  "duration_minutes": 150},
    {"name": "Weeding & Soil Care",      "category": "Gardening", "description": "Complete removal of weeds with soil aeration and mulching for healthier plants.", "base_price": 399,  "duration_minutes": 90},
    {"name": "Drip Irrigation Setup",    "category": "Gardening", "description": "Installation of water-efficient drip irrigation for gardens and potted plant collections.", "base_price": 1999, "duration_minutes": 240},
    {"name": "Potted Plant Service",     "category": "Gardening", "description": "Selection, planting, and arrangement of indoor and outdoor potted plants with repotting.", "base_price": 349,  "duration_minutes": 60},
    {"name": "Garden Pest Control",      "category": "Gardening", "description": "Eco-friendly pest and disease treatment for plants, lawns, and vegetable gardens.", "base_price": 699,  "duration_minutes": 120},
    {"name": "Kitchen Garden Setup",     "category": "Gardening", "description": "Create your own organic kitchen garden with bed setup, soil prep, and vegetable/herb planting.", "base_price": 1299, "duration_minutes": 300},
]


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
            "rating": s.rating,
            "total_reviews": s.total_reviews,
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
        "rating": s.rating,
        "total_reviews": s.total_reviews,
    }


@router.post("/")
def service_create(
    payload: dict,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role.value != UserRole.PROVIDER.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only providers can create services",
        )
    provider = db.query(ServiceProvider).filter(ServiceProvider.user_id == current_user.id).first()
    if not provider:
        provider = ServiceProvider(
            user_id=current_user.id,
            business_name=current_user.full_name,
            description="",
            years_of_experience=0,
        )
        db.add(provider)
        db.commit()
        db.refresh(provider)
    svc = create_service(db, provider, payload)
    return {"msg": "Service created", "service_id": svc.id}


@router.put("/{service_id}")
def service_update(
    service_id: int,
    payload: dict,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    svc = db.query(Service).filter(Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if svc.provider.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to edit this service")
    updated = update_service(db, svc, payload)
    return {"msg": "Service updated", "service_id": updated.id}


@router.delete("/{service_id}")
def service_delete(
    service_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    svc = db.query(Service).filter(Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    if svc.provider.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete this service")
    soft_delete_service(db, svc)
    return {"msg": "Service deleted"}


@router.post("/seed-gardening", response_model=dict)
def seed_gardening_services(db: Session = Depends(get_db)):
    """
    Seeds the database with gardening & planting services.
    Creates a system provider if one doesn't exist.
    Safe to call multiple times — skips services that already exist.
    """
    # Find or create a system provider user
    system_user = db.query(User).filter(User.email == "system@servicenow.app").first()
    if not system_user:
        from app.auth.auth import get_password_hash
        system_user = User(
            email="system@servicenow.app",
            phone="system_provider_001",
            full_name="ServiceNow Provider",
            hashed_password=get_password_hash("seed-no-login"),
            role=UserRole.PROVIDER,
            is_active=True,
            is_verified=True,
        )
        db.add(system_user)
        db.commit()
        db.refresh(system_user)

    # Find or create provider profile
    provider = db.query(ServiceProvider).filter(ServiceProvider.user_id == system_user.id).first()
    if not provider:
        provider = ServiceProvider(
            user_id=system_user.id,
            business_name="ServiceNow Gardening Experts",
            description="Certified horticulture professionals",
            rating=4.8,
            total_reviews=500,
            is_verified=True,
            years_of_experience=10,
        )
        db.add(provider)
        db.commit()
        db.refresh(provider)

    created = []
    skipped = []
    for svc_data in GARDENING_SERVICES:
        existing = db.query(Service).filter(
            Service.name == svc_data["name"],
            Service.category == "Gardening",
        ).first()
        if existing:
            skipped.append(svc_data["name"])
            continue
        svc = Service(
            provider_id=provider.id,
            category=svc_data["category"],
            name=svc_data["name"],
            description=svc_data["description"],
            base_price=svc_data["base_price"],
            duration_minutes=svc_data["duration_minutes"],
            rating=4.8,
            total_reviews=50,
            is_active=True,
        )
        db.add(svc)
        created.append(svc_data["name"])

    db.commit()
    return {
        "msg": f"Seeded {len(created)} gardening services",
        "created": created,
        "skipped": skipped,
    }
