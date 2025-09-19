# TripMate Backend Server

This is the backend API server for the TripMate application with MongoDB authentication.

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the server directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb+srv://jairamchowdarypathuri_db_user:Ep6LN7qe6PuJXhsg@cluster0.3zqorqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure_123456789
PORT=5000
NODE_ENV=development
```

### 3. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication)
Headers: `Authorization: Bearer <token>`

#### PUT `/api/auth/profile`
Update user profile (requires authentication)
Headers: `Authorization: Bearer <token>`

### Health Check
#### GET `/api/health`
Check if the server is running

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String,
  preferences: {
    travelStyle: String (enum),
    interests: [String],
    notifications: {
      email: Boolean,
      push: Boolean
    }
  },
  isVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS enabled for frontend integration
- Environment variables for sensitive data

## Frontend Integration

The frontend React app is configured to connect to this backend at `http://localhost:5000/api`

Make sure both servers are running:
1. Backend: `npm run dev` (port 5000)
2. Frontend: `npm run dev` (port 5173)
