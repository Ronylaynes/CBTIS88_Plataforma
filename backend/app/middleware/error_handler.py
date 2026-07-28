# backend/app/middleware/error_handler.py
from flask import jsonify
from werkzeug.exceptions import HTTPException
from sqlalchemy.exc import SQLAlchemyError
import traceback

def register_error_handlers(app):

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad Request',
            'message': str(error)
        }), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Authentication required'
        }), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'message': 'You do not have permission'
        }), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource was not found'
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            'error': 'Method Not Allowed',
            'message': str(error)
        }), 405

    @app.errorhandler(422)
    def unprocessable_entity(error):
        return jsonify({
            'error': 'Unprocessable Entity',
            'message': str(error)
        }), 422

    @app.errorhandler(500)
    def internal_server_error(error):
        # ✅ Muestra el traceback completo en los logs
        app.logger.error(f'500 error: {traceback.format_exc()}')
        return jsonify({
            'error': 'Internal Server Error',
            'message': str(error),
            'detail': traceback.format_exc()
        }), 500

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(error):
        app.logger.error(f'Database error: {traceback.format_exc()}')
        return jsonify({
            'error': 'Database Error',
            'message': str(error),
            'detail': traceback.format_exc()
        }), 500

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify({
            'error': error.name,
            'message': error.description
        }), error.code

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        # ✅ Muestra el error completo
        app.logger.error(f'Unexpected error: {traceback.format_exc()}')
        return jsonify({
            'error': 'Unexpected Error',
            'message': str(error),
            'detail': traceback.format_exc()
        }), 500