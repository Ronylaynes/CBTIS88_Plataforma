from app import ma
from app.models.project import Project
from marshmallow import fields, validates, ValidationError  # type: ignore

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    """Project serialization schema"""
    
    class Meta:
        model = Project
        load_instance = True
        dump_only = ('id', 'created_at', 'updated_at')
    
    @validates('title')
    def validate_title(self, value):
        """Validate title length"""
        if len(value) < 5:
            raise ValidationError('Title must be at least 5 characters')
        if len(value) > 200:
            raise ValidationError('Title must not exceed 200 characters')
    
    @validates('description')
    def validate_description(self, value):
        """Validate description length"""
        if len(value) < 20:
            raise ValidationError('Description must be at least 20 characters')

class ProjectResponseSchema(ma.SQLAlchemyAutoSchema):
    """Project response schema"""
    
    class Meta:
        model = Project
        dump_only = ('id', 'created_at', 'updated_at')

class ProjectListSchema(ma.Schema):
    """Schema for list of projects"""
    projects = fields.List(fields.Nested(ProjectResponseSchema))
    total = fields.Integer()
    pages = fields.Integer()
    current_page = fields.Integer()
    per_page = fields.Integer()

# Schema instances
project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
project_response_schema = ProjectResponseSchema()
projects_response_schema = ProjectResponseSchema(many=True)
project_list_schema = ProjectListSchema()