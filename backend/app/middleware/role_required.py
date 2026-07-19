# backend/app/middleware/role_required.py
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.models.user import User

def role_required(roles_permitidos):
    """
    Decorador que verifica que el usuario tenga uno de los roles.
    Uso:
        @role_required(['admin', 'servicios_escolares'])
        def mi_ruta(): ...
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id    = get_jwt_identity()
            user       = User.query.get(user_id)

            if not user:
                return jsonify({'error': 'Usuario no encontrado'}), 404

            # ✅ Soporta Enum y string
            rol_actual = user.role.value \
                         if hasattr(user.role, 'value') \
                         else user.role

            if rol_actual not in roles_permitidos:
                return jsonify({
                    'error':   'Acceso denegado',
                    'detalle': f'Roles permitidos: {", ".join(roles_permitidos)}'
                }), 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator