import os

def _build_db_url():
    url = os.getenv('DATABASE_URL')
    if url:
        return url
    user = os.getenv('DB_USER',     'root')
    pw   = os.getenv('DB_PASSWORD', '')
    host = os.getenv('DB_HOST',     'localhost')
    port = os.getenv('DB_PORT',     '3306')
    name = os.getenv('DB_NAME',     'cbtis88')
    return f'mysql+pymysql://{user}:{pw}@{host}:{port}/{name}?charset=utf8mb4'


class Config:
    SECRET_KEY                   = os.getenv('SECRET_KEY',     'dev-secret-key')
    JWT_SECRET_KEY               = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    SQLALCHEMY_DATABASE_URI      = _build_db_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS    = {
        'pool_pre_ping': True,
        'pool_recycle':  300,
    }
    CORS_ORIGINS        = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173,https://sb64sm5n-5173.usw3.devtunnels.ms').split(',')
    MAIL_SERVER         = os.getenv('MAIL_SERVER',  'smtp.gmail.com')
    MAIL_PORT           = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS        = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME       = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD       = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@cbtis88.edu.mx')
    UPLOAD_FOLDER       = os.getenv('UPLOAD_FOLDER', 'uploads')
    MAX_CONTENT_LENGTH  = int(os.getenv('MAX_CONTENT_LENGTH', 5242880))
    ALLOWED_EXTENSIONS  = {'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'}
    ITEMS_PER_PAGE      = int(os.getenv('ITEMS_PER_PAGE',    10))
    BCRYPT_LOG_ROUNDS   = int(os.getenv('BCRYPT_LOG_ROUNDS', 12))
    FRONTEND_URL        = os.getenv('FRONTEND_URL', 'http://localhost:3000')


class DevelopmentConfig(Config):
    DEBUG           = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    DEBUG           = False
    SQLALCHEMY_ECHO = False


class TestingConfig(Config):
    TESTING                 = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/cbtis88_test?charset=utf8mb4'


config = {
    'development': DevelopmentConfig,
    'production':  ProductionConfig,
    'testing':     TestingConfig,
    'default':     DevelopmentConfig,
}
