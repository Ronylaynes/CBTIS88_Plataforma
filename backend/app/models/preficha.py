from app import db
from datetime import datetime

class Preficha(db.Model):
    """Preficha model for student pre-registration"""
    __tablename__ = 'prefichas'
    
    id = db.Column(db.Integer, primary_key=True)
    folio = db.Column(db.String(50), unique=True, nullable=False, index=True)
    
    # Personal Data
    apellido_paterno = db.Column(db.String(100), nullable=False)
    apellido_materno = db.Column(db.String(100), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String(1), nullable=False)  # M, F
    curp = db.Column(db.String(18), unique=True, nullable=False, index=True)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    lugar_nacimiento = db.Column(db.String(100), nullable=False)
    estado_nacimiento = db.Column(db.String(100), nullable=False)
    
    # Contact Data
    domicilio = db.Column(db.String(255), nullable=False)
    colonia = db.Column(db.String(100), nullable=False)
    codigo_postal = db.Column(db.String(5), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False)
    telefono_tutor = db.Column(db.String(10), nullable=False)
    telefono_alumno = db.Column(db.String(10))
    escuela_procedencia = db.Column(db.String(200), nullable=False)
    promedio_aproximado = db.Column(db.Float, nullable=False)
    
    # Academic Options
    opcion1 = db.Column(db.String(100), nullable=False)
    opcion1_especialidad = db.Column(db.String(200))
    opcion2 = db.Column(db.String(100))
    opcion3 = db.Column(db.String(100))
    
    # Payment
    metodo_pago = db.Column(db.String(20), nullable=False)  # transferencia, ventanilla
    payment_status = db.Column(db.String(20), default='pending', nullable=False)  # pending, paid, verified
    payment_proof = db.Column(db.String(255))  # Path to payment proof file
    payment_date = db.Column(db.DateTime)
    
    # Status
    status = db.Column(db.String(20), default='pending', nullable=False)  # pending, approved, rejected
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    def __init__(self, **kwargs):
        super(Preficha, self).__init__(**kwargs)
        if not self.folio:
            self.folio = self.generate_folio()
    
    def generate_folio(self):
        """Generate unique folio number"""
        year = datetime.utcnow().year
        last_preficha = Preficha.query.order_by(Preficha.id.desc()).first()
        next_number = (last_preficha.id + 1) if last_preficha else 1
        return f"CBTIS88-{year}-{str(next_number).zfill(4)}"
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'folio': self.folio,
            'apellido_paterno': self.apellido_paterno,
            'apellido_materno': self.apellido_materno,
            'nombre': self.nombre,
            'edad': self.edad,
            'sexo': self.sexo,
            'curp': self.curp,
            'fecha_nacimiento': self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            'lugar_nacimiento': self.lugar_nacimiento,
            'estado_nacimiento': self.estado_nacimiento,
            'domicilio': self.domicilio,
            'colonia': self.colonia,
            'codigo_postal': self.codigo_postal,
            'correo_electronico': self.correo_electronico,
            'telefono_tutor': self.telefono_tutor,
            'telefono_alumno': self.telefono_alumno,
            'escuela_procedencia': self.escuela_procedencia,
            'promedio_aproximado': self.promedio_aproximado,
            'opcion1': self.opcion1,
            'opcion1_especialidad': self.opcion1_especialidad,
            'opcion2': self.opcion2,
            'opcion3': self.opcion3,
            'metodo_pago': self.metodo_pago,
            'payment_status': self.payment_status,
            'payment_proof': self.payment_proof,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Preficha {self.folio}>'