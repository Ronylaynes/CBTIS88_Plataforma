from flask import jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from app import db
from app.models.user import User
from datetime import datetime

class AuthController:
    @staticmethod
    def register(data):
        """Register a new user"""
        try:
            # Check if user already exists
            if User.query.filter_by(email=data['email']).first():
                return {'error': 'Email already registered'}, 400
            
            # Create new user
            user = User(
                email=data['email'],
                password=data['password'],
                name=data['name'],
                role=data.get('role', 'user')
            )
            
            db.session.add(user)
            db.session.commit()
            
            # Generate tokens
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            return {
                'message': 'User registered successfully',
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def login(data):
        """Login user"""
        try:
            user = User.query.filter_by(email=data['email']).first()
            
            if not user or not user.check_password(data['password']):
                return {'error': 'Invalid email or password'}, 401
            
            if not user.is_active:
                return {'error': 'Account is inactive'}, 401
            
            # Generate tokens
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            return {
                'message': 'Login successful',
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_current_user(user_id):
        """Get current authenticated user"""
        try:
            user = User.query.get(user_id)
            
            if not user:
                return {'error': 'User not found'}, 404
            
            return {'user': user.to_dict()}, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def change_password(user_id, data):
        """Change user password"""
        try:
            user = User.query.get(user_id)
            
            if not user:
                return {'error': 'User not found'}, 404
            
            if not user.check_password(data['current_password']):
                return {'error': 'Current password is incorrect'}, 400
            
            user.set_password(data['new_password'])
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Password changed successfully'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def update_profile(user_id, data):
        """Update user profile"""
        try:
            user = User.query.get(user_id)
            
            if not user:
                return {'error': 'User not found'}, 404
            
            # Update allowed fields
            if 'name' in data:
                user.name = data['name']
            if 'email' in data:
                # Check if email is already taken
                existing_user = User.query.filter_by(email=data['email']).first()
                if existing_user and existing_user.id != user_id:
                    return {'error': 'Email already in use'}, 400
                user.email = data['email']
            
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {
                'message': 'Profile updated successfully',
                'user': user.to_dict()
            }, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500