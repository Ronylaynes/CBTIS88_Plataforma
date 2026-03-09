from app import db
from datetime import datetime

class Teacher(db.Model):
    """Teacher model for faculty management"""
    __tablename__ = 'teachers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    photo = db.Column(db.String(255))
    specialty = db.Column(db.String(100), nullable=False)
    degree = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    is_director = db.Column(db.Boolean, default=False)
    position = db.Column(db.String(100))
    message = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'photo': self.photo,
            'specialty': self.specialty,
            'degree': self.degree,
            'email': self.email,
            'phone': self.phone,
            'is_director': self.is_director,
            'position': self.position,
            'message': self.message,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Teacher {self.name}>'