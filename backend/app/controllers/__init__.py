"""
Controllers package
Exports all controller classes
"""
from app.controllers.auth_controller import AuthController
from app.controllers.preficha_controller import PrefichaController
from app.controllers.project_controller import ProjectController
from app.controllers.teacher_controller import TeacherController

__all__ = [
    'AuthController',
    'PrefichaController',
    'ProjectController',
    'TeacherController'
]