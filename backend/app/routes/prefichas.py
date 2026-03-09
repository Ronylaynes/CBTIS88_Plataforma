from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.preficha_controller import PrefichaController
from app.middleware.validators import validate_preficha

prefichas_bp = Blueprint('prefichas', __name__)

@prefichas_bp.route('', methods=['GET'])
@jwt_required()
def get_all_prefichas():
    """Get all prefichas"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    filters = {
        'status': request.args.get('status'),
        'payment_status': request.args.get('payment_status'),
        'search': request.args.get('search')
    }
    filters = {k: v for k, v in filters.items() if v is not None}
    
    result, status_code = PrefichaController.get_all_prefichas(page, per_page, filters)
    return jsonify(result), status_code

@prefichas_bp.route('', methods=['POST'])
def create_preficha():
    """Create a new preficha"""
    data = request.get_json()
    
    # Validate data
    is_valid, errors = validate_preficha(data)
    if not is_valid:
        return jsonify({'errors': errors}), 400
    
    result, status_code = PrefichaController.create_preficha(data)
    return jsonify(result), status_code

@prefichas_bp.route('/<int:preficha_id>', methods=['GET'])
def get_preficha_by_id(preficha_id):
    """Get preficha by ID"""
    result, status_code = PrefichaController.get_preficha_by_id(preficha_id)
    return jsonify(result), status_code

@prefichas_bp.route('/folio/<string:folio>', methods=['GET'])
def get_preficha_by_folio(folio):
    """Get preficha by folio"""
    result, status_code = PrefichaController.get_preficha_by_folio(folio)
    return jsonify(result), status_code

@prefichas_bp.route('/<int:preficha_id>', methods=['PUT'])
@jwt_required()
def update_preficha(preficha_id):
    """Update preficha"""
    data = request.get_json()
    result, status_code = PrefichaController.update_preficha(preficha_id, data)
    return jsonify(result), status_code

@prefichas_bp.route('/<int:preficha_id>', methods=['DELETE'])
@jwt_required()
def delete_preficha(preficha_id):
    """Delete preficha"""
    result, status_code = PrefichaController.delete_preficha(preficha_id)
    return jsonify(result), status_code

@prefichas_bp.route('/<int:preficha_id>/payment', methods=['PATCH'])
@jwt_required()
def update_payment_status(preficha_id):
    """Update payment status"""
    data = request.get_json()
    result, status_code = PrefichaController.update_payment_status(preficha_id, data)
    return jsonify(result), status_code

@prefichas_bp.route('/statistics', methods=['GET'])
@jwt_required()
def get_statistics():
    """Get preficha statistics"""
    result, status_code = PrefichaController.get_statistics()
    return jsonify(result), status_code