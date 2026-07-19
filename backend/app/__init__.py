from dotenv import load_dotenv
load_dotenv()

import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from flask_marshmallow import Marshmallow

from app.config.settings import config

db      = SQLAlchemy()
migrate = Migrate()
jwt     = JWTManager()
mail    = Mail()
ma      = Marshmallow()


def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ CORS actualizado con tu dominio devtunnels
    CORS(app,
         origins=[
             "http://localhost:3000",
             "http://localhost:5173",
             "https://sb64sm5n-5173.usw3.devtunnels.ms"
         ],
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "PATCH",
                  "DELETE", "OPTIONS"])

    jwt.init_app(app)
    mail.init_app(app)
    ma.init_app(app)

    from app.models.user      import User
    from app.models.preficha  import Preficha
    from app.models.teacher   import Teacher
    from app.models.project   import Project
    from app.models.document  import Document
    from app.models.auditoria import Auditoria

    from app.routes.auth      import auth_bp
    from app.routes.prefichas import prefichas_bp
    from app.routes.projects  import projects_bp
    from app.routes.teachers  import teachers_bp
    from app.routes.documents import documents_bp
    from app.routes.admin     import admin_bp

    app.register_blueprint(auth_bp,      url_prefix='/api/auth')
    app.register_blueprint(prefichas_bp, url_prefix='/api/prefichas')
    app.register_blueprint(projects_bp,  url_prefix='/api/projects')
    app.register_blueprint(teachers_bp,  url_prefix='/api/teachers')
    app.register_blueprint(documents_bp, url_prefix='/api/documents')
    app.register_blueprint(admin_bp,     url_prefix='/api/admin')

    from app.middleware.error_handler import register_error_handlers
    register_error_handlers(app)

    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy',
                'message': 'CBTIS 88 API is running'}, 200

    return app