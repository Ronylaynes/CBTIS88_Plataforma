from app import db
from app.models.teacher import Teacher
from datetime import datetime

class TeacherController:
    @staticmethod
    def create_teacher(data):
        """Create a new teacher"""
        try:
            teacher = Teacher(
                name=data['name'],
                photo=data.get('photo'),
                specialty=data['specialty'],
                degree=data['degree'],
                email=data.get('email'),
                phone=data.get('phone'),
                is_director=data.get('is_director', False),
                position=data.get('position'),
                message=data.get('message')
            )
            
            db.session.add(teacher)
            db.session.commit()
            
            return {
                'message': 'Teacher created successfully',
                'teacher': teacher.to_dict()
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_teachers(page=1, per_page=20):
        """Get all teachers with pagination"""
        try:
            query = Teacher.query.filter_by(is_active=True)
            
            pagination = query.order_by(Teacher.name.asc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
            
            return {
                'teachers': [t.to_dict() for t in pagination.items],
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': page,
                'per_page': per_page
            }, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_teacher_by_id(teacher_id):
        """Get teacher by ID"""
        try:
            teacher = Teacher.query.get(teacher_id)
            
            if not teacher:
                return {'error': 'Teacher not found'}, 404
            
            return {'teacher': teacher.to_dict()}, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def update_teacher(teacher_id, data):
        """Update teacher"""
        try:
            teacher = Teacher.query.get(teacher_id)
            
            if not teacher:
                return {'error': 'Teacher not found'}, 404
            
            # Update fields
            for key, value in data.items():
                if hasattr(teacher, key):
                    setattr(teacher, key, value)
            
            teacher.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {
                'message': 'Teacher updated successfully',
                'teacher': teacher.to_dict()
            }, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_teacher(teacher_id):
        """Delete teacher (soft delete)"""
        try:
            teacher = Teacher.query.get(teacher_id)
            
            if not teacher:
                return {'error': 'Teacher not found'}, 404
            
            teacher.is_active = False
            teacher.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Teacher deleted successfully'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_director():
        """Get director information"""
        try:
            director = Teacher.query.filter_by(
                is_director=True, 
                is_active=True
            ).first()
            
            if not director:
                return {'error': 'Director not found'}, 404
            
            return {'director': director.to_dict()}, 200
            
        except Exception as e:
            return {'error': str(e)}, 500