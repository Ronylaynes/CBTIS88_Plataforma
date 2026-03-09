import re

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_curp(curp):
    """Validate CURP format"""
    pattern = r'^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$'
    return re.match(pattern, curp) is not None

def validate_phone(phone):
    """Validate phone number (10 digits)"""
    pattern = r'^[0-9]{10}$'
    return re.match(pattern, phone) is not None

def validate_postal_code(code):
    """Validate postal code (5 digits)"""
    pattern = r'^[0-9]{5}$'
    return re.match(pattern, code) is not None

def validate_register(data):
    """Validate registration data"""
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
    """Validate login data"""
    errors = {}
    
    if not data.get('email'):
        errors['email'] = 'Email is required'
    
    if not data.get('password'):
        errors['password'] = 'Password is required'
    
    return len(errors) == 0, errors

def validate_preficha(data):
    """Validate preficha data"""
    errors = {}
    
    # Personal data
    if not data.get('apellidoPaterno'):
        errors['apellidoPaterno'] = 'Apellido paterno is required'
    
    if not data.get('apellidoMaterno'):
        errors['apellidoMaterno'] = 'Apellido materno is required'
    
    if not data.get('nombre'):
        errors['nombre'] = 'Nombre is required'
    
    if not data.get('curp'):
        errors['curp'] = 'CURP is required'
    elif not validate_curp(data['curp'].upper()):
        errors['curp'] = 'Invalid CURP format'
    
    # Contact data
    if not data.get('correoElectronico'):
        errors['correoElectronico'] = 'Email is required'
    elif not validate_email(data['correoElectronico']):
        errors['correoElectronico'] = 'Invalid email format'
    
    if not data.get('telefonoTutor'):
        errors['telefonoTutor'] = 'Tutor phone is required'
    elif not validate_phone(data['telefonoTutor']):
        errors['telefonoTutor'] = 'Invalid phone format (10 digits)'
    
    if not data.get('codigoPostal'):
        errors['codigoPostal'] = 'Postal code is required'
    elif not validate_postal_code(data['codigoPostal']):
        errors['codigoPostal'] = 'Invalid postal code (5 digits)'
    
    # Academic data
    if not data.get('opcion1'):
        errors['opcion1'] = 'First specialty option is required'
    
    # Payment method
    if not data.get('metodoPago'):
        errors['metodoPago'] = 'Payment method is required'
    elif data['metodoPago'] not in ['transferencia', 'ventanilla']:
        errors['metodoPago'] = 'Invalid payment method'
    
    return len(errors) == 0, errors