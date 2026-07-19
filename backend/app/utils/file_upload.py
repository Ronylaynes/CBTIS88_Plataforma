import os
from werkzeug.utils import secure_filename
from flask import current_app
import uuid

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

def allowed_file(filename, allowed_extensions=None):
    """Check if file extension is allowed"""
    if allowed_extensions is None:
        allowed_extensions = current_app.config.get('ALLOWED_EXTENSIONS', {'png', 'jpg', 'jpeg', 'pdf'})
    
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def generate_unique_filename(filename):
    """Generate unique filename using UUID"""
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    return unique_filename

def save_file(file, folder='uploads', subfolder=None):
    """Save uploaded file and return path"""
    try:
        if not file or not allowed_file(file.filename):
            return None, "Invalid file type"
        
        # Create upload directory if it doesn't exist
        upload_path = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'uploads'), folder)
        if subfolder:
            upload_path = os.path.join(upload_path, subfolder)
        
        os.makedirs(upload_path, exist_ok=True)
        
        # Generate unique filename
        filename = generate_unique_filename(file.filename)
        filepath = os.path.join(upload_path, filename)
        
        # Save file
        file.save(filepath)
        
        # Return relative path
        relative_path = os.path.join(folder, subfolder if subfolder else '', filename)
        return relative_path, None
        
    except Exception as e:
        return None, str(e)

def save_image(file, folder='images', max_size=(1920, 1080), thumbnail_size=(300, 300)):
    """Save image with resizing and thumbnail"""
    try:
        if not PIL_AVAILABLE:
            return None, None, "Pillow no está instalado. Ejecuta: pip install Pillow"

        if not file or not allowed_file(file.filename, {'png', 'jpg', 'jpeg'}):
            return None, None, "Invalid image type"
        
        # Create directories
        upload_path = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'uploads'), folder)
        thumbnail_path = os.path.join(upload_path, 'thumbnails')
        os.makedirs(upload_path, exist_ok=True)
        os.makedirs(thumbnail_path, exist_ok=True)
        
        # Generate filename
        filename = generate_unique_filename(file.filename)
        
        # Open and process image
        image = Image.open(file)
        
        # Convert RGBA to RGB if necessary
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        
        # Resize main image
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        main_filepath = os.path.join(upload_path, filename)
        image.save(main_filepath, quality=85, optimize=True)
        
        # Create thumbnail
        thumbnail = image.copy()
        thumbnail.thumbnail(thumbnail_size, Image.Resampling.LANCZOS)
        thumbnail_filepath = os.path.join(thumbnail_path, filename)
        thumbnail.save(thumbnail_filepath, quality=85, optimize=True)
        
        # Return relative paths
        main_relative = os.path.join(folder, filename)
        thumbnail_relative = os.path.join(folder, 'thumbnails', filename)
        
        return main_relative, thumbnail_relative, None
        
    except Exception as e:
        return None, None, str(e)

def delete_file(filepath):
    """Delete file from filesystem"""
    try:
        full_path = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'uploads'), filepath)
        if os.path.exists(full_path):
            os.remove(full_path)
            return True
        return False
    except Exception as e:
        print(f"Error deleting file: {str(e)}")
        return False

def get_file_size(filepath):
    """Get file size in bytes"""
    try:
        full_path = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'uploads'), filepath)
        return os.path.getsize(full_path)
    except:
        return 0

def format_file_size(size_bytes):
    """Format file size to human readable format"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} TB"