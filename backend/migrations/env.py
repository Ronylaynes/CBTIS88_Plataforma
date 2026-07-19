import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

import pymysql
pymysql.install_as_MySQLdb()

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Importar todos los modelos para que Alembic los detecte
from app import db
from app.models import user, preficha, project, teacher, document

target_metadata = db.metadata

def get_url():
    user_   = os.getenv('DB_USER',     'root')
    pw      = os.getenv('DB_PASSWORD', '')
    host    = os.getenv('DB_HOST',     'localhost')
    port    = os.getenv('DB_PORT',     '3306')
    name    = os.getenv('DB_NAME',     'cbtis88')
    return f'mysql+pymysql://{user_}:{pw}@{host}:{port}/{name}?charset=utf8mb4'

def run_migrations_offline():
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    configuration = config.get_section(config.config_ini_section)
    configuration['sqlalchemy.url'] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()