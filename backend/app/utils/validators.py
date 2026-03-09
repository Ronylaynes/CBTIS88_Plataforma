import re
from datetime import datetime

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_curp(curp):
    """Validate CURP format (Mexican ID)"""
    pattern = r'^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$'
    return re.match(pattern, curp.upper()) is not None

def validate_rfc(rfc):
    """Validate RFC format (Mexican tax ID)"""
    pattern = r'^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$'
    return re.match(pattern, rfc.upper()) is not None

def validate_phone(phone):
    """Validate phone number (10 digits)"""
    pattern = r'^[0-9]{10}$'
    cleaned = phone.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
    return re.match(pattern, cleaned) is not None

def validate_postal_code(code):
    """Validate Mexican postal code (5 digits)"""
    pattern = r'^[0-9]{5}$'
    return re.match(pattern, code) is not None

def validate_password_strength(password):
    """Validate password strength"""
    errors = []
    
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")
    
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain at least one uppercase letter")
    
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain at least one lowercase letter")
    
    if not re.search(r'[0-9]', password):
        errors.append("Password must contain at least one number")
    
    return len(errors) == 0, errors

def validate_age(birthdate, min_age=14, max_age=20):
    """Validate age based on birthdate"""
    if isinstance(birthdate, str):
        birthdate = datetime.strptime(birthdate, '%Y-%m-%d').date()
    
    today = datetime.today().date()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    
    if age < min_age:
        return False, f"Must be at least {min_age} years old"
    if age > max_age:
        return False, f"Must be at most {max_age} years old"
    
    return True, None

def validate_gpa(gpa, min_gpa=6.0, max_gpa=10.0):
    """Validate GPA (Mexican scale 6-10)"""
    try:
        gpa = float(gpa)
        if gpa < min_gpa or gpa > max_gpa:
            return False, f"GPA must be between {min_gpa} and {max_gpa}"
        return True, None
    except ValueError:
        return False, "Invalid GPA format"

def validate_required_fields(data, required_fields):
    """Validate that all required fields are present"""
    errors = {}
    
    for field in required_fields:
        if field not in data or not data[field]:
            errors[field] = f"{field} is required"
    
    return len(errors) == 0, errors

def sanitize_string(text, max_length=None):
    """Sanitize string input"""
    if not text:
        return text
    
    # Remove leading/trailing whitespace
    text = text.strip()
    
    # Limit length if specified
    if max_length and len(text) > max_length:
        text = text[:max_length]
    
    return text

def validate_date_range(start_date, end_date):
    """Validate date range"""
    if isinstance(start_date, str):
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    if isinstance(end_date, str):
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    
    if start_date > end_date:
        return False, "Start date must be before end date"
    
    return True, None