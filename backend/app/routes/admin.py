from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.preficha import Preficha
from app.models.teacher import Teacher

admin_bp = Blueprint('admin', __name__)

def admin_required():
    """Decorator to check if user is admin"""
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user or user.role != 'admin':
                return jsonify({'error': 'Admin access required'}), 403
            
            return fn(*args, **kwargs)
        decorator.__name__ = fn.__name__
        return decorator
    return wrapper

@admin_bp.route('/dashboard', methods=['GET'])
@admin_required()
def get_dashboard_stats():
    """Get admin dashboard statistics"""
    total_prefichas = Preficha.query.count()
    total_projects = Project.query.filter_by(is_active=True).count()
    total_teachers = Teacher.query.filter_by(is_active=True).count()
    total_users = User.query.count()
    
    return jsonify({
        'stats': {
            'prefichas': total_prefichas,
            'projects': total_projects,
            'teachers': total_teachers,
            'users': total_users
        }
    }), 200

@admin_bp.route('/users', methods=['GET'])
@admin_required()
def get_all_users():
    """Get all users"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'users': [user.to_dict() for user in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200