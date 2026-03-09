from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.controllers.project_controller import ProjectController

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('', methods=['GET'])
def get_all_projects():
    """Get all projects"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    filters = {
        'category': request.args.get('category'),
        'type': request.args.get('type'),
        'is_featured': request.args.get('is_featured')
    }
    filters = {k: v for k, v in filters.items() if v is not None}
    
    result, status_code = ProjectController.get_all_projects(page, per_page, filters)
    return jsonify(result), status_code

@projects_bp.route('', methods=['POST'])
@jwt_required()
def create_project():
    """Create a new project"""
    data = request.get_json()
    result, status_code = ProjectController.create_project(data)
    return jsonify(result), status_code

@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project_by_id(project_id):
    """Get project by ID"""
    result, status_code = ProjectController.get_project_by_id(project_id)
    return jsonify(result), status_code

@projects_bp.route('/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    """Update project"""
    data = request.get_json()
    result, status_code = ProjectController.update_project(project_id, data)
    return jsonify(result), status_code

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    """Delete project"""
    result, status_code = ProjectController.delete_project(project_id)
    return jsonify(result), status_code

@projects_bp.route('/featured', methods=['GET'])
def get_featured_projects():
    """Get featured projects"""
    result, status_code = ProjectController.get_featured_projects()
    return jsonify(result), status_code