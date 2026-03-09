"""
Utils package
Exports utility functions
"""
from app.utils.database import (
    init_database,
    drop_database,
    reset_database,
    get_or_create,
    save_to_db,
    delete_from_db,
    update_db
)

from app.utils.email import (
    send_email,
    send_welcome_email,
    send_preficha_confirmation,
    send_password_reset_email
)

from app.utils.file_upload import (
    allowed_file,
    generate_unique_filename,
    save_file,
    save_image,
    delete_file,
    get_file_size,
    format_file_size
)

from app.utils.validators import (
    validate_email,
    validate_curp,
    validate_phone,
    validate_postal_code,
    validate_password_strength,
    validate_age,
    validate_gpa
)

from app.utils.helpers import (
    generate_random_string,
    generate_token,
    format_date,
    parse_date,
    get_current_academic_year,
    calculate_age,
    format_phone_number,
    format_curp,
    paginate_query,
    get_time_ago,
    generate_folio
)

__all__ = [
    # Database
    'init_database',
    'drop_database',
    'reset_database',
    'get_or_create',
    'save_to_db',
    'delete_from_db',
    'update_db',
    # Email
    'send_email',
    'send_welcome_email',
    'send_preficha_confirmation',
    'send_password_reset_email',
    # File Upload
    'allowed_file',
    'generate_unique_filename',
    'save_file',
    'save_image',
    'delete_file',
    'get_file_size',
    'format_file_size',
    # Validators
    'validate_email',
    'validate_curp',
    'validate_phone',
    'validate_postal_code',
    'validate_password_strength',
    'validate_age',
    'validate_gpa',
    # Helpers
    'generate_random_string',
    'generate_token',
    'format_date',
    'parse_date',
    'get_current_academic_year',
    'calculate_age',
    'format_phone_number',
    'format_curp',
    'paginate_query',
    'get_time_ago',
    'generate_folio'
]