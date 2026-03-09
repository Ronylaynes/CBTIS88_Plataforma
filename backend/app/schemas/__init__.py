"""
Schemas package
Exports all Marshmallow schemas
"""
from app.schemas.user_schema import (
    UserSchema,
    UserResponseSchema,
    UserListSchema,
    user_schema,
    users_schema,
    user_response_schema,
    users_response_schema,
    user_list_schema
)

from app.schemas.preficha_schema import (
    PrefichaSchema,
    PrefichaResponseSchema,
    PrefichaListSchema,
    preficha_schema,
    prefichas_schema,
    preficha_response_schema,
    prefichas_response_schema,
    preficha_list_schema
)

from app.schemas.project_schema import (
    ProjectSchema,
    ProjectResponseSchema,
    ProjectListSchema,
    project_schema,
    projects_schema,
    project_response_schema,
    projects_response_schema,
    project_list_schema
)

__all__ = [
    # User Schemas
    'UserSchema',
    'UserResponseSchema',
    'UserListSchema',
    'user_schema',
    'users_schema',
    'user_response_schema',
    'users_response_schema',
    'user_list_schema',
    # Preficha Schemas
    'PrefichaSchema',
    'PrefichaResponseSchema',
    'PrefichaListSchema',
    'preficha_schema',
    'prefichas_schema',
    'preficha_response_schema',
    'prefichas_response_schema',
    'preficha_list_schema',
    # Project Schemas
    'ProjectSchema',
    'ProjectResponseSchema',
    'ProjectListSchema',
    'project_schema',
    'projects_schema',
    'project_response_schema',
    'projects_response_schema',
    'project_list_schema'
]