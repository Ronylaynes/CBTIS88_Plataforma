from app import db
from datetime import datetime

class Project(db.Model):
    """Project model for student projects"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)  # Innovación Tecnológica, Impacto Social, etc.
    image = db.Column(db.String(255))
    team = db.Column(db.String(200))
    date = db.Column(db.String(50))
    award = db.Column(db.String(200))
    type = db.Column(db.String(50))  # innovation, social, awarded
    is_featured = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'image': self.image,
            'team': self.team,
            'date': self.date,
            'award': self.award,
            'type': self.type,
            'is_featured': self.is_featured,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Project {self.title}>'