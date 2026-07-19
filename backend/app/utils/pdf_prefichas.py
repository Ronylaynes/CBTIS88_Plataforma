import io
import base64
import reportlab.lib.pagesizes
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
from reportlab.lib.utils import ImageReader

# ── Paleta de colores ─────────────────────────────────
VINO       = colors.HexColor('#4A1220')
VINO_MED   = colors.HexColor('#6B1E2E')
DORADO     = colors.HexColor('#C9963A')
DORADO_PAL = colors.HexColor('#E8B96A')
CREMA      = colors.HexColor('#FDF8F0')
CREMA_DARK = colors.HexColor('#F0E6D0')
DORADO_BG  = colors.HexColor('#F5E6C8')
TEXTO      = colors.HexColor('#2C1810')
TEXTO_SOFT = colors.HexColor('#5C3D2E')
BLANCO     = colors.white

W, H = reportlab.lib.pagesizes.letter   # 612 x 792 pts


def _hex(h): return colors.HexColor(h)


class PrefichaPDF:
    """Genera el PDF de preficha con diseño vino y dorado."""

    MARGIN_L = 28 * mm
    MARGIN_R = 28 * mm
    MARGIN_T = 20 * mm

    def __init__(self, preficha_data: dict, escudo_path: str = None):
        self.data   = preficha_data
        self.escudo = escudo_path      # ruta al escudo .png/.jpg o None
        self.buf    = io.BytesIO()
        self.c      = canvas.Canvas(self.buf, pagesize=reportlab.lib.pagesizes.letter)
        self.c.setTitle(f"Preficha {preficha_data.get('folio', '')}")

    # ── API pública ───────────────────────────────────
    def generar(self) -> io.BytesIO:
        self._dibujar_pagina()
        self.c.save()
        self.buf.seek(0)
        return self.buf

    # ── Página completa ───────────────────────────────
    def _dibujar_pagina(self):
        c = self.c
        d = self.data

        # Fondo crema
        c.setFillColor(CREMA)
        c.rect(0, 0, W, H, fill=1, stroke=0)

        y = H - self.MARGIN_T

        y = self._header(y)
        y = self._meta_bar(y)
        y -= 6

        y = self._seccion_aspirante(y)
        y -= 6
        y = self._seccion_contacto(y)
        y -= 6
        y = self._seccion_opciones(y)
        y -= 6
        y = self._seccion_pago(y)
        y -= 8
        y = self._aviso(y)
        y -= 12
        y = self._firmas(y)

        self._footer()
        self._borde_exterior()

    # ── Encabezado ────────────────────────────────────
    def _header(self, y):
        c = self.c
        h = 72
        top = y
        bot = y - h

        # Fondo vino oscuro
        c.setFillColor(VINO)
        c.rect(0, bot, W, h, fill=1, stroke=0)

        # Franja dorada inferior
        c.setFillColor(DORADO)
        c.rect(0, bot, W, 3, fill=1, stroke=0)

        # ── Escudo ────────────────────────────────────
        cx = self.MARGIN_L
        cy = bot + h / 2
        r  = 26
        c.setFillColor(CREMA)
        c.setStrokeColor(DORADO)
        c.setLineWidth(1.5)
        c.circle(cx, cy, r, fill=1, stroke=1)

        if self.escudo:
            try:
                img = ImageReader(self.escudo)
                c.drawImage(img, cx - r + 2, cy - r + 2,
                            width=(r - 2) * 2, height=(r - 2) * 2,
                            mask='auto', preserveAspectRatio=True)
            except Exception:
                self._escudo_placeholder(cx, cy, r)
        else:
            self._escudo_placeholder(cx, cy, r)

        # ── Títulos ───────────────────────────────────
        tx = cx + r + 12
        c.setFillColor(DORADO_PAL)
        c.setFont('Helvetica-Bold', 11)
        c.drawString(tx, bot + h - 20,
                     'Centro de Bachillerato Tecnológico Industrial y de Servicios No. 88')

        c.setFillColor(CREMA)
        c.setFont('Helvetica', 9)
        c.drawString(tx, bot + h - 34, 'Solicitud de Preficha  ·  Ciclo Escolar 2025–2026')
        c.drawString(tx, bot + h - 46, 'Tapachula, Chiapas  ·  DGETI')

        # ── Folio box ─────────────────────────────────
        bx = W - self.MARGIN_R - 90
        by = bot + 12
        bw, bh = 86, 46
        c.setFillColor(_hex('#ffffff22'))
        c.setStrokeColor(DORADO)
        c.setLineWidth(0.8)
        c.roundRect(bx, by, bw, bh, 4, fill=1, stroke=1)

        c.setFillColor(DORADO_PAL)
        c.setFont('Helvetica', 7)
        c.drawCentredString(bx + bw / 2, by + bh - 10, 'FOLIO')

        folio = self.data.get('folio', 'CBTIS88-2025-0000')
        c.setFillColor(BLANCO)
        c.setFont('Helvetica-Bold', 8)
        c.drawCentredString(bx + bw / 2, by + bh - 22, folio)

        from datetime import datetime
        fecha = datetime.now().strftime('%d/%m/%Y  %H:%M')
        c.setFillColor(_hex('#FFFFFF80'))
        c.setFont('Helvetica', 7)
        c.drawCentredString(bx + bw / 2, by + bh - 34, fecha)

        estatus = self.data.get('status', 'pending')
        colores_est = {'pending': '#F59E0B', 'approved': '#10B981', 'rejected': '#EF4444'}
        col_est = colores_est.get(estatus, '#F59E0B')
        c.setFillColor(_hex(col_est))
        c.roundRect(bx + 16, by + 2, bw - 32, 12, 3, fill=1, stroke=0)
        c.setFillColor(BLANCO)
        c.setFont('Helvetica-Bold', 7)
        labels = {'pending': 'PENDIENTE', 'approved': 'APROBADO', 'rejected': 'RECHAZADO'}
        c.drawCentredString(bx + bw / 2, by + 5, labels.get(estatus, 'PENDIENTE'))

        return bot - 2

    def _escudo_placeholder(self, cx, cy, r):
        c = self.c
        c.setFillColor(VINO_MED)
        c.setFont('Helvetica-Bold', 7)
        c.drawCentredString(cx, cy + 5, 'CBTIS')
        c.drawCentredString(cx, cy - 4, 'No. 88')
        c.setStrokeColor(DORADO)
        c.setLineWidth(0.5)
        c.line(cx - 14, cy - 8, cx + 14, cy - 8)

    # ── Barra de meta ─────────────────────────────────
    def _meta_bar(self, y):
        c = self.c
        h = 18
        c.setFillColor(DORADO_BG)
        c.rect(0, y - h, W, h, fill=1, stroke=0)
        c.setStrokeColor(DORADO)
        c.setLineWidth(0.5)
        c.line(0, y - h, W, y - h)

        ficha  = self.data.get('ficha_num', '#42')
        monto  = self.data.get('monto', '$500.00 MXN')
        pago   = self.data.get('payment_status', 'paid')
        labels_p = {'paid': 'PAGADO', 'pending': 'PENDIENTE', 'verified': 'VERIFICADO'}

        c.setFillColor(TEXTO)
        c.setFont('Helvetica', 8)
        c.drawString(self.MARGIN_L, y - 12,
                     f'Ficha núm.: {ficha}   ·   Monto: {monto}   ·   '
                     f'Pago: {labels_p.get(pago, pago)}   ·   '
                     f'Fecha: {self.data.get("created_at", "—")[:10]}')
        return y - h

    # ── Sección: título ───────────────────────────────
    def _titulo_seccion(self, y, texto):
        c = self.c
        x = self.MARGIN_L
        w = W - self.MARGIN_L - self.MARGIN_R

        c.setFillColor(DORADO)
        c.circle(x + 4, y - 5, 3, fill=1, stroke=0)

        c.setFillColor(VINO)
        c.setFont('Helvetica-Bold', 8)
        c.drawString(x + 12, y - 8, texto.upper())

        c.setStrokeColor(DORADO)
        c.setLineWidth(1)
        c.line(x, y - 12, x + w, y - 12)
        return y - 18

    # ── Campo individual ──────────────────────────────
    def _campo(self, x, y, w, label, valor, label_sz=7, val_sz=10):
        c = self.c
        c.setFillColor(TEXTO_SOFT)
        c.setFont('Helvetica', label_sz)
        c.drawString(x, y, label)

        c.setFillColor(TEXTO)
        c.setFont('Helvetica-Bold', val_sz)
        val_str = str(valor) if valor else '—'
        c.drawString(x, y - 12, val_str)

        c.setStrokeColor(DORADO_PAL)
        c.setLineWidth(0.5)
        c.line(x, y - 14, x + w, y - 14)

    # ── Sección 1: Aspirante ──────────────────────────
    def _seccion_aspirante(self, y):
        c  = self.c
        d  = self.data
        ml = self.MARGIN_L
        mr = self.MARGIN_R
        aw = W - ml - mr

        y = self._titulo_seccion(y, '1. Datos del aspirante')

        # Foto box (derecha)
        pb_w, pb_h = 60, 75
        pb_x = W - mr - pb_w
        pb_y = y - pb_h

        c.setFillColor(CREMA_DARK)
        c.setStrokeColor(DORADO)
        c.setLineWidth(1)
        c.roundRect(pb_x, pb_y, pb_w, pb_h, 4, fill=1, stroke=1)

        foto = d.get('foto_base64')
        if foto:
            try:
                _, b64 = foto.split(',', 1)
                img_bytes = base64.b64decode(b64)
                img_buf   = io.BytesIO(img_bytes)
                img_r     = ImageReader(img_buf)
                c.drawImage(img_r, pb_x + 2, pb_y + 14,
                            width=pb_w - 4, height=pb_h - 16,
                            preserveAspectRatio=True, mask='auto')
            except Exception:
                self._foto_placeholder(c, pb_x, pb_y, pb_w, pb_h)
        else:
            self._foto_placeholder(c, pb_x, pb_y, pb_w, pb_h)

        c.setFillColor(TEXTO_SOFT)
        c.setFont('Helvetica', 7)
        c.drawCentredString(pb_x + pb_w / 2, pb_y + 4, '3 × 4 cm')

        # Campos aspirante
        cw = (pb_x - ml - 8) / 3
        cols = [ml, ml + cw + 4, ml + (cw + 4) * 2]

        # Fila 1
        self._campo(cols[0], y, cw, 'Apellido paterno', d.get('apellido_paterno', ''))
        self._campo(cols[1], y, cw, 'Apellido materno', d.get('apellido_materno', ''))
        self._campo(cols[2], y, cw, 'Nombre(s)',        d.get('nombre', ''))
        y -= 24

        # Fila 2
        cw4 = (pb_x - ml - 12) / 4
        cols4 = [ml + (cw4 + 4) * i for i in range(4)]
        self._campo(cols4[0], y, cw4, 'Edad',  d.get('edad', ''))
        self._campo(cols4[1], y, cw4, 'Sexo',  'Masculino' if d.get('sexo') == 'M' else 'Femenino')
        fn = d.get('fecha_nacimiento', '')
        self._campo(cols4[2], y, cw4, 'Fecha de nacimiento', fn)
        self._campo(cols4[3], y, cw4 - 4, 'CURP', d.get('curp', ''), val_sz=8)
        y -= 24

        # Fila 3
        self._campo(cols[0], y, cw, 'Lugar de nacimiento', d.get('lugar_nacimiento', ''))
        self._campo(cols[1], y, cw, 'Estado',              d.get('estado_nacimiento', ''))
        y -= 24

        return y

    def _foto_placeholder(self, c, x, y, w, h):
        c.setFillColor(TEXTO_SOFT)
        c.setFont('Helvetica', 7)
        c.drawCentredString(x + w / 2, y + h / 2 + 4, 'Foto del')
        c.drawCentredString(x + w / 2, y + h / 2 - 5, 'aspirante')

    # ── Sección 2: Contacto ───────────────────────────
    def _seccion_contacto(self, y):
        d  = self.data
        ml = self.MARGIN_L
        mr = self.MARGIN_R
        aw = W - ml - mr
        cw2 = (aw - 8) / 2
        cw4 = (aw - 12) / 4

        y = self._titulo_seccion(y, '2. Datos de contacto y origen')

        self._campo(ml,          y, cw2, 'Domicilio (calle y número)', d.get('domicilio', ''))
        self._campo(ml + cw2 + 8,y, cw2, 'Colonia',                   d.get('colonia', ''))
        y -= 24

        cols4 = [ml + (cw4 + 4) * i for i in range(4)]
        self._campo(cols4[0], y, cw4,     'Código postal',      d.get('codigo_postal', ''))
        self._campo(cols4[1], y, cw4 + 8, 'Correo electrónico', d.get('correo_electronico', ''), val_sz=8)
        self._campo(cols4[2], y, cw4,     'Tel. tutor',         d.get('telefono_tutor', ''))
        self._campo(cols4[3], y, cw4,     'Tel. alumno',        d.get('telefono_alumno', ''))
        y -= 24

        self._campo(ml,           y, cw2, 'Escuela de procedencia', d.get('escuela_procedencia', ''))
        self._campo(ml + cw2 + 8, y, cw2, 'Promedio aproximado',    d.get('promedio_aproximado', ''))
        y -= 24

        return y

    # ── Sección 3: Opciones ───────────────────────────
    def _seccion_opciones(self, y):
        d  = self.data
        c  = self.c
        ml = self.MARGIN_L
        aw = W - ml - self.MARGIN_R
        cw = (aw - 16) / 3

        y = self._titulo_seccion(y, '3. Opciones académicas')

        opciones = [
            ('1ª opción · preferente', d.get('opcion1', '—'), d.get('opcion1_especialidad', ''), True),
            ('2ª opción',              d.get('opcion2', '—'), '',                                False),
            ('3ª opción',              d.get('opcion3', '—'), '',                                False),
        ]

        for i, (num, nom, det, primera) in enumerate(opciones):
            bx = ml + (cw + 8) * i
            bh = 42
            by = y - bh

            # Fondo
            c.setFillColor(CREMA_DARK if not primera else _hex('#FFF5E6'))
            borde = VINO if primera else DORADO_PAL
            c.setStrokeColor(borde)
            c.setLineWidth(1.5 if primera else 0.5)
            c.roundRect(bx, by, cw, bh, 4, fill=1, stroke=1)

            # Número
            c.setFillColor(VINO if primera else TEXTO_SOFT)
            c.setFont('Helvetica-Bold', 7)
            c.drawString(bx + 8, y - 10, num.upper())

            # Nombre
            c.setFillColor(TEXTO)
            c.setFont('Helvetica-Bold', 10)
            c.drawString(bx + 8, y - 22, nom or '—')

            # Detalle
            if det:
                c.setFillColor(TEXTO_SOFT)
                c.setFont('Helvetica', 8)
                c.drawString(bx + 8, y - 33, det)

        return y - 42 - 8

    # ── Sección 4: Pago ───────────────────────────────
    def _seccion_pago(self, y):
        d  = self.data
        c  = self.c
        ml = self.MARGIN_L
        aw = W - ml - self.MARGIN_R
        cw = (aw - 12) / 4

        y = self._titulo_seccion(y, '4. Método de pago')

        items = [
            ('Método',       d.get('metodo_pago', 'Transferencia').capitalize()),
            ('Monto',        '$500.00 MXN'),
            ('Estado',       d.get('payment_status', 'pending').upper()),
            ('Fecha de pago',d.get('payment_date', '—')),
        ]

        for i, (lbl, val) in enumerate(items):
            bx = ml + (cw + 4) * i
            bh = 36
            by = y - bh
            c.setFillColor(CREMA_DARK)
            c.setStrokeColor(DORADO_PAL)
            c.setLineWidth(0.5)
            c.roundRect(bx, by, cw, bh, 4, fill=1, stroke=1)
            self._campo(bx + 6, y - 8, cw - 12, lbl, val, val_sz=9)

        return y - 36 - 8

    # ── Aviso ─────────────────────────────────────────
    def _aviso(self, y):
        c  = self.c
        ml = self.MARGIN_L
        aw = W - ml - self.MARGIN_R
        h  = 28

        c.setFillColor(_hex('#FFFBEB'))
        c.setStrokeColor(_hex('#FCD34D'))
        c.setLineWidth(2)
        c.roundRect(ml, y - h, aw, h, 0, fill=1, stroke=0)
        c.line(ml, y - h, ml, y)   # borde izquierdo dorado
        c.setStrokeColor(_hex('#FCD34D'))
        c.setLineWidth(3)
        c.line(ml, y - h, ml, y)

        c.setFillColor(_hex('#78350F'))
        c.setFont('Helvetica', 8)
        c.drawString(ml + 10, y - 11,
            'Conserva este comprobante. Tu solicitud sera revisada en 24 a 48 horas.')
        c.drawString(ml + 10, y - 22,
            'Recibiras confirmacion al correo registrado con tu numero de folio oficial.')
        return y - h

    # ── Firmas ────────────────────────────────────────
    def _firmas(self, y):
        c  = self.c
        ml = self.MARGIN_L
        aw = W - ml - self.MARGIN_R

        # Línea superior
        c.setStrokeColor(DORADO_PAL)
        c.setLineWidth(0.5)
        c.line(ml, y, ml + aw, y)
        y -= 30

        lw = 140
        gap = aw - lw * 2
        x1  = ml + gap / 3
        x2  = ml + aw - gap / 3 - lw

        for x in [x1, x2]:
            c.setStrokeColor(TEXTO_SOFT)
            c.setLineWidth(0.7)
            c.line(x, y, x + lw, y)

        c.setFillColor(TEXTO_SOFT)
        c.setFont('Helvetica', 8)
        c.drawCentredString(x1 + lw / 2,  y - 10, 'Firma del aspirante')
        c.drawCentredString(x2 + lw / 2,  y - 10, 'Firma del tutor / padre de familia')
        return y - 20

    # ── Footer ────────────────────────────────────────
    def _footer(self):
        c = self.c
        c.setFillColor(VINO)
        c.rect(0, 0, W, 22, fill=1, stroke=0)
        c.setFillColor(DORADO)
        c.rect(0, 22, W, 2, fill=1, stroke=0)

        c.setFillColor(DORADO_PAL)
        c.setFont('Helvetica-Bold', 8)
        c.drawString(self.MARGIN_L, 8, 'CBTIS No. 88  ·  Tapachula, Chiapas')
        c.setFillColor(_hex('#FFFFFF80'))
        c.setFont('Helvetica', 7)
        c.drawRightString(W - self.MARGIN_R, 8,
                          'Documento generado automaticamente  ·  No valido sin folio oficial')

    # ── Borde exterior ────────────────────────────────
    def _borde_exterior(self):
        c = self.c
        c.setStrokeColor(DORADO)
        c.setLineWidth(1.5)
        c.roundRect(4, 4, W - 8, H - 8, 6, fill=0, stroke=1)