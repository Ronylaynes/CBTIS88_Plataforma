from app import ma
from app.models.preficha import Preficha
from marshmallow import fields, validates, ValidationError
import re

class PrefichaSchema(ma.SQLAlchemyAutoSchema):
    """Preficha serialization schema"""
    
    class Meta:
        model = Preficha
        load_instance = True
        dump_only = ('id', 'folio', 'created_at', 'updated_at')
    
    @validates('curp')
    def validate_curp(self, value):
        """Validate CURP format"""
        pattern = r'^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$'
        if not re.match(pattern, value.upper()):
            raise ValidationError('Invalid CURP format')
    
    @validates('correo_electronico')
    def validate_email(self, value):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, value):
            raise ValidationError('Invalid email format')
    
    @validates('telefono_tutor')
    def validate_phone(self, value):
        """Validate phone format"""
        pattern = r'^[0-9]{10}$'
        if not re.match(pattern, value):
            raise ValidationError('Phone must be 10 digits')
    
    @validates('codigo_postal')
    def validate_postal_code(self, value):
        """Validate postal code"""
        pattern = r'^[0-9]{5}$'
        if not re.match(pattern, value):
            raise ValidationError('Postal code must be 5 digits')
    
    @validates('promedio_aproximado')
    def validate_gpa(self, value):
        """Validate GPA"""
        if value < 6.0 or value > 10.0:
            raise ValidationError('GPA must be between 6.0 and 10.0')
    
    @validates('edad')
    def validate_age(self, value):
        """Validate age"""
        if value < 14 or value > 20:
            raise ValidationError('Age must be between 14 and 20')

class PrefichaResponseSchema(ma.SQLAlchemyAutoSchema):
    """Preficha response schema"""
    
    class Meta:
        model = Preficha
        dump_only = ('id', 'folio', 'created_at', 'updated_at')

class PrefichaListSchema(ma.Schema):
    """Schema for list of prefichas"""
    prefichas = fields.List(fields.Nested(PrefichaResponseSchema))
    total = fields.Integer()
    pages = fields.Integer()
    current_page = fields.Integer()
    per_page = fields.Integer()

# Schema instances
preficha_schema = PrefichaSchema()
prefichas_schema = PrefichaSchema(many=True)
preficha_response_schema = PrefichaResponseSchema()
prefichas_response_schema = PrefichaResponseSchema(many=True)
preficha_list_schema = PrefichaListSchema()