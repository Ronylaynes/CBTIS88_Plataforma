from datetime import datetime, timedelta
import secrets
import string

def generate_random_string(length=32):
    """Generate random string"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def generate_token(length=64):
    """Generate secure token"""
    return secrets.token_urlsafe(length)

def format_date(date, format='%Y-%m-%d'):
    """Format date to string"""
    if isinstance(date, str):
        return date
    return date.strftime(format) if date else None

def parse_date(date_string, format='%Y-%m-%d'):
    """Parse date string to datetime"""
    try:
        return datetime.strptime(date_string, format)
    except:
        return None

def get_current_academic_year():
    """Get current academic year"""
    now = datetime.now()
    if now.month >= 8:  # August onwards
        return f"{now.year}-{now.year + 1}"
    return f"{now.year - 1}-{now.year}"

def calculate_age(birthdate):
    """Calculate age from birthdate"""
    if isinstance(birthdate, str):
        birthdate = datetime.strptime(birthdate, '%Y-%m-%d').date()
    
    today = datetime.today().date()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

def format_phone_number(phone):
    """Format phone number to (XXX) XXX-XXXX"""
    cleaned = phone.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
    if len(cleaned) == 10:
        return f"({cleaned[:3]}) {cleaned[3:6]}-{cleaned[6:]}"
    return phone

def format_curp(curp):
    """Format CURP to uppercase"""
    return curp.upper().strip() if curp else None

def paginate_query(query, page=1, per_page=10):
    """Paginate SQLAlchemy query"""
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        'items': pagination.items,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page,
        'per_page': per_page,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }

def get_time_ago(date):
    """Get human-readable time ago"""
    if isinstance(date, str):
        date = datetime.fromisoformat(date.replace('Z', '+00:00'))
    
    now = datetime.now()
    diff = now - date
    
    seconds = diff.total_seconds()
    
    if seconds < 60:
        return "justo ahora"
    elif seconds < 3600:
        minutes = int(seconds / 60)
        return f"hace {minutes} minuto{'s' if minutes > 1 else ''}"
    elif seconds < 86400:
        hours = int(seconds / 3600)
        return f"hace {hours} hora{'s' if hours > 1 else ''}"
    elif seconds < 604800:
        days = int(seconds / 86400)
        return f"hace {days} día{'s' if days > 1 else ''}"
    elif seconds < 2592000:
        weeks = int(seconds / 604800)
        return f"hace {weeks} semana{'s' if weeks > 1 else ''}"
    else:
        return format_date(date, '%d/%m/%Y')

def truncate_text(text, length=100, suffix='...'):
    """Truncate text to specified length"""
    if not text or len(text) <= length:
        return text
    return text[:length].rsplit(' ', 1)[0] + suffix

def generate_folio(prefix='CBTIS88', year=None, number=1):
    """Generate folio number"""
    if year is None:
        year = datetime.now().year
    return f"{prefix}-{year}-{str(number).zfill(4)}"

def is_valid_uuid(uuid_string):
    """Check if string is valid UUID"""
    try:
        import uuid
        uuid.UUID(uuid_string)
        return True
    except:
        return False

def sort_dict_by_key(dictionary, reverse=False):
    """Sort dictionary by keys"""
    return dict(sorted(dictionary.items(), reverse=reverse))

def merge_dicts(*dicts):
    """Merge multiple dictionaries"""
    result = {}
    for dictionary in dicts:
        result.update(dictionary)
    return result