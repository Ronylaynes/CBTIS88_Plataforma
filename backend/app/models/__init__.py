"""
Models package
Exports all database models
"""
from app.models.user import User
from app.models.preficha import Preficha
from app.models.teacher import Teacher
from app.models.project import Project
from app.models.document import Document

__all__ = ['User', 'Preficha', 'Teacher', 'Project', 'Document']