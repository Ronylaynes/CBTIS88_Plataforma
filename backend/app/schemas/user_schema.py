from app import ma
from app.models.user import User
from marshmallow import fields, validates, ValidationError

class UserSchema(ma.SQLAlchemyAutoSchema):
    """User serialization schema"""
    
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        dump_only = ('id', 'created_at', 'updated_at')
    
    # Additional fields
    password = fields.String(load_only=True, required=True)
    
    @validates('email')
    def validate_email(self, value):
        """Validate email format"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, value):
            raise ValidationError('Invalid email format')
    
    @validates('password')
    def validate_password(self, value):
        """Validate password strength"""
        if len(value) < 8:
            raise ValidationError('Password must be at least 8 characters')

class UserResponseSchema(ma.SQLAlchemyAutoSchema):
    """User response schema (without sensitive data)"""
    
    class Meta:
        model = User
        exclude = ('password_hash',)
        dump_only = ('id', 'created_at', 'updated_at')

class UserListSchema(ma.Schema):
    """Schema for list of users"""
    users = fields.List(fields.Nested(UserResponseSchema))
    total = fields.Integer()
    pages = fields.Integer()
    current_page = fields.Integer()
    per_page = fields.Integer()

# Schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_response_schema = UserResponseSchema()
users_response_schema = UserResponseSchema(many=True)
user_list_schema = UserListSchema()