from app import db
from app.models.project import Project
from datetime import datetime

class ProjectController:
    @staticmethod
    def create_project(data):
        """Create a new project"""
        try:
            project = Project(
                title=data['title'],
                description=data['description'],
                category=data['category'],
                image=data.get('image'),
                team=data.get('team'),
                date=data.get('date'),
                award=data.get('award'),
                type=data.get('type'),
                is_featured=data.get('is_featured', False)
            )
            
            db.session.add(project)
            db.session.commit()
            
            return {
                'message': 'Project created successfully',
                'project': project.to_dict()
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_projects(page=1, per_page=10, filters=None):
        """Get all projects with pagination"""
        try:
            query = Project.query.filter_by(is_active=True)
            
            # Apply filters
            if filters:
                if 'category' in filters:
                    query = query.filter_by(category=filters['category'])
                if 'type' in filters:
                    query = query.filter_by(type=filters['type'])
                if 'is_featured' in filters:
                    query = query.filter_by(is_featured=filters['is_featured'])
            
            # Paginate
            pagination = query.order_by(Project.created_at.desc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
            
            return {
                'projects': [p.to_dict() for p in pagination.items],
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': page,
                'per_page': per_page
            }, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_project_by_id(project_id):
        """Get project by ID"""
        try:
            project = Project.query.get(project_id)
            
            if not project:
                return {'error': 'Project not found'}, 404
            
            return {'project': project.to_dict()}, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def update_project(project_id, data):
        """Update project"""
        try:
            project = Project.query.get(project_id)
            
            if not project:
                return {'error': 'Project not found'}, 404
            
            # Update fields
            for key, value in data.items():
                if hasattr(project, key):
                    setattr(project, key, value)
            
            project.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {
                'message': 'Project updated successfully',
                'project': project.to_dict()
            }, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_project(project_id):
        """Delete project (soft delete)"""
        try:
            project = Project.query.get(project_id)
            
            if not project:
                return {'error': 'Project not found'}, 404
            
            project.is_active = False
            project.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Project deleted successfully'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_featured_projects():
        """Get featured projects"""
        try:
            projects = Project.query.filter_by(
                is_featured=True, 
                is_active=True
            ).order_by(Project.created_at.desc()).limit(6).all()
            
            return {
                'projects': [p.to_dict() for p in projects]
            }, 200
            
        except Exception as e:
            return {'error': str(e)}, 500