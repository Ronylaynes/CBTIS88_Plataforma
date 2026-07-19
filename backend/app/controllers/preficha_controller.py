import io
import csv
import base64
import openpyxl
from openpyxl.drawing.image import Image as XLImage
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from app import db


class PrefichaController:

    @staticmethod
    def create_preficha(data):
        from app.models.preficha import Preficha
        try:
            nombre = data.get("nombre") or ""
            apellido_paterno = data.get("apellido_paterno") or ""
            apellido_materno = data.get("apellido_materno") or ""
            preficha = Preficha(
                apellido_paterno  = apellido_paterno,
                apellido_materno  = apellido_materno,
                nombre            = nombre,
                nombre_completo   = f"{nombre} {apellido_paterno} {apellido_materno}",
                curp              = data.get("curp", "").upper(),
                fecha_nacimiento  = data.get("fecha_nacimiento") or "2000-01-01",
                sexo              = data.get("sexo") or "M",
                telefono          = data.get("telefono_tutor") or "",
                email             = data.get("correo_electronico") or "",
                direccion         = data.get("domicilio") or "",
                especialidad_1    = data.get("opcion1") or "",
                especialidad_2    = data.get("opcion2"),
                especialidad_3    = data.get("opcion3"),
                secundaria_nombre = data.get("escuela_procedencia"),
                promedio_egreso   = data.get("promedio_aproximado"),
                tutor_nombre      = data.get("tutor_nombre"),
                tutor_telefono    = data.get("telefono_tutor"),
                foto_base64       = data.get("foto_base64"),
                metodo_pago       = data.get("metodo_pago"),
                status            = "pendiente",
            )
            db.session.add(preficha)
            db.session.commit()
            return {"mensaje": "Preficha creada exitosamente", "preficha": {"folio": preficha.folio}}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    @staticmethod
    def get_all_prefichas(page, per_page, filters):
        from app.models.preficha import Preficha
        query = Preficha.query
        if filters.get("status"):
            query = query.filter(Preficha.status == filters["status"])
        prefichas = query.paginate(page=page, per_page=per_page, error_out=False)
        return {"prefichas": [p.to_dict() for p in prefichas.items], "total": prefichas.total, "pages": prefichas.pages, "current_page": page}, 200

    @staticmethod
    def get_preficha_by_id(preficha_id):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        return {"preficha": preficha.to_dict()}, 200

    @staticmethod
    def get_preficha_by_folio(folio):
        from app.models.preficha import Preficha
        preficha = Preficha.query.filter_by(folio=folio).first()
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        return {"preficha": preficha.to_dict()}, 200

    @staticmethod
    def update_preficha(preficha_id, data):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        for key, value in data.items():
            if hasattr(preficha, key):
                setattr(preficha, key, value)
        db.session.commit()
        return {"mensaje": "Preficha actualizada"}, 200

    @staticmethod
    def delete_preficha(preficha_id):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        db.session.delete(preficha)
        db.session.commit()
        return {"mensaje": "Preficha eliminada"}, 200

    @staticmethod
    def update_payment_status(preficha_id, data):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        preficha.pago_confirmado = data.get("pago_confirmado", False)
        db.session.commit()
        return {"mensaje": "Pago actualizado"}, 200

    @staticmethod
    def update_status(preficha_id, data):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}, 404
        preficha.status = data.get("status")
        db.session.commit()
        return {"mensaje": "Status actualizado"}, 200

    @staticmethod
    def get_statistics():
        from app.models.preficha import Preficha
        total = Preficha.query.count()
        pendientes = Preficha.query.filter_by(status="pending").count()
        aprobadas = Preficha.query.filter_by(status="approved").count()
        return {"total": total, "pendientes": pendientes, "aprobadas": aprobadas}, 200

    @staticmethod
    def guardar_foto(preficha_id, foto_base64):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}
        preficha.foto_base64 = foto_base64
        db.session.commit()
        return {"mensaje": "Foto guardada", "preficha_id": preficha_id}

    @staticmethod
    def obtener_foto(preficha_id):
        from app.models.preficha import Preficha
        preficha = Preficha.query.get(preficha_id)
        if not preficha:
            return {"error": "Preficha no encontrada"}
        return {"foto_base64": preficha.foto_base64}
