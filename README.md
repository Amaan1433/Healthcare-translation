# Healthcare Translation Web App

Real-time multilingual translation for healthcare professionals with AI-powered speech recognition and medical context awareness.

## Features

- 🎤 Voice-to-Text with AI enhancement
- 🌍 Real-time translation (20+ languages)
- 🔊 Text-to-Speech audio playback
- 🏥 Medical context awareness
- 📱 Mobile-first responsive design
- 🔒 Secure authentication
- 📊 Session management

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
# Edit .env with your OpenAI API key
python run.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Access

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Environment Variables

Create `.env` in backend:

```env
OPENAI_API_KEY=your-openai-api-key
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

## Tech Stack

- **Backend**: Flask, SQLAlchemy, OpenAI API, Speech Recognition
- **Frontend**: React, Styled Components, React Query
- **Database**: SQLite (production: PostgreSQL)
- **Authentication**: JWT

## API Endpoints

- `POST /api/translation/translate` - Translate text
- `POST /api/speech/speech-to-text` - Speech to text
- `POST /api/speech/text-to-speech` - Text to speech
- `POST /api/auth/login` - User authentication

## Deployment

### Backend

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

### Frontend

```bash
npm run build
# Deploy build folder to Vercel/Netlify
```

## License

MIT License
