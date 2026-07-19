# backend/app/middleware/validators.py
import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_curp(curp):
    pattern = r'^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$'
    return re.match(pattern, curp) is not None

def validate_phone(phone):
    pattern = r'^[0-9]{10}$'
    return re.match(pattern, phone) is not None

def validate_postal_code(code):
    pattern = r'^[0-9]{5}$'
    return re.match(pattern, code) is not None

def validate_register(data):
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Email is required'
    elif not validate_email(data['email']):
        errors['email'] = 'Invalid email format'
    if not data.get('password'):
        errors['password'] = 'Password is required'
    elif len(data['password']) < 8:
        errors['password'] = 'Password must be at least 8 characters'
    if not data.get('name'):
        errors['name'] = 'Name is required'
    return len(errors) == 0, errors

def validate_login(data):
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Email is required'
    if not data.get('password'):
        errors['password'] = 'Password is required'
    return len(errors) == 0, errors

def validate_preficha(data):
    errors = {}
    if not data.get('apellido_paterno'):
        errors['apellido_paterno'] = 'Apellido paterno is required'
    if not data.get('apellido_materno'):
        errors['apellido_materno'] = 'Apellido materno is required'
    if not data.get('nombre'):
        errors['nombre'] = 'Nombre is required'
    if not data.get('curp'):
        errors['curp'] = 'CURP is required'
    if not data.get('correo_electronico'):
        errors['correo_electronico'] = 'Email is required'
    elif not validate_email(data['correo_electronico']):
        errors['correo_electronico'] = 'Invalid email format'
    if not data.get('telefono_tutor'):
        errors['telefono_tutor'] = 'Tutor phone is required'
    elif not validate_phone(data['telefono_tutor']):
        errors['telefono_tutor'] = 'Invalid phone format (10 digits)'
    if not data.get('opcion1'):
        errors['opcion1'] = 'First specialty option is required'
    # ✅ metodo_pago eliminado — ya no se valida
    return len(errors) == 0, errors