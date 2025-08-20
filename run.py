#!/usr/bin/env python3
"""
Healthcare Translation Web App - Main Application Entry Point
"""

import os
import logging
from dotenv import load_dotenv
from app import create_app, db
from app.models.user import User
from app.models.translation import TranslationSession, TranslationRecord

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

def create_tables():
    """Create database tables"""
    try:
        with app.app_context():
            db.create_all()
            logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")

def create_admin_user():
    """Create admin user if it doesn't exist"""
    try:
        with app.app_context():
            admin_username = os.getenv('ADMIN_USERNAME', 'admin')
            admin_email = os.getenv('ADMIN_EMAIL', 'admin@healthcare-translation.com')
            admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')
            
            # Check if admin user already exists
            admin_user = User.query.filter_by(username=admin_username).first()
            if not admin_user:
                admin_user = User(
                    username=admin_username,
                    email=admin_email,
                    password=admin_password,
                    role='admin'
                )
                db.session.add(admin_user)
                db.session.commit()
                logger.info(f"Admin user '{admin_username}' created successfully")
            else:
                logger.info(f"Admin user '{admin_username}' already exists")
    except Exception as e:
        logger.error(f"Error creating admin user: {e}")

# Create Flask application early so we can use app context below
app = create_app()

@app.route('/')
def index():
    """Root endpoint"""
    return {
        'message': 'Healthcare Translation Web App API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'translation': '/api/translation',
            'speech': '/api/speech',
            'auth': '/api/auth'
        }
    }

@app.route('/health')
def health_check():
    """Global health check endpoint"""
    try:
        # Check database connection
        db.session.execute('SELECT 1')
        db_status = 'healthy'
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        db_status = 'unhealthy'
    
    return {
        'status': 'healthy' if db_status == 'healthy' else 'unhealthy',
        'database': db_status,
        'services': {
            'translation': '/api/translation/health',
            'speech': '/api/speech/health',
            'auth': '/api/auth/health'
        }
    }

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return {'error': 'Endpoint not found'}, 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {error}")
    return {'error': 'Internal server error'}, 500

if __name__ == '__main__':
    # Create database tables
    create_tables()
    
    # Create admin user
    create_admin_user()
    
    # Get configuration
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    # Default backend port should be 5000 to avoid clashing with React (3000)
    port = int(os.getenv('FLASK_PORT', 5000))
    
    logger.info(f"Starting Healthcare Translation Web App on {host}:{port}")
    logger.info(f"Debug mode: {debug}")
    
    # Run the application
    app.run(
        host=host,
        port=port,
        debug=debug,
        threaded=True
    )