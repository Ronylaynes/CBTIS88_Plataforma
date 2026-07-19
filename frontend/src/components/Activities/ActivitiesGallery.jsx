// ================================================================
//  ARCHIVO: frontend/src/components/Activities/ActivitiesGallery.jsx
//
//  ÁLBUM DE 4 FOTOS:
//  Cada actividad tiene un array "imgs" con 4 rutas de imagen.
//  La tarjeta muestra solo imgs[0].
//  El modal muestra un slider automático con las 4 fotos.
//
//  NOMBRES DE ARCHIVOS:
//  Carpeta: frontend/public/assets/actividades/
//  Formato: nombre-actividad-1.jpg, nombre-actividad-2.jpg, nombre-actividad-3.jpg, nombre-actividad-4.jpg
// ================================================================

import { useState, useEffect, useRef, useCallback } from 'react'

const ACTIVIDADES_DEMO = [
  {
    id: 1,
    titulo: 'Colecta Solidaria 4° "B" de Electricidad',
    categoria: 'Vinculación',
    estatus: 'Concluido',
    desc: 'Los alumnos del 4° "B" de Electricidad organizaron una colecta de zapatos, ropa y juguetes coordinada por la Mtra. Fanny. Lo recolectado fue entregado al albergue El Buen Pastor de Tapachula.',
    imgs: [
      '/assets/actividades/colecta-solidaria-1.jpg',
      '/assets/actividades/colecta-solidaria-2.jpg',
      '/assets/actividades/colecta-solidaria-3.jpg',
      '/assets/actividades/colecta-solidaria-4.jpg',
    ],
    año: '2025',
    participantes: 'Alumnos 4° "B" — Electricidad',
  },
  {
    id: 2,
    titulo: 'Día Mundial del Medio Ambiente — Pósters en Inglés',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Conmemoración del Día Mundial del Medio Ambiente mediante la elaboración de pósters en la materia de Inglés, concientizando a los jóvenes sobre el cuidado del planeta.',
    imgs: [
      '/assets/actividades/medio-ambiente-1.jpg',
      '/assets/actividades/medio-ambiente-2.jpg',
      '/assets/actividades/medio-ambiente-3.jpg',
      '/assets/actividades/medio-ambiente-4.jpg',
    ],
    año: '2025',
    participantes: 'Alumnos de la materia de Inglés',
  },
  {
    id: 3,
    titulo: 'Evento EDUSEX — Salud Sexual',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'El CBTis 88 fue sede del evento EDUSEX para promover una salud sexual sana y brindar información que contribuya al bienestar y la toma de decisiones informadas entre los estudiantes.',
    imgs: [
      '/assets/actividades/edusex-1.jpg',
      '/assets/actividades/edusex-2.jpg',
      '/assets/actividades/edusex-3.jpg',
      '/assets/actividades/edusex-4.jpg',
    ],
    año: '2025',
    participantes: 'Toda la comunidad estudiantil',
  },
  {
    id: 4,
    titulo: 'Jornada Preventiva: "Los Vapeadores No Son Lo Que Parecen"',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'Jornada de prevención sobre los riesgos reales del uso de vapeadores, presentando información sobre sus componentes y efectos en la salud de los adolescentes del plantel.',
    imgs: [
      '/assets/actividades/vapeadores-1.jpg',
      '/assets/actividades/vapeadores-2.jpg',
      '/assets/actividades/vapeadores-3.jpg',
      '/assets/actividades/vapeadores-4.jpg',
    ],
    año: '2025',
    participantes: 'Comunidad estudiantil',
  },
  {
    id: 5,
    titulo: 'Pláticas Informativas de Servicio Social',
    categoria: 'Institucional',
    estatus: 'Concluido',
    desc: 'Inicio de pláticas informativas sobre el servicio social dirigidas a los alumnos de cuarto semestre, quienes están próximos a realizar esta importante actividad formativa.',
    imgs: [
      '/assets/actividades/servicio-social-1.jpg',
      '/assets/actividades/servicio-social-2.jpg',
      '/assets/actividades/servicio-social-3.jpg',
      '/assets/actividades/servicio-social-4.jpg',
    ],
    año: '2025',
    participantes: 'Alumnos de 4° semestre',
  },
  {
    id: 6,
    titulo: 'Firma de Acuerdo CBTis 88 — Universidad Valle de Grijalva',
    categoria: 'Vinculación',
    estatus: 'Concluido',
    desc: 'Firma de Acuerdo de Colaboración entre el CBTis 88 y la Universidad Valle de Grijalva (UVG), fortaleciendo la vinculación académica y abriendo oportunidades de continuación de estudios.',
    imgs: [
      '/assets/actividades/firma-uvg-1.jpg',
      '/assets/actividades/firma-uvg-2.jpg',
      '/assets/actividades/firma-uvg-3.jpg',
      '/assets/actividades/firma-uvg-4.jpg',
    ],
    año: '2025',
    participantes: 'Directivos CBTIS 88 y UVG',
  },
  {
    id: 7,
    titulo: '2° Foro Estudiantil de Contabilidad',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Segundo Foro Estudiantil de Contabilidad en conmemoración al Día del Contador Público, organizado por la especialidad de Contabilidad con ponentes invitados y participación masiva.',
    imgs: [
      '/assets/actividades/foro-contabilidad-1.jpg',
      '/assets/actividades/foro-contabilidad-2.jpg',
      '/assets/actividades/foro-contabilidad-3.jpg',
      '/assets/actividades/foro-contabilidad-4.jpg',
    ],
    año: '2025',
    participantes: 'Especialidad de Contabilidad',
  },
  {
    id: 8,
    titulo: 'Presentación Nueva Carrera: Ingeniería Eléctrica TecNM',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Estudiantes de 6to y 4to de Electricidad participaron en la presentación de la nueva carrera de Ingeniería Eléctrica del TecNM, conociendo nuevas opciones académicas.',
    imgs: [
      '/assets/actividades/ing-electrica-tecnm-1.jpg',
      '/assets/actividades/ing-electrica-tecnm-2.jpg',
      '/assets/actividades/ing-electrica-tecnm-3.jpg',
      '/assets/actividades/ing-electrica-tecnm-4.jpg',
    ],
    año: '2025',
    participantes: '6° y 4° Semestre — Electricidad',
  },
  {
    id: 9,
    titulo: 'Visita Académica a Subestación Río Florido',
    categoria: 'Vinculación',
    estatus: 'Concluido',
    desc: 'Estudiantes de 6° "B" de Electricidad realizaron una visita académica a la Subestación de Río Florido, conociendo el funcionamiento real de instalaciones eléctricas de alta tensión.',
    imgs: [
      '/assets/actividades/subestacion-rio-florido-1.jpg',
      '/assets/actividades/subestacion-rio-florido-2.jpg',
      '/assets/actividades/subestacion-rio-florido-3.jpg',
      '/assets/actividades/subestacion-rio-florido-4.jpg',
    ],
    año: '2025',
    participantes: '6° "B" — Electricidad',
  },
  {
    id: 10,
    titulo: 'Visita Académica a CFE — 6° "G" Electricidad',
    categoria: 'Vinculación',
    estatus: 'Concluido',
    desc: 'El grupo de 6° "G" de Electricidad visitó las instalaciones de la CFE, fortaleciendo su formación con experiencias reales del sector energético fuera del aula.',
    imgs: [
      '/assets/actividades/visita-cfe-1.jpg',
      '/assets/actividades/visita-cfe-2.jpg',
      '/assets/actividades/visita-cfe-3.jpg',
      '/assets/actividades/visita-cfe-4.jpg',
    ],
    año: '2025',
    participantes: '6° "G" — Electricidad',
  },
  {
    id: 11,
    titulo: 'Reconocimientos 3er Congreso Internacional de Ingeniería',
    categoria: 'Cívico',
    estatus: 'Concluido',
    desc: 'Durante el homenaje cívico, se entregaron reconocimientos a los estudiantes que participaron en el 3er Congreso Internacional de Ingeniería, destacando su esfuerzo y representación institucional.',
    imgs: [
      '/assets/actividades/congreso-reconocimientos-1.jpg',
      '/assets/actividades/congreso-reconocimientos-2.jpg',
      '/assets/actividades/congreso-reconocimientos-3.jpg',
      '/assets/actividades/congreso-reconocimientos-4.jpg',
    ],
    año: '2025',
    participantes: 'Estudiantes participantes en el Congreso',
  },
  {
    id: 12,
    titulo: 'Atención Oportuna y Seguridad Escolar — Fumigación',
    categoria: 'Institucional',
    estatus: 'Concluido',
    desc: 'El CBTis 88 llevó a cabo una jornada de fumigación en todas las instalaciones del plantel para garantizar la seguridad y salud de toda la comunidad estudiantil y docente.',
    imgs: [
      '/assets/actividades/seguridad-fumigacion-1.jpg',
      '/assets/actividades/seguridad-fumigacion-2.jpg',
      '/assets/actividades/seguridad-fumigacion-3.jpg',
      '/assets/actividades/seguridad-fumigacion-4.jpg',
    ],
    año: '2025',
    participantes: 'Comunidad escolar',
  },
  {
    id: 13,
    titulo: 'Jornada de Limpieza y Concientización Ambiental',
    categoria: 'Cultural',
    estatus: 'Concluido',
    desc: 'Estudiantes y personal del CBTis 88 participaron en una jornada de limpieza dentro y fuera del plantel, promoviendo la cultura ambiental y el sentido de pertenencia hacia la institución.',
    imgs: [
      '/assets/actividades/limpieza-ambiental-1.jpg',
      '/assets/actividades/limpieza-ambiental-2.jpg',
      '/assets/actividades/limpieza-ambiental-3.jpg',
      '/assets/actividades/limpieza-ambiental-4.jpg',
    ],
    año: '2025',
    participantes: 'Toda la comunidad escolar',
  },
  {
    id: 14,
    titulo: 'Charlas de Concientización sobre el Uso de Drogas',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'Charlas informativas sobre los riesgos del uso de drogas, incluyendo información sobre sustancias como el fentanilo, con el objetivo de prevenir adicciones en la comunidad estudiantil.',
    imgs: [
      '/assets/actividades/prevencion-drogas-1.jpg',
      '/assets/actividades/prevencion-drogas-2.jpg',
      '/assets/actividades/prevencion-drogas-3.jpg',
      '/assets/actividades/prevencion-drogas-4.jpg',
    ],
    año: '2025',
    participantes: 'Comunidad estudiantil',
  },
  {
    id: 15,
    titulo: 'Inauguración del Consultorio Médico Escolar',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'Inauguración del Consultorio Médico Escolar enmarcado en la Estrategia Nacional por una Menstruación Digna en México, reforzando el compromiso del plantel con la salud integral.',
    imgs: [
      '/assets/actividades/consultorio-medico-1.jpg',
      '/assets/actividades/consultorio-medico-2.jpg',
      '/assets/actividades/consultorio-medico-3.jpg',
      '/assets/actividades/consultorio-medico-4.jpg',
    ],
    año: '2025',
    participantes: 'Directivos, personal médico y estudiantes',
  },
  {
    id: 16,
    titulo: 'Jornada de Salud — Brigada de Vacunación',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'El CBTis No. 88 llevó a cabo con gran éxito una Jornada de la Salud con brigada de vacunación, reafirmando su compromiso con el bienestar integral de toda su comunidad educativa.',
    imgs: [
      '/assets/actividades/jornada-vacunacion-1.jpg',
      '/assets/actividades/jornada-vacunacion-2.jpg',
      '/assets/actividades/jornada-vacunacion-3.jpg',
      '/assets/actividades/jornada-vacunacion-4.jpg',
    ],
    año: '2025',
    participantes: 'Toda la comunidad escolar',
  },
  {
    id: 17,
    titulo: 'Feria Professiográfica 2026',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Feria Professiográfica 2026 donde universidades e instituciones de educación superior presentaron su oferta educativa a los egresados del CBTis 88, impulsando su futuro profesional.',
    imgs: [
      '/assets/actividades/feria-profesiografica-1.jpg',
      '/assets/actividades/feria-profesiografica-2.jpg',
      '/assets/actividades/feria-profesiografica-3.jpg',
      '/assets/actividades/feria-profesiografica-4.jpg',
    ],
    año: '2026',
    participantes: 'Egresados y alumnos de últimos semestres',
  },
  {
    id: 18,
    titulo: '3er Congreso Internacional de Ingeniería — CONDUMEX',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Participación del CBTis 88 en el 3er Congreso Internacional de Ingeniería con CONDUMEX, acercando a los estudiantes al entorno tecnológico y productivo de la región.',
    imgs: [
      '/assets/actividades/congreso-condumex-1.jpg',
      '/assets/actividades/congreso-condumex-2.jpg',
      '/assets/actividades/congreso-condumex-3.jpg',
      '/assets/actividades/congreso-condumex-4.jpg',
    ],
    año: '2025',
    participantes: 'Estudiantes de especialidades técnicas',
  },
  {
    id: 19,
    titulo: 'Jornada de Salud Mental — Programa FOMALASA',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'Nuestras instalaciones fueron sede de la Jornada de Salud Mental del programa FOMALASA, un espacio de reflexión y apoyo emocional para los estudiantes del plantel.',
    imgs: [
      '/assets/actividades/fomalasa-1.jpg',
      '/assets/actividades/fomalasa-2.jpg',
      '/assets/actividades/fomalasa-3.jpg',
      '/assets/actividades/fomalasa-4.jpg',
    ],
    año: '2025',
    participantes: 'Comunidad estudiantil — Programa FOMALASA',
  },
  {
    id: 20,
    titulo: 'Jornada de Salud Mental — Programa FOMALASA (2ª sesión)',
    categoria: 'Salud',
    estatus: 'Concluido',
    desc: 'Segunda sesión de la Jornada de Salud Mental del programa FOMALASA, continuando con el espacio de reflexión y apoyo emocional para los estudiantes del CBTis 88.',
    imgs: [
      '/assets/actividades/fomalasa-2a-1.jpg',
      '/assets/actividades/fomalasa-2a-2.jpg',
      '/assets/actividades/fomalasa-2a-3.jpg',
      '/assets/actividades/fomalasa-2a-4.jpg',
    ],
    año: '2025',
    participantes: 'Comunidad estudiantil — Programa FOMALASA',
  },
  {
    id: 21,
    titulo: 'Último Pase de Lista — Generación 2023-2026',
    categoria: 'Institucional',
    estatus: 'Concluido',
    desc: 'Ceremonia del último pase de lista para la Generación 2023-2026, con entrega de reconocimientos y detalles conmemorativos para los alumnos próximos a egresar.',
    imgs: [
      '/assets/actividades/pase-lista-2023-2026-1.jpg',
      '/assets/actividades/pase-lista-2023-2026-2.jpg',
      '/assets/actividades/pase-lista-2023-2026-3.jpg',
      '/assets/actividades/pase-lista-2023-2026-4.jpg',
    ],
    año: '2026',
    participantes: 'Generación 2023-2026',
  },
  {
    id: 22,
    titulo: 'Innovación y Aprendizaje en Acción — Torre Hidropónica',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Alumnos construyeron una torre hidropónica y trabajaron piezas metálicas en el taller de soldadura, aplicando conocimientos técnicos en un proyecto práctico de innovación.',
    imgs: [
      '/assets/actividades/torre-hidroponica-1.jpg',
      '/assets/actividades/torre-hidroponica-2.jpg',
      '/assets/actividades/torre-hidroponica-3.jpg',
      '/assets/actividades/torre-hidroponica-4.jpg',
    ],
    año: '2026',
    participantes: 'Alumnos de especialidades técnicas',
  },
  {
    id: 23,
    titulo: 'Exposición de Proyectos de Robótica',
    categoria: 'Académico',
    estatus: 'Concluido',
    desc: 'Exposición de proyectos tecnológicos y de robótica desarrollados por los alumnos, mostrando talento, innovación y creatividad ante autoridades escolares e invitados.',
    imgs: [
      '/assets/actividades/expo-robotica-1.jpg',
      '/assets/actividades/expo-robotica-2.jpg',
      '/assets/actividades/expo-robotica-3.jpg',
      '/assets/actividades/expo-robotica-4.jpg',
    ],
    año: '2026',
    participantes: 'Alumnos participantes en la exposición',
  },
]

const ESTATUS_COLOR = {
  'Concluido': { bg: '#C6EFCE', text: '#006100' },
  'Próximo':   { bg: '#FFF3CD', text: '#856404' },
  'En curso':  { bg: '#fde8ef', text: '#6b0020' },
}

const CATEGORIA_ICONO = {
  'Cívico':        '🇲🇽',
  'Institucional': '🏫',
  'Académico':     '🔬',
  'Deportivo':     '⚽',
  'Cultural':      '🎭',
  'Salud':         '🩺',
  'Vinculación':   '🤝',
}

// ── Componente slider del modal ────────────────────────────────
function ModalSlider({ imgs, onError }) {
  const [idx, setIdx]         = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef              = useRef(null)

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setIdx(i => (i + 1) % imgs.length)
      }, 3000)
    }
    return () => clearInterval(timerRef.current)
  }, [playing, imgs.length])

  const ir = (i) => {
    setIdx(i)
    setPlaying(false)
    clearInterval(timerRef.current)
  }

  return (
    <div style={{ position: 'relative' }}>

      {/* Imagen principal */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        {imgs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`foto-${i + 1}`}
            onError={onError}
            style={{
              position:   'absolute',
              inset:      0,
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              opacity:    i === idx ? 1 : 0,
              transition: 'opacity .5s ease',
              backgroundColor: '#6b0020',
            }}
          />
        ))}

        {/* Flechas */}
        <button
          onClick={() => ir((idx - 1 + imgs.length) % imgs.length)}
          style={sliderBtn('left')}
        >‹</button>
        <button
          onClick={() => ir((idx + 1) % imgs.length)}
          style={sliderBtn('right')}
        >›</button>

        {/* Contador */}
        <div style={counterStyle}>
          {idx + 1} / {imgs.length}
        </div>
      </div>

      {/* Miniaturas */}
      <div style={thumbsRow}>
        {imgs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`mini-${i + 1}`}
            onError={onError}
            onClick={() => ir(i)}
            style={{
              ...thumbStyle,
              border: i === idx
                ? '2px solid #FFD700'
                : '2px solid transparent',
              opacity: i === idx ? 1 : 0.55,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const sliderBtn = (side) => ({
  position:        'absolute',
  top:             '50%',
  transform:       'translateY(-50%)',
  [side]:          10,
  zIndex:          5,
  background:      'rgba(0,0,0,.45)',
  border:          '1px solid rgba(255,215,0,.4)',
  color:           '#FFD700',
  width:           36,
  height:          36,
  borderRadius:    '50%',
  cursor:          'pointer',
  fontSize:        '1.1rem',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
})

const counterStyle = {
  position:   'absolute',
  bottom:     8,
  right:      12,
  fontSize:   11,
  color:      '#fff',
  background: 'rgba(0,0,0,.5)',
  padding:    '2px 8px',
  borderRadius: 20,
}

const thumbsRow = {
  display:        'flex',
  gap:            6,
  justifyContent: 'center',
  padding:        '10px 16px 0',
  background:     '#2a0010',
}

const thumbStyle = {
  width:        70,
  height:       50,
  objectFit:    'cover',
  borderRadius: 6,
  cursor:       'pointer',
  transition:   'all .2s',
  backgroundColor: '#6b0020',
}

// ── Componente principal ───────────────────────────────────────
export default function ActivitiesGallery() {
  const [actividades, setActividades] = useState(ACTIVIDADES_DEMO)
  const [activo,      setActivo]      = useState(0)
  const [filtro,      setFiltro]      = useState('Todos')
  const [modal,       setModal]       = useState(null)
  const [autoplay,    setAutoplay]    = useState(true)
  const timerRef                      = useRef(null)

  const categorias = ['Todos', ...new Set(ACTIVIDADES_DEMO.map(a => a.categoria))]

  const actFiltradas = filtro === 'Todos'
    ? actividades
    : actividades.filter(a => a.categoria === filtro)

  const irSiguiente = useCallback(() => {
    setActivo(a => (a + 1) % actividades.length)
  }, [actividades.length])

  const irAnterior = () =>
    setActivo(a => (a - 1 + actividades.length) % actividades.length)

  useEffect(() => {
    if (autoplay && actividades.length > 0) {
      timerRef.current = setInterval(irSiguiente, 4500)
    }
    return () => clearInterval(timerRef.current)
  }, [autoplay, irSiguiente, actividades.length])

  const pausar   = () => { setAutoplay(false); clearInterval(timerRef.current) }
  const reanudar = () => setAutoplay(true)

  const act       = actividades[activo] || {}
  const miniSlides = [...actividades.slice(activo + 1),
                      ...actividades.slice(0, activo)].slice(0, 3)

  const handleImgError = (e) => {
    e.target.onerror = null
    e.target.src = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#6b0020"/>
        <text x="400" y="220" font-size="70" text-anchor="middle" fill="#FFD700">📷</text>
        <text x="400" y="300" font-size="20" font-family="sans-serif"
              text-anchor="middle" fill="#ffffff">Imagen pendiente de subir</text>
      </svg>`
    )}`
  }

  if (!actividades.length) return (
    <div style={s.root}>
      <p style={{ padding:'4rem', textAlign:'center', color:'rgba(255,255,255,.4)' }}>
        Cargando actividades...
      </p>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');
        @keyframes zoomBg { from{transform:scale(1.07)} to{transform:scale(1)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .ag-navbtn:hover{background:#FFD700!important;color:#6b0020!important;border-color:#FFD700!important}
        .ag-filbtn:hover{background:#FFD700!important;color:#6b0020!important;border-color:#FFD700!important;font-weight:700!important}
        .ag-btnver:hover{background:#fff!important;color:#6b0020!important}
        .ag-mini:hover{border-color:#FFD700!important}
        .ag-mini:hover img{filter:brightness(.88)!important}
        .ag-card:hover{transform:translateY(-6px)!important;border-color:rgba(255,215,0,.4)!important;box-shadow:0 16px 40px rgba(107,0,32,.4)!important}
        .ag-modalclose:hover{background:#FFD700!important;color:#6b0020!important}
        .ag-slbtn:hover{background:#FFD700!important;color:#6b0020!important}
      `}</style>

      <div style={s.root}>

        {/* ── HERO SLIDER ── */}
        <div style={s.hero} onMouseEnter={pausar} onMouseLeave={reanudar}>
          <div
            key={activo}
            style={{
              ...s.heroBg,
              backgroundImage: `url(${act.imgs?.[0]})`,
              animation: 'zoomBg 5s ease forwards'
            }}
          />
          <div style={s.overlay} />

          <div style={s.info} key={`info-${activo}`}>
            <span style={s.areaBadge}>
              {CATEGORIA_ICONO[act.categoria] || '◆'} {act.categoria}
            </span>
            <h1 style={s.heroTit}>{act.titulo}</h1>
            <p style={s.heroDesc}>{act.desc}</p>
            <div style={s.metaRow}>
              <span style={{
                ...s.estatusBadge,
                background: ESTATUS_COLOR[act.estatus]?.bg,
                color:      ESTATUS_COLOR[act.estatus]?.text,
              }}>
                {act.estatus}
              </span>
              <span style={s.añoSpan}>Ciclo {act.año}</span>
              <span style={s.albumBadge}>📷 4 fotos</span>
            </div>
            <button
              className="ag-btnver"
              style={s.btnVer}
              onClick={() => { setModal(act); pausar() }}
            >
              Ver álbum →
            </button>
          </div>

          {/* Miniaturas hero */}
          <div style={s.minis}>
            {miniSlides.map(m => (
              <div
                key={m.id}
                className="ag-mini"
                style={s.mini}
                onClick={() => setActivo(actividades.indexOf(m))}
              >
                <img
                  src={m.imgs?.[0]}
                  alt={m.titulo}
                  style={s.miniImg}
                  onError={handleImgError}
                />
                <span style={s.miniLbl}>{m.titulo}</span>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={s.dotsRow}>
            {actividades.map((_, i) => (
              <div
                key={i}
                onClick={() => setActivo(i)}
                style={{ ...s.dot, ...(i === activo ? s.dotOn : {}) }}
              />
            ))}
          </div>

          {/* Flechas hero */}
          <div style={s.navRow}>
            <button className="ag-navbtn" style={s.navBtn}
              onClick={() => { pausar(); irAnterior(); reanudar() }}>‹</button>
            <button className="ag-navbtn" style={s.navBtn}
              onClick={() => { pausar(); irSiguiente(); reanudar() }}>›</button>
          </div>
        </div>

        <div style={s.divider} />

        {/* ── GRID ── */}
        <div style={s.gridSec}>
          <div style={s.gridHd}>
            <h2 style={s.gridTit}>
              Todas las <span style={{ color:'#FFD700' }}>Actividades</span>
            </h2>
            <div style={s.filRow}>
              {categorias.map(f => (
                <button
                  key={f}
                  className="ag-filbtn"
                  style={{ ...s.filBtn, ...(filtro === f ? s.filBtnOn : {}) }}
                  onClick={() => setFiltro(f)}
                >
                  {f !== 'Todos' && (CATEGORIA_ICONO[f] + ' ')}{f}
                </button>
              ))}
            </div>
          </div>

          <div style={s.grid}>
            {actFiltradas.map(a => (
              <div
                key={a.id}
                className="ag-card"
                style={s.card}
                onClick={() => { setModal(a); pausar() }}
              >
                <div style={s.cardIW}>
                  {/* Solo muestra la primera imagen en la tarjeta */}
                  <img
                    src={a.imgs?.[0]}
                    alt={a.titulo}
                    style={s.cardImg}
                    onError={handleImgError}
                  />
                  <div style={s.cardGrad} />
                  {/* Badge álbum */}
                  <div style={s.albumTag}>📷 4 fotos</div>
                </div>
                <div style={s.cardBody}>
                  <div style={s.cardArea}>
                    {CATEGORIA_ICONO[a.categoria]} {a.categoria}
                  </div>
                  <h3 style={s.cardTit}>{a.titulo}</h3>
                  <p style={s.cardDesc}>{a.desc}</p>
                  <div style={s.cardFt}>
                    <span style={{
                      ...s.cardEst,
                      background: ESTATUS_COLOR[a.estatus]?.bg,
                      color:      ESTATUS_COLOR[a.estatus]?.text,
                    }}>
                      {a.estatus}
                    </span>
                    <span style={s.cardYr}>{a.año}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {actFiltradas.length === 0 && (
            <p style={{ textAlign:'center', color:'rgba(255,255,255,.3)', padding:'3rem' }}>
              No hay actividades en esta categoría.
            </p>
          )}
        </div>

        {/* ── MODAL CON SLIDER DE 4 FOTOS ── */}
        {modal && (
          <div
            style={s.modalBg}
            onClick={() => { setModal(null); reanudar() }}
          >
            <div style={s.modalBox} onClick={e => e.stopPropagation()}>

              {/* Slider de 4 fotos */}
              <ModalSlider imgs={modal.imgs} onError={handleImgError} />

              {/* Info */}
              <div style={s.modalBody}>
                <div style={s.modalArea}>
                  {CATEGORIA_ICONO[modal.categoria]} {modal.categoria}
                </div>
                <h2 style={s.modalTit}>{modal.titulo}</h2>
                <p style={s.modalDesc}>{modal.desc}</p>
                <div style={s.modalMetas}>
                  {[
                    { label: 'Estatus',       valor: modal.estatus },
                    { label: 'Ciclo escolar', valor: modal.año },
                    { label: 'Participantes', valor: modal.participantes || '—' },
                  ].map(m => (
                    <div key={m.label} style={s.mmi}>
                      <div style={s.mmiL}>{m.label}</div>
                      <div style={s.mmiV}>{m.valor}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="ag-modalclose"
                  style={s.modalClose}
                  onClick={() => { setModal(null); reanudar() }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

// ── ESTILOS ───────────────────────────────────────────────────
const s = {
  root:        { fontFamily:"'DM Sans',sans-serif", background:'#1a0008', minHeight:'100vh', color:'#fff', overflowX:'hidden' },
  hero:        { position:'relative', height:'88vh', minHeight:520, overflow:'hidden', display:'flex', alignItems:'flex-end' },
  heroBg:      { position:'absolute', inset:0, backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#6b0020' },
  overlay:     { position:'absolute', inset:0, background:'linear-gradient(to right,rgba(80,0,20,.95) 0%,rgba(80,0,20,.55) 50%,rgba(80,0,20,.1) 100%),linear-gradient(to top,rgba(107,0,32,.5) 0%,transparent 60%)' },
  info:        { position:'relative', zIndex:10, padding:'2.5rem 3.5rem', maxWidth:580, animation:'fadeUp .5s ease' },
  areaBadge:   { display:'inline-block', fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#FFD700', border:'1px solid rgba(255,215,0,.4)', borderRadius:20, padding:'4px 12px', marginBottom:'.8rem', background:'rgba(255,215,0,.08)' },
  heroTit:     { fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2.4rem,5vw,4.5rem)', lineHeight:1, margin:'0 0 .8rem', textShadow:'0 4px 20px rgba(0,0,0,.5)' },
  heroDesc:    { fontSize:'.9rem', color:'rgba(255,255,255,.7)', lineHeight:1.6, marginBottom:'1rem', maxWidth:420 },
  metaRow:     { display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'1.2rem', flexWrap:'wrap' },
  estatusBadge:{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 },
  añoSpan:     { fontSize:12, color:'rgba(255,255,255,.5)' },
  albumBadge:  { fontSize:11, color:'#FFD700', opacity:.8 },
  btnVer:      { display:'inline-flex', alignItems:'center', gap:8, padding:'.65rem 1.5rem', background:'#FFD700', color:'#6b0020', border:'none', borderRadius:10, fontWeight:700, fontSize:'.9rem', cursor:'pointer', fontFamily:'inherit', transition:'all .2s' },
  minis:       { position:'absolute', right:'2.5rem', top:'50%', transform:'translateY(-50%)', zIndex:10, display:'flex', flexDirection:'column', gap:10 },
  mini:        { width:130, height:85, borderRadius:10, overflow:'hidden', cursor:'pointer', border:'2px solid rgba(255,215,0,.25)', position:'relative', transition:'border-color .25s' },
  miniImg:     { width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55)', display:'block', transition:'filter .25s', backgroundColor:'#6b0020' },
  miniLbl:     { position:'absolute', bottom:5, left:7, fontSize:9, fontWeight:600, color:'#fff', textShadow:'0 1px 3px rgba(0,0,0,.9)', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', maxWidth:112 },
  dotsRow:     { position:'absolute', bottom:'1.5rem', left:'3.5rem', display:'flex', gap:7, zIndex:10 },
  dot:         { width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.25)', cursor:'pointer', transition:'all .3s' },
  dotOn:       { width:26, borderRadius:3, background:'#FFD700' },
  navRow:      { position:'absolute', bottom:'1.5rem', right:'2.5rem', display:'flex', gap:10, zIndex:10 },
  navBtn:      { width:42, height:42, borderRadius:'50%', border:'1.5px solid rgba(255,215,0,.4)', background:'rgba(255,215,0,.08)', color:'#FFD700', fontSize:'1.1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', fontFamily:'inherit' },
  divider:     { height:2, background:'linear-gradient(to right,#6b0020,#FFD700,#6b0020)' },
  gridSec:     { background:'#120005', padding:'3rem 3.5rem' },
  gridHd:      { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' },
  gridTit:     { fontFamily:"'Bebas Neue',sans-serif", fontSize:'2rem', letterSpacing:'.05em', fontWeight:400 },
  filRow:      { display:'flex', gap:8, flexWrap:'wrap' },
  filBtn:      { fontSize:12, fontWeight:500, padding:'5px 14px', borderRadius:20, border:'1px solid rgba(255,215,0,.2)', background:'transparent', color:'rgba(255,255,255,.55)', cursor:'pointer', fontFamily:'inherit', transition:'all .2s' },
  filBtnOn:    { background:'#FFD700', color:'#6b0020', borderColor:'#FFD700', fontWeight:700 },
  grid:        { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' },
  card:        { background:'#2a0010', borderRadius:12, overflow:'hidden', cursor:'pointer', border:'1px solid rgba(255,215,0,.08)', transition:'all .3s', display:'flex', flexDirection:'column' },
  cardIW:      { overflow:'hidden', position:'relative', height:175, flexShrink:0 },
  cardImg:     { width:'100%', height:'100%', objectFit:'cover', display:'block', backgroundColor:'#6b0020' },
  cardGrad:    { position:'absolute', inset:0, background:'linear-gradient(to top,rgba(42,0,16,.75) 0%,transparent 55%)' },
  albumTag:    { position:'absolute', top:8, right:8, fontSize:10, fontWeight:700, background:'rgba(0,0,0,.55)', border:'1px solid rgba(255,215,0,.4)', color:'#FFD700', borderRadius:20, padding:'3px 8px' },
  cardBody:    { padding:'1rem', flex:1, display:'flex', flexDirection:'column' },
  cardArea:    { fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#FFD700', marginBottom:5 },
  cardTit:     { fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', color:'#fff', marginBottom:6, lineHeight:1.2, fontWeight:400 },
  cardDesc:    { fontSize:12, color:'rgba(255,255,255,.45)', lineHeight:1.5, marginBottom:10, flex:1, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' },
  cardFt:      { display:'flex', alignItems:'center', justifyContent:'space-between' },
  cardEst:     { fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 },
  cardYr:      { fontSize:11, color:'rgba(255,255,255,.3)' },
  modalBg:     { position:'fixed', inset:0, background:'rgba(26,0,8,.88)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', backdropFilter:'blur(6px)' },
  modalBox:    { background:'#2a0010', borderRadius:18, overflow:'hidden', maxWidth:680, width:'100%', border:'1px solid rgba(255,215,0,.25)', maxHeight:'90vh', overflowY:'auto' },
  modalBody:   { padding:'1.5rem' },
  modalArea:   { fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#FFD700', marginBottom:8 },
  modalTit:    { fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.9rem', color:'#fff', marginBottom:'.8rem', fontWeight:400 },
  modalDesc:   { fontSize:'.92rem', color:'rgba(255,255,255,.65)', lineHeight:1.7, marginBottom:'1.2rem' },
  modalMetas:  { display:'flex', gap:'.8rem', flexWrap:'wrap', marginBottom:'1.2rem' },
  mmi:         { background:'rgba(255,215,0,.06)', border:'1px solid rgba(255,215,0,.12)', borderRadius:8, padding:'.6rem .9rem' },
  mmiL:        { fontSize:9, textTransform:'uppercase', letterSpacing:'.1em', color:'rgba(255,255,255,.35)', marginBottom:2 },
  mmiV:        { fontSize:13, fontWeight:600, color:'#fff' },
  modalClose:  { background:'rgba(255,215,0,.1)', border:'1px solid rgba(255,215,0,.3)', color:'#FFD700', borderRadius:8, padding:'.6rem 1.4rem', cursor:'pointer', fontFamily:'inherit', fontSize:'.9rem', fontWeight:600, transition:'all .2s' },
}
