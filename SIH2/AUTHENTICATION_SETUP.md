# 🔐 TripMate Authentication System Setup Guide

## 📋 Overview
Complete user authentication system with MongoDB integration, including login, register, and profile management.

## 🚀 Quick Start

### 1. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. Configure Environment Variables
Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://jairamchowdarypathuri_db_user:Ep6LN7qe6PuJXhsg@cluster0.3zqorqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure
PORT=5000
NODE_ENV=development
```

### 3. Start Both Servers
```bash
# Terminal 1: Start Backend Server
cd server
npm run dev

# Terminal 2: Start Frontend (in project root)
npm run dev
```

## 🎯 Features Implemented

### ✅ Backend Features
- **MongoDB Integration** with user schema
- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Input Validation** with express-validator
- **User Profile Management** with preferences
- **CORS Configuration** for frontend integration

### ✅ Frontend Features
- **Login/Register Pages** with beautiful UI
- **Authentication Context** for state management
- **Protected Routes** and user sessions
- **Profile Management** with travel preferences
- **Navbar Integration** with user menu
- **Responsive Design** for all devices

### ✅ User Experience
- **Animated UI Components** with Framer Motion
- **Form Validation** with error handling
- **Loading States** and success messages
- **Mobile-Friendly** navigation and forms
- **Gradient Designs** matching app theme

## 🔧 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| GET | `/api/health` | Health check | ❌ |

## 📱 Pages Added

1. **Login Page** (`/login`) - User sign in
2. **Register Page** (`/register`) - User registration  
3. **Profile Page** (`/profile`) - User settings and preferences

## 🎨 UI Components

- **Navbar Authentication** - Sign in/out buttons and user menu
- **User Avatar** - Gradient circle with user initials
- **Dropdown Menu** - Profile settings and logout
- **Mobile Navigation** - Authentication links in mobile menu

## 🔒 Security Features

- **Password Encryption** - bcryptjs with salt rounds
- **JWT Tokens** - Secure authentication tokens
- **Input Sanitization** - Prevent injection attacks
- **CORS Protection** - Controlled cross-origin requests
- **Environment Variables** - Secure configuration

## 📊 User Data Structure

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    travelStyle: 'adventure' | 'luxury' | 'budget' | 'family' | 'solo' | 'business';
    interests: string[];
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  avatar?: string;
  isVerified?: boolean;
  lastLogin?: string;
}
```

## 🧪 Testing the System

1. **Start both servers** (backend on :5000, frontend on :5173)
2. **Visit** `http://localhost:5173/register`
3. **Create account** with valid email and password
4. **Login** with your credentials
5. **Check navbar** for user menu and avatar
6. **Visit profile** to update preferences
7. **Test logout** functionality

## 🎯 Next Steps

- Add email verification system
- Implement password reset functionality
- Add social media login options
- Create admin dashboard
- Add user activity tracking

## 🐛 Troubleshooting

### Common Issues:
1. **MongoDB Connection Error**: Check your connection string and network access
2. **CORS Error**: Ensure backend is running on port 5000
3. **JWT Error**: Verify JWT_SECRET is set in .env file
4. **Login Failed**: Check email/password and database connection

### Development Tips:
- Use browser dev tools to check network requests
- Check backend console for error messages
- Verify environment variables are loaded correctly
- Test API endpoints with Postman if needed
