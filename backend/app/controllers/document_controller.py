from app import db
from app.models.document import Document
from datetime import datetime

class DocumentController:
    @staticmethod
    def create_document(data, file_path):
        """Create a new document"""
        try:
            document = Document(
                title=data['title'],
                description=data.get('description'),
                category=data['category'],
                file_path=file_path,
                file_type=data.get('file_type'),
                file_size=data.get('file_size'),
                is_public=data.get('is_public', True),
                uploaded_by=data.get('uploaded_by')
            )
            
            db.session.add(document)
            db.session.commit()
            
            return {
                'message': 'Document uploaded successfully',
                'document': document.to_dict()
            }, 201
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_documents(page=1, per_page=10, filters=None):
        """Get all documents with pagination"""
        try:
            query = Document.query.filter_by(is_public=True)
            
            # Apply filters
            if filters:
                if 'category' in filters:
                    query = query.filter_by(category=filters['category'])
            
            # Paginate
            pagination = query.order_by(Document.upload_date.desc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
            
            return {
                'documents': [d.to_dict() for d in pagination.items],
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': page,
                'per_page': per_page
            }, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_document_by_id(document_id):
        """Get document by ID"""
        try:
            document = Document.query.get(document_id)
            
            if not document:
                return {'error': 'Document not found'}, 404
            
            return {'document': document.to_dict()}, 200
            
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_document(document_id):
        """Delete document"""
        try:
            document = Document.query.get(document_id)
            
            if not document:
                return {'error': 'Document not found'}, 404
            
            db.session.delete(document)
            db.session.commit()
            
            return {'message': 'Document deleted successfully'}, 200
            
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500