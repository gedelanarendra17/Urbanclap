# ServiceNow - Local Services Marketplace

A full-stack application built with:
- **Backend**: FastAPI (Python)
- **Web Frontend**: React + TypeScript
- **Mobile**: Flutter

## Project Structure

```
urbanclap-app/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── auth/           # Authentication & JWT
│   │   ├── database/       # Database configuration
│   │   └── config/         # App configuration
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables
│   └── main.py            # FastAPI app entry point
├── web/                   # React + TypeScript web app
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── store/         # Zustand state management
│   │   ├── api/           # API client
│   │   ├── types/         # TypeScript types
│   │   └── hooks/         # Custom React hooks
│   ├── package.json       # npm dependencies
│   ├── vite.config.ts    # Vite build config
│   └── tsconfig.json     # TypeScript config
└── mobile/               # Flutter mobile app
    ├── lib/
    │   ├── screens/      # App screens/pages
    │   ├── models/       # Data models
    │   ├── providers/    # State management
    │   ├── services/     # API services
    │   └── widgets/      # Reusable widgets
    ├── pubspec.yaml      # Flutter dependencies
    └── assets/           # Images and fonts
```

## Getting Started

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations (when setup):
   ```bash
   alembic upgrade head
   ```

5. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

Server runs at: http://localhost:8000

### Web Setup

1. Navigate to web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

App runs at: http://localhost:3000

### Mobile Setup

1. Navigate to mobile directory:
   ```bash
   cd mobile
   ```

2. Get Flutter dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

## Database Models

- **User**: Customer and Service Provider accounts
- **ServiceProvider**: Provider profile and ratings
- **Service**: Service offerings with pricing
- **Booking**: Service bookings with status tracking
- **Payment**: Payment records and transaction tracking
- **Review**: Customer reviews and ratings

## API Endpoints (To Be Implemented)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Services
- `GET /api/services`
- `GET /api/services/{id}`
- `POST /api/services` (provider)
- `PUT /api/services/{id}` (provider)
- `DELETE /api/services/{id}` (provider)

### Bookings
- `POST /api/bookings`
- `GET /api/bookings`
- `GET /api/bookings/{id}`
- `PUT /api/bookings/{id}`

### Payments
- `POST /api/payments`
- `GET /api/payments/{id}`
- `POST /api/payments/webhook` (Stripe)

## Environment Variables

Create `.env` files in backend and web directories with appropriate configuration.

## Next Steps

1. Implement API routes in FastAPI
2. Set up database migrations with Alembic
3. Create React components for all pages
4. Implement Flutter screens
5. Add payment integration (Stripe)
6. Deploy to production

## License

MIT
