# Development Guide - UrbanClap App

## Architecture Overview

### Backend (FastAPI)
- RESTful API with JWT authentication
- SQLAlchemy ORM with SQLite/PostgreSQL
- Pydantic models for validation
- Service layer for business logic
- Support for real-time updates with WebSockets (future)

### Web (React + TypeScript)
- Component-based UI with Tailwind CSS
- State management with Zustand
- API client with Axios
- React Router for navigation
- React Query for server state management (configured)

### Mobile (Flutter)
- Cross-platform iOS & Android
- Provider package for state management
- HTTP client for API communication
- Local storage with shared_preferences

## Current Status

### ✅ Completed
- Project structure scaffolding
- Database models and schema
- FastAPI boilerplate
- React web app setup
- Flutter mobile app setup
- Docker configuration
- Authentication infrastructure

### 📋 Next Steps (Priority Order)

#### Phase 1: Backend Core (Week 1-2)
1. **Authentication Endpoints**
   - User registration with email/phone validation
   - Login with JWT token generation
   - Token refresh and logout
   - Password reset functionality

2. **User Management**
   - Create/update user profiles
   - Service provider profile setup
   - Role-based access control (RBAC)
   - Profile picture upload

3. **Service Management**
   - CRUD operations for services
   - Service search and filtering by category
   - Service ratings and reviews
   - Provider availability management

#### Phase 2: Booking & Payment (Week 2-3)
1. **Booking System**
   - Create/manage bookings
   - Booking status updates
   - Booking history
   - Calendar availability

2. **Payment Integration**
   - Stripe/Razorpay integration
   - Payment processing
   - Invoice generation
   - Refund handling

3. **Review System**
   - Submit reviews after booking
   - Rating calculation
   - Review moderation

#### Phase 3: Frontend Development (Week 3-4)
1. **Web App**
   - Service listing and search
   - Booking flow
   - User dashboard
   - Payment checkout
   - Admin panel (basic)

2. **Mobile App**
   - Service browsing
   - Booking creation
   - Payment handling
   - Push notifications (future)

#### Phase 4: Advanced Features (Week 4+)
- Real-time chat/messaging
- Location-based services (maps)
- Provider analytics
- Admin dashboard
- Automated emails/SMS

## Local Development Workflow

### 1. Backend Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env

# Run database migrations (when ready)
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --port 8000
```

Visit: http://localhost:8000/docs for API documentation

### 2. Web Development

```bash
cd web

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

Visit: http://localhost:3000

### 3. Mobile Development

```bash
cd mobile

# Get dependencies
flutter pub get

# Run on emulator or connected device
flutter run

# Build APK for Android
flutter build apk

# Build IPA for iOS
flutter build ios
```

## API Development Pattern

When implementing new endpoints:

1. **Define Schema** (`app/schemas/schemas.py`)
   ```python
   class MyRequestSchema(BaseModel):
       field: str
       ...
   
   class MyResponseSchema(BaseModel):
       id: int
       field: str
       ...
   ```

2. **Create Service** (`app/services/my_service.py`)
   ```python
   def create_my_item(db: Session, data: MyRequestSchema):
       # Business logic here
       pass
   ```

3. **Add Route** (`app/routes/my_routes.py`)
   ```python
   @router.post("/items", response_model=MyResponseSchema)
   def create_item(data: MyRequestSchema, db: Session = Depends(get_db)):
       return my_service.create_my_item(db, data)
   ```

4. **Register Route** (in `app/main.py`)
   ```python
   from app.routes import my_routes
   app.include_router(my_routes.router, prefix="/api")
   ```

## Testing

Create test files following this pattern:

```bash
backend/tests/
├── test_auth.py
├── test_services.py
├── test_bookings.py
└── conftest.py  # Shared fixtures
```

Run tests:
```bash
pytest
pytest -v  # Verbose
pytest --cov  # With coverage
```

## Database Management

### View SQLite database:
```bash
sqlite3 urbanclap.db
sqlite> .tables
sqlite> SELECT * FROM users;
```

### Reset database:
```bash
# Delete the database file
rm urbanclap.db

# It will be recreated on next run
```

### Migrate to PostgreSQL (production):
Update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://user:password@localhost/urbanclap
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static files collected (web)
- [ ] CORS properly configured
- [ ] Payment keys set up
- [ ] Email service configured
- [ ] Logging configured
- [ ] Error monitoring (Sentry) setup
- [ ] Docker images built
- [ ] Database backups configured

## Useful Commands

```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/

# Install new package
pip install package-name
pip freeze > requirements.txt

# Update dependencies
pip install --upgrade -r requirements.txt
```

## Troubleshooting

### CORS Issues
- Check `CORS_ORIGINS` in `.env`
- Ensure backend server is running
- Clear browser cache

### Database Errors
- Check database connection string
- Ensure PostgreSQL/SQLite is running
- Run migrations: `alembic upgrade head`

### API 404 Errors
- Check route registration in `main.py`
- Verify router prefix
- Check HTTP method (GET/POST/etc)

## Support & Resources

- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/
- Flutter Docs: https://flutter.dev/docs/
- Tailwind CSS: https://tailwindcss.com/
- Zustand: https://github.com/pmndrs/zustand

## Contact

For questions or issues, please create a GitHub issue.
