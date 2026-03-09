from app import db
from sqlalchemy import inspect

def init_database():
    """Initialize database and create tables"""
    db.create_all()
    print("Database initialized successfully")

def drop_database():
    """Drop all tables"""
    db.drop_all()
    print("Database dropped successfully")

def reset_database():
    """Reset database (drop and recreate)"""
    drop_database()
    init_database()
    print("Database reset successfully")

def get_or_create(model, **kwargs):
    """Get existing instance or create new one"""
    instance = model.query.filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        instance = model(**kwargs)
        db.session.add(instance)
        db.session.commit()
        return instance, True

def save_to_db(instance):
    """Save instance to database"""
    try:
        db.session.add(instance)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Error saving to database: {str(e)}")
        return False

def delete_from_db(instance):
    """Delete instance from database"""
    try:
        db.session.delete(instance)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting from database: {str(e)}")
        return False

def update_db(instance, **kwargs):
    """Update instance with new values"""
    try:
        for key, value in kwargs.items():
            if hasattr(instance, key):
                setattr(instance, key, value)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Error updating database: {str(e)}")
        return False

def table_exists(table_name):
    """Check if table exists in database"""
    inspector = inspect(db.engine)
    return table_name in inspector.get_table_names()

def get_table_columns(table_name):
    """Get column names for a table"""
    inspector = inspect(db.engine)
    return [column['name'] for column in inspector.get_columns(table_name)]