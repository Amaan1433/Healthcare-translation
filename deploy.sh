#!/bin/bash

# Healthcare Translation App Deployment Script
echo "🚀 Healthcare Translation App Deployment Script"
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your OpenAI API key and other settings"
fi

# Initialize database
echo "Initializing database..."
python run.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Frontend Setup
echo ""
echo "🔧 Setting up Frontend..."
cd ../frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000" > .env
fi

# Start frontend
echo "Starting frontend development server..."
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Deployment completed!"
echo "========================"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
