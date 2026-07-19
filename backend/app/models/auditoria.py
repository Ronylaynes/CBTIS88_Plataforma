# backend/app/models/auditoria.py
from app import db
from datetime import datetime

class Auditoria(db.Model):
    __tablename__ = 'auditoria'

    id          = db.Column(db.BigInteger, primary_key=True,
                            autoincrement=True)
    user_id     = db.Column(db.Integer,
                            db.ForeignKey('users.id',
                            ondelete='SET NULL'),
                            nullable=True, index=True)
    accion      = db.Column(db.String(100), nullable=False,
                            index=True)
    tabla       = db.Column(db.String(100), nullable=True)
    registro_id = db.Column(db.Integer, nullable=True)
    detalle     = db.Column(db.JSON, nullable=True)
    ip          = db.Column(db.String(45), nullable=True)
    created_at  = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            nullable=False)

    def to_dict(self):
        return {
            'id':          self.id,
            'user_id':     self.user_id,
            'accion':      self.accion,
            'tabla':       self.tabla,
            'registro_id': self.registro_id,
            'detalle':     self.detalle,
            'ip':          self.ip,
            'created_at':  str(self.created_at),
        }

    def __repr__(self):
        return f'<Auditoria {self.accion}>'