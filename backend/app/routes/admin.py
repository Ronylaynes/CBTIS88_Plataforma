from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from app.models.preficha import Preficha
from app.models.teacher import Teacher
from app.models.project import Project
from app.middleware.auth_middleware import admin_required

admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/dashboard', methods=['GET'])
@admin_required()
def get_dashboard_stats():
    """Get admin dashboard statistics"""
    total_prefichas = Preficha.query.count()
    # ✅ Antes no se calculaban estos tres — el frontend los espera
    # (stats.pendientes, stats.aprobadas, stats.rechazadas) y siempre
    # mostraba 0 aunque sí hubiera datos.
    pendientes = Preficha.query.filter_by(status='pendiente').count()
    aprobadas  = Preficha.query.filter_by(status='aprobada').count()
    rechazadas = Preficha.query.filter_by(status='rechazada').count()

    total_projects = Project.query.filter_by(is_active=True).count()
    total_teachers = Teacher.query.filter_by(is_active=True).count()
    total_users = User.query.count()

    return jsonify({
        'stats': {
            'prefichas':  total_prefichas,
            'pendientes': pendientes,
            'aprobadas':  aprobadas,
            'rechazadas': rechazadas,
            'projects':   total_projects,
            'teachers':   total_teachers,
            'users':      total_users
        }
    }), 200


@admin_bp.route('/users', methods=['GET'])
@admin_required()
def get_all_users():
    """Get all users"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'users': [user.to_dict() for user in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200


# ════════════════════════════════════════════════════════════
# ✅ NUEVO — el frontend (Admin.jsx) llama a estas dos rutas
# para la sección "Prefichas" del panel, pero no existían.
# ════════════════════════════════════════════════════════════

@admin_bp.route('/prefichas', methods=['GET'])
@admin_required()
def get_prefichas_admin():
    """Listado de prefichas con filtros, para el panel admin"""
    page     = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    status   = request.args.get('status')
    search   = request.args.get('search', '').strip()

    query = Preficha.query

    if status and status != 'todos':
        query = query.filter(Preficha.status == status)

    if search:
        like = f'%{search}%'
        query = query.filter(
            db.or_(
                Preficha.nombre_completo.ilike(like),
                Preficha.curp.ilike(like),
                Preficha.folio.ilike(like),
            )
        )

    query = query.order_by(Preficha.created_at.desc())
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'prefichas':     [p.to_dict() for p in pagination.items],
        'total':         pagination.total,
        'pages':         pagination.pages,
        'current_page':  page
    }), 200


@admin_bp.route('/prefichas/<int:preficha_id>/status', methods=['PUT'])
@admin_required()
def update_preficha_status_admin(preficha_id):
    """Actualizar el estatus de una preficha desde el panel admin"""
    preficha = Preficha.query.get(preficha_id)
    if not preficha:
        return jsonify({'error': 'Preficha no encontrada'}), 404

    data = request.get_json() or {}
    nuevo_status = data.get('status')

    estatus_validos = ['pendiente', 'aprobada', 'rechazada', 'en_lista_espera', 'inscrito']
    if nuevo_status not in estatus_validos:
        return jsonify({
            'error': f'Status inválido. Debe ser uno de: {", ".join(estatus_validos)}'
        }), 400

    preficha.status = nuevo_status
    db.session.commit()

    return jsonify({
        'mensaje': 'Estatus actualizado correctamente',
        'preficha': preficha.to_dict()
    }), 200