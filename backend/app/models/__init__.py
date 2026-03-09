"""
Models package
Exports all database models
"""
from app.models.user import User
from app.models.preficha import Preficha
from app.models.teacher import Teacher

__all__ = ['User', 'Preficha', 'Teacher']