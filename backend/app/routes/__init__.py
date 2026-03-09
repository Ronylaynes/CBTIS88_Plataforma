from app.routes.auth import auth_bp
from app.routes.prefichas import prefichas_bp
from app.routes.projects import projects_bp
from app.routes.teachers import teachers_bp
from app.routes.documents import documents_bp
from app.routes.admin import admin_bp

__all__ = [
    'auth_bp',
    'prefichas_bp', 
    'projects_bp',
    'teachers_bp',
    'documents_bp',
    'admin_bp'
]