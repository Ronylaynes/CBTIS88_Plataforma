"""
Middleware package
Exports middleware functions
"""
from app.middleware.error_handler import register_error_handlers
from app.middleware.validators import (
    validate_email,
    validate_curp,
    validate_phone,
    validate_postal_code,
    validate_register,
    validate_login,
    validate_preficha
)

__all__ = [
    'register_error_handlers',
    'validate_email',
    'validate_curp',
    'validate_phone',
    'validate_postal_code',
    'validate_register',
    'validate_login',
    'validate_preficha'
]