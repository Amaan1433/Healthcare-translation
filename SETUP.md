# Healthcare Translation App - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- OpenAI API key (optional, fallback translation available)

### 1. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install Flask Flask-CORS Flask-SQLAlchemy Flask-JWT-Extended Flask-Migrate python-dotenv requests

# Create environment file
cp env.example .env
# Edit .env with your OpenAI API key

# Run the Flask app
python run.py
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
healthcare-translation-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── routes/              # API endpoints
│   │   ├── models/              # Database models
│   │   └── services/            # Business logic
│   ├── config/
│   │   └── config.py            # Configuration
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── contexts/            # React contexts
│   │   └── styles/              # Styling
│   ├── package.json             # Node.js dependencies
│   └── public/                  # Static files
└── README.md                    # Project documentation
```

## 🔧 Features Implemented

### Backend (Flask)
- ✅ Modular Flask application structure
- ✅ SQLAlchemy database models
- ✅ JWT authentication system
- ✅ Translation API with OpenAI integration
- ✅ Speech recognition and text-to-speech
- ✅ Medical context awareness
- ✅ Session management
- ✅ CORS configuration
- ✅ Error handling and logging

### Frontend (React)
- ✅ Modern React 18 application
- ✅ Styled Components for styling
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Speech recording component
- ✅ Translation interface
- ✅ Language selection
- ✅ Medical context selector
- ✅ Session history
- ✅ Responsive design
- ✅ Error boundaries

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Translation
- `POST /api/translation/translate` - Translate text
- `GET /api/translation/languages` - Get supported languages
- `GET /api/translation/medical-contexts` - Get medical contexts

### Speech
- `POST /api/speech/speech-to-text` - Convert speech to text
- `POST /api/speech/text-to-speech` - Convert text to speech

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure headers

## 📱 Mobile-First Design

- Responsive layout
- Touch-friendly interface
- Optimized for mobile devices
- Progressive Web App ready

## 🏥 Healthcare Features

- Medical context awareness
- Specialized translation for healthcare terminology
- Session management for patient encounters
- Privacy-focused design

## 🚀 Deployment

### Backend Deployment
```bash
# Install production dependencies
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy build folder to Vercel/Netlify
```

## 🔧 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your-openai-api-key
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
FLASK_DEBUG=True
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📊 Performance

- Optimized database queries
- React Query for caching
- Lazy loading components
- Code splitting
- Image optimization

## 🔄 Development Workflow

1. **Backend Development**
   - Flask development server with auto-reload
   - SQLite database for development
   - Comprehensive logging

2. **Frontend Development**
   - React development server with hot reload
   - Proxy configuration for API calls
   - Development tools and debugging

3. **Integration**
   - CORS configured for development
   - Shared environment variables
   - Consistent API structure

## 🎯 Next Steps

- [ ] Complete authentication UI
- [ ] Add more language support
- [ ] Implement offline capabilities
- [ ] Add advanced medical terminology
- [ ] Integrate with EHR systems
- [ ] Add analytics and reporting
- [ ] Implement HIPAA compliance features

## 📞 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Create an issue in the repository

---

**Note**: This application is designed for educational and demonstration purposes. For production use in healthcare settings, ensure compliance with local regulations and healthcare data protection laws.
