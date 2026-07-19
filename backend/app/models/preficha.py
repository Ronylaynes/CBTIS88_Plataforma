from app import db
from datetime import datetime

class Preficha(db.Model):
    __tablename__ = "prefichas"

    id = db.Column(db.Integer, primary_key=True)
    folio = db.Column(db.String(20), unique=True, nullable=False)
    curp = db.Column(db.String(18), unique=True, nullable=False)
    nombre_completo = db.Column(db.String(300), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    apellido_paterno = db.Column(db.String(100), nullable=False)
    apellido_materno = db.Column(db.String(100), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    sexo = db.Column(db.String(2), nullable=False)
    telefono = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(191), nullable=False)
    direccion = db.Column(db.Text)
    especialidad_1 = db.Column(db.String(100), nullable=False)
    especialidad_2 = db.Column(db.String(100))
    especialidad_3 = db.Column(db.String(100))
    secundaria_nombre = db.Column(db.String(200))
    promedio_egreso = db.Column(db.Float)
    tutor_nombre = db.Column(db.String(200))
    tutor_parentesco = db.Column(db.String(50))
    tutor_telefono = db.Column(db.String(15))
    tutor_email = db.Column(db.String(191))
    foto_url = db.Column(db.String(500))
    foto_base64 = db.Column(db.Text)
    metodo_pago = db.Column(db.String(100))
    pago_confirmado = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default="pendiente")
    observaciones = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    def __init__(self, **kwargs):
        super(Preficha, self).__init__(**kwargs)
        if not self.folio:
            self.folio = self.generate_folio()

    def generate_folio(self):
        year = datetime.utcnow().year
        last = Preficha.query.order_by(Preficha.id.desc()).first()
        num = (last.id + 1) if last else 1
        return f"CBT{year}A{str(num).zfill(4)}"

    def to_dict(self):
        return {
            "id": self.id,
            "folio": self.folio,
            "nombre": self.nombre,
            "apellido_paterno": self.apellido_paterno,
            "apellido_materno": self.apellido_materno,
            "curp": self.curp,
            "email": self.email,
            "especialidad_1": self.especialidad_1,
            "metodo_pago": self.metodo_pago,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f"<Preficha {self.folio}>"
