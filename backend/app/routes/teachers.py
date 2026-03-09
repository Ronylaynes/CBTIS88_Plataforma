from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.controllers.teacher_controller import TeacherController

teachers_bp = Blueprint('teachers', __name__)

@teachers_bp.route('', methods=['GET'])
def get_all_teachers():
    """Get all teachers"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    result, status_code = TeacherController.get_all_teachers(page, per_page)
    return jsonify(result), status_code

@teachers_bp.route('', methods=['POST'])
@jwt_required()
def create_teacher():
    """Create a new teacher"""
    data = request.get_json()
    result, status_code = TeacherController.create_teacher(data)
    return jsonify(result), status_code

@teachers_bp.route('/<int:teacher_id>', methods=['GET'])
def get_teacher_by_id(teacher_id):
    """Get teacher by ID"""
    result, status_code = TeacherController.get_teacher_by_id(teacher_id)
    return jsonify(result), status_code

@teachers_bp.route('/<int:teacher_id>', methods=['PUT'])
@jwt_required()
def update_teacher(teacher_id):
    """Update teacher"""
    data = request.get_json()
    result, status_code = TeacherController.update_teacher(teacher_id, data)
    return jsonify(result), status_code

@teachers_bp.route('/<int:teacher_id>', methods=['DELETE'])
@jwt_required()
def delete_teacher(teacher_id):
    """Delete teacher"""
    result, status_code = TeacherController.delete_teacher(teacher_id)
    return jsonify(result), status_code

@teachers_bp.route('/director', methods=['GET'])
def get_director():
    """Get director information"""
    result, status_code = TeacherController.get_director()
    return jsonify(result), status_code