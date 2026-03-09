from flask import Flask
from flask_jwt_extended import JWTManager

try:
    from flask_sqlalchemy import SQLAlchemy
except (ImportError, ModuleNotFoundError) as e:
    class SQLAlchemy:
        def __init__(self):
            pass
        def init_app(self, app):
            pass

try:
    from flask_migrate import Migrate
except (ImportError, ModuleNotFoundError) as e:
    class Migrate:
        def __init__(self, *args, **kwargs):
            pass
        def init_app(self, app, db):
            pass

try:
    from flask_cors import CORS
except (ImportError, ModuleNotFoundError) as e:
    def CORS(app, **kwargs):
        pass

try:
    from flask_mail import Mail
except (ImportError, ModuleNotFoundError) as e:
    class Mail:
        def __init__(self):
            pass
        def init_app(self, app):
            pass

try:
    from flask_marshmallow import Marshmallow
except ImportError:
    class Marshmallow:
        def __init__(self):
            pass
        def init_app(self, app):
            pass

from app.config.settings import config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()
ma = Marshmallow()

def create_app(config_name='development'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    jwt.init_app(app)
    mail.init_app(app)
    ma.init_app(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.prefichas import prefichas_bp
    from app.routes.projects import projects_bp
    from app.routes.teachers import teachers_bp
    from app.routes.documents import documents_bp
    from app.routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(prefichas_bp, url_prefix='/api/prefichas')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(teachers_bp, url_prefix='/api/teachers')
    app.register_blueprint(documents_bp, url_prefix='/api/documents')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Register error handlers
    from app.middleware.error_handler import register_error_handlers
    register_error_handlers(app)
    
    # Health check route
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'CBTIS 88 API is running'}, 200
    
    return app