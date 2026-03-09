from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.auth_controller import AuthController
from app.middleware.validators import validate_register, validate_login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate data
    is_valid, errors = validate_register(data)
    if not is_valid:
        return jsonify({'errors': errors}), 400
    
    result, status_code = AuthController.register(data)
    return jsonify(result), status_code

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()
    
    # Validate data
    is_valid, errors = validate_login(data)
    if not is_valid:
        return jsonify({'errors': errors}), 400
    
    result, status_code = AuthController.login(data)
    return jsonify(result), status_code

@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    """Verify JWT token"""
    current_user_id = get_jwt_identity()
    result, status_code = AuthController.get_current_user(current_user_id)
    return jsonify(result), status_code

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    current_user_id = get_jwt_identity()
    result, status_code = AuthController.get_current_user(current_user_id)
    return jsonify(result), status_code

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    result, status_code = AuthController.update_profile(current_user_id, data)
    return jsonify(result), status_code

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('current_password') or not data.get('new_password'):
        return jsonify({'error': 'Current password and new password are required'}), 400
    
    result, status_code = AuthController.change_password(current_user_id, data)
    return jsonify(result), status_code

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user"""
    # In a stateless JWT system, logout is handled client-side
    # But we can implement token blacklisting if needed
    return jsonify({'message': 'Logout successful'}), 200