// ================================================================
//  ARCHIVO: frontend/src/components/Projects/ProjectsGallery.jsx
// ================================================================

import { useState, useEffect, useRef, useCallback } from 'react'

// ── PROYECTOS REALES CBTIS 88 ─────────────────────────────────
const PROYECTOS_DEMO = [
  // ── PROYECTOS REALES ──────────────────────────────────────
  {
    id: 1,
    titulo: 'Carro Aspiradora Inteligente',
    area: 'Mecatrónica',
    estatus: 'Concluido',
    desc: 'Tres estudiantes del 6° semestre desarrollaron un carro aspiradora automático e inteligente utilizando material reciclado y de muy bajo costo, logrando un resultado funcional y eficiente.',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    año: '2024',
    equipo: '3 alumnos — 6° Semestre Mecatrónica',
    award: 'Proyecto Destacado 2024',
  },
  {
    id: 2,
    titulo: 'Carro Tipo Gallo',
    area: 'Mecatrónica',
    estatus: 'Concluido',
    desc: 'Proyecto complementario desarrollado por el mismo equipo de 6° semestre. Construido con material reciclado, demuestra creatividad e ingenio técnico aplicado con resultados sobresalientes.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    año: '2024',
    equipo: '3 alumnos — 6° Semestre Mecatrónica',
    award: 'Proyecto Destacado 2024',
  },

  // ── PROGRAMACIÓN ──────────────────────────────────────────
  {
    id: 3,
    titulo: 'Sistema de Control de Asistencia Escolar',
    area: 'Programación',
    estatus: 'Concluido',
    desc: 'Aplicación web desarrollada en Python y JavaScript para el registro y control de asistencia de alumnos, con generación de reportes automáticos para docentes y administrativos.',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    año: '2025',
    equipo: 'Equipo Dev — 6° Semestre Programación',
  },
  {
    id: 4,
    titulo: 'App Móvil de Orientación Vocacional',
    area: 'Programación',
    estatus: 'En progreso',
    desc: 'Aplicación móvil que guía a los aspirantes de nuevo ingreso para elegir su especialidad técnica mediante cuestionarios interactivos y perfiles profesionales personalizados.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    año: '2025',
    equipo: 'Equipo App — 5° Semestre Programación',
  },

  // ── ELECTRICIDAD ──────────────────────────────────────────
  {
    id: 5,
    titulo: 'Panel Solar para Áreas Comunes',
    area: 'Electricidad',
    estatus: 'Concluido',
    desc: 'Instalación de un sistema de energía solar fotovoltaica para el suministro de iluminación en las áreas comunes del plantel, reduciendo el consumo eléctrico y promoviendo energías renovables.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
    año: '2024',
    equipo: 'Equipo Solar — 6° Semestre Electricidad',
    award: 'Mejor Proyecto Ambiental',
  },
  {
    id: 6,
    titulo: 'Tablero de Control Industrial Didáctico',
    area: 'Electricidad',
    estatus: 'Concluido',
    desc: 'Diseño y construcción de un tablero de control eléctrico didáctico para la práctica de instalaciones industriales, utilizado actualmente como material de apoyo en el taller.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    año: '2024',
    equipo: 'Equipo Control — 5° Semestre Electricidad',
  },

  // ── MECATRÓNICA ───────────────────────────────────────────
  {
    id: 7,
    titulo: 'Brazo Robótico con Arduino',
    area: 'Mecatrónica',
    estatus: 'Concluido',
    desc: 'Brazo robótico de 4 grados de libertad controlado por Arduino, programado para realizar movimientos de ensamblaje básico. Proyecto de automatización industrial para nivel medio superior.',
    img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&q=80',
    año: '2025',
    equipo: 'Robotics 88 — 6° Semestre Mecatrónica',
  },
  {
    id: 8,
    titulo: 'Invernadero Automatizado con Sensores',
    area: 'Mecatrónica',
    estatus: 'Concluido',
    desc: 'Sistema de control automático para un invernadero escolar que regula temperatura, humedad y riego mediante sensores IoT y microcontrolador, favoreciendo la producción agrícola sostenible.',
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80',
    año: '2024',
    equipo: 'Equipo IoT — 5° Semestre Mecatrónica',
    award: 'Mención Honorífica Regional',
  },

  // ── MECÁNICA INDUSTRIAL ───────────────────────────────────
  {
    id: 9,
    titulo: 'Prensa Hidráulica Manual de Bajo Costo',
    area: 'Mecánica Industrial',
    estatus: 'Concluido',
    desc: 'Diseño y fabricación de una prensa hidráulica manual construida con material reciclado, utilizada para prácticas de mantenimiento y manufactura en el taller de mecánica.',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80',
    año: '2024',
    equipo: 'Taller Mecánica — 6° Semestre',
  },
  {
    id: 10,
    titulo: 'Banco de Pruebas para Motores Eléctricos',
    area: 'Mecánica Industrial',
    estatus: 'En progreso',
    desc: 'Construcción de un banco de pruebas para el diagnóstico y mantenimiento preventivo de motores eléctricos de pequeña potencia, apoyando la formación práctica del área.',
    img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=1200&q=80',
    año: '2025',
    equipo: 'Equipo Mantenimiento — 5° Semestre',
  },

  // ── ADMINISTRACIÓN ────────────────────────────────────────
  {
    id: 11,
    titulo: 'Plan de Negocio: Tortillería Sustentable',
    area: 'Administración',
    estatus: 'Concluido',
    desc: 'Proyecto de emprendimiento con plan de negocio completo para una tortillería con enfoque sustentable en Tapachula, incluyendo análisis financiero, estudio de mercado y estrategia de ventas.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    año: '2025',
    equipo: 'Equipo Emprende — 6° Semestre Administración',
  },
  {
    id: 12,
    titulo: 'Sistema de Gestión de Inventarios para PyMEs',
    area: 'Administración',
    estatus: 'En progreso',
    desc: 'Propuesta de sistema de control de inventarios adaptado a pequeñas y medianas empresas de Tapachula, con manual de procedimientos y formatos administrativos estandarizados.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    año: '2024',
    equipo: 'Equipo Admin — 5° Semestre Administración',
  },
]

const ESTATUS_COLOR = {
  'Concluido':   { bg: '#C6EFCE', text: '#006100' },
  'En progreso': { bg: '#FFF3CD', text: '#856404' },
  'Propuesta':   { bg: '#fde8ef', text: '#6b0020' },
  'Cancelado':   { bg: '#FFC7CE', text: '#9C0006' },
}

export default function ProjectsGallery() {

  const [proyectos, setProyectos] = useState(PROYECTOS_DEMO)
  const [activo,    setActivo]    = useState(0)
  const [filtro,    setFiltro]    = useState('Todos')
  const [modal,     setModal]     = useState(null)
  const [autoplay,  setAutoplay]  = useState(true)
  const timerRef                  = useRef(null)

  const proyFiltrados = filtro === 'Todos'
    ? proyectos
    : proyectos.filter(p => p.estatus === filtro)

  const irSiguiente = useCallback(() => {
    setActivo(a => (a + 1) % proyectos.length)
  }, [proyectos.length])

  const irAnterior = () =>
    setActivo(a => (a - 1 + proyectos.length) % proyectos.length)

  useEffect(() => {
    if (autoplay && proyectos.length > 0) {
      timerRef.current = setInterval(irSiguiente, 4500)
    }
    return () => clearInterval(timerRef.current)
  }, [autoplay, irSiguiente, proyectos.length])

  const pausar   = () => { setAutoplay(false); clearInterval(timerRef.current) }
  const reanudar = () => setAutoplay(true)

  const proy      = proyectos[activo] || {}
  const miniSlides = [...proyectos.slice(activo + 1), ...proyectos.slice(0, activo)].slice(0, 3)

  if (!proyectos.length) return (
    <div style={s.root}>
      <p style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,.4)' }}>
        Cargando proyectos...
      </p>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');
        @keyframes zoomBg { from { transform:scale(1.07) } to { transform:scale(1) } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        .pg-navbtn:hover { background:#FFD700 !important; color:#6b0020 !important; border-color:#FFD700 !important; }
        .pg-filbtn:hover { background:#FFD700 !important; color:#6b0020 !important; border-color:#FFD700 !important; font-weight:700 !important; }
        .pg-btnver:hover { background:#fff !important; color:#6b0020 !important; }
        .pg-mini:hover   { border-color:#FFD700 !important; }
        .pg-mini:hover img { filter:brightness(.88) !important; }
        .pg-card:hover   { transform:translateY(-6px) !important; border-color:rgba(255,215,0,.4) !important; box-shadow:0 16px 40px rgba(107,0,32,.4) !important; }
        .pg-modalclose:hover { background:#FFD700 !important; color:#6b0020 !important; }
      `}</style>

      <div style={s.root}>

        {/* ── HERO SLIDER ── */}
        <div style={s.hero} onMouseEnter={pausar} onMouseLeave={reanudar}>
          <div
            key={activo}
            style={{ ...s.heroBg, backgroundImage: `url(${proy.img})`, animation: 'zoomBg 5s ease forwards' }}
          />
          <div style={s.overlay} />

          <div style={s.info} key={`info-${activo}`}>
            <span style={s.areaBadge}>◆ {proy.area}</span>
            {proy.award && (
              <span style={s.awardBadge}>🏆 {proy.award}</span>
            )}
            <h1 style={s.heroTit}>{proy.titulo}</h1>
            <p style={s.heroDesc}>{proy.desc}</p>
            <div style={s.metaRow}>
              <span style={{ ...s.estatusBadge, background: ESTATUS_COLOR[proy.estatus]?.bg, color: ESTATUS_COLOR[proy.estatus]?.text }}>
                {proy.estatus}
              </span>
              <span style={s.añoSpan}>Generación {proy.año}</span>
              {proy.equipo && (
                <span style={s.equipoSpan}>👥 {proy.equipo}</span>
              )}
            </div>
            <button className="pg-btnver" style={s.btnVer}
              onClick={() => { setModal(proy); pausar() }}>
              Ver detalles →
            </button>
          </div>

          <div style={s.minis}>
            {miniSlides.map(m => (
              <div key={m.id} className="pg-mini" style={s.mini}
                onClick={() => setActivo(proyectos.indexOf(m))}>
                <img src={m.img} alt={m.titulo} style={s.miniImg} />
                <span style={s.miniLbl}>{m.titulo}</span>
              </div>
            ))}
          </div>

          <div style={s.dotsRow}>
            {proyectos.map((_, i) => (
              <div key={i} onClick={() => setActivo(i)}
                style={{ ...s.dot, ...(i === activo ? s.dotOn : {}) }} />
            ))}
          </div>

          <div style={s.navRow}>
            <button className="pg-navbtn" style={s.navBtn}
              onClick={() => { pausar(); irAnterior(); reanudar() }}>‹</button>
            <button className="pg-navbtn" style={s.navBtn}
              onClick={() => { pausar(); irSiguiente(); reanudar() }}>›</button>
          </div>
        </div>

        {/* Línea divisoria */}
        <div style={s.divider} />

        {/* ── GRID DE PROYECTOS ── */}
        <div style={s.gridSec}>
          <div style={s.gridHd}>
            <h2 style={s.gridTit}>
              Todos los <span style={{ color: '#FFD700' }}>Proyectos</span>
            </h2>
            <div style={s.filRow}>
              {['Todos', 'Concluido', 'En progreso', 'Propuesta'].map(f => (
                <button key={f} className="pg-filbtn"
                  style={{ ...s.filBtn, ...(filtro === f ? s.filBtnOn : {}) }}
                  onClick={() => setFiltro(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={s.grid}>
            {proyFiltrados.map(p => (
              <div key={p.id} className="pg-card" style={s.card}
                onClick={() => { setModal(p); pausar() }}>
                <div style={s.cardIW}>
                  <img src={p.img} alt={p.titulo} style={s.cardImg} />
                  <div style={s.cardGrad} />
                  {p.award && (
                    <div style={s.cardAward}>🏆 {p.award}</div>
                  )}
                </div>
                <div style={s.cardBody}>
                  <div style={s.cardArea}>{p.area}</div>
                  <h3 style={s.cardTit}>{p.titulo}</h3>
                  <p style={s.cardDesc}>{p.desc}</p>
                  <div style={s.cardFt}>
                    <span style={{ ...s.cardEst, background: ESTATUS_COLOR[p.estatus]?.bg, color: ESTATUS_COLOR[p.estatus]?.text }}>
                      {p.estatus}
                    </span>
                    <span style={s.cardYr}>{p.año}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MODAL ── */}
        {modal && (
          <div style={s.modalBg} onClick={() => { setModal(null); reanudar() }}>
            <div style={s.modalBox} onClick={e => e.stopPropagation()}>
              <img src={modal.img} alt={modal.titulo} style={s.modalImg} />
              <div style={s.modalBody}>
                <div style={s.modalArea}>◆ {modal.area}</div>
                {modal.award && (
                  <div style={s.modalAward}>🏆 {modal.award}</div>
                )}
                <h2 style={s.modalTit}>{modal.titulo}</h2>
                <p style={s.modalDesc}>{modal.desc}</p>
                <div style={s.modalMetas}>
                  {[
                    { label: 'Estatus',    valor: modal.estatus },
                    { label: 'Generación', valor: modal.año },
                    { label: 'Equipo',     valor: modal.equipo || '—' },
                  ].map(m => (
                    <div key={m.label} style={s.mmi}>
                      <div style={s.mmiL}>{m.label}</div>
                      <div style={s.mmiV}>{m.valor}</div>
                    </div>
                  ))}
                </div>
                <button className="pg-modalclose" style={s.modalClose}
                  onClick={() => { setModal(null); reanudar() }}>
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
  root:       { fontFamily:"'DM Sans',sans-serif", background:'#1a0008', minHeight:'100vh', color:'#fff', overflowX:'hidden' },
  hero:       { position:'relative', height:'88vh', minHeight:520, overflow:'hidden', display:'flex', alignItems:'flex-end' },
  heroBg:     { position:'absolute', inset:0, backgroundSize:'cover', backgroundPosition:'center' },
  overlay:    { position:'absolute', inset:0, background:'linear-gradient(to right,rgba(80,0,20,.95) 0%,rgba(80,0,20,.55) 50%,rgba(80,0,20,.1) 100%),linear-gradient(to top,rgba(107,0,32,.5) 0%,transparent 60%)' },
  info:       { position:'relative', zIndex:10, padding:'2.5rem 3.5rem', maxWidth:580, animation:'fadeUp .5s ease' },
  areaBadge:  { display:'inline-block', fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#FFD700', border:'1px solid rgba(255,215,0,.4)', borderRadius:20, padding:'4px 12px', marginBottom:'.5rem', background:'rgba(255,215,0,.08)' },
  awardBadge: { display:'block', fontSize:11, fontWeight:700, color:'#FFD700', marginBottom:'.5rem', opacity:.85 },
  heroTit:    { fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2.8rem,5.5vw,4.8rem)', lineHeight:1, margin:'0 0 .8rem', textShadow:'0 4px 20px rgba(0,0,0,.5)' },
  heroDesc:   { fontSize:'.92rem', color:'rgba(255,255,255,.7)', lineHeight:1.6, marginBottom:'1rem', maxWidth:420 },
  metaRow:    { display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'1.2rem', flexWrap:'wrap' },
  estatusBadge:{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 },
  añoSpan:    { fontSize:12, color:'rgba(255,255,255,.5)' },
  equipoSpan: { fontSize:11, color:'rgba(255,215,0,.7)' },
  btnVer:     { display:'inline-flex', alignItems:'center', gap:8, padding:'.65rem 1.5rem', background:'#FFD700', color:'#6b0020', border:'none', borderRadius:10, fontWeight:700, fontSize:'.9rem', cursor:'pointer', fontFamily:'inherit', transition:'all .2s' },
  minis:      { position:'absolute', right:'2.5rem', top:'50%', transform:'translateY(-50%)', zIndex:10, display:'flex', flexDirection:'column', gap:10 },
  mini:       { width:130, height:85, borderRadius:10, overflow:'hidden', cursor:'pointer', border:'2px solid rgba(255,215,0,.25)', position:'relative', transition:'border-color .25s' },
  miniImg:    { width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55)', display:'block', transition:'filter .25s' },
  miniLbl:    { position:'absolute', bottom:5, left:7, fontSize:9, fontWeight:600, color:'#fff', textShadow:'0 1px 3px rgba(0,0,0,.9)', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', maxWidth:112 },
  dotsRow:    { position:'absolute', bottom:'1.5rem', left:'3.5rem', display:'flex', gap:7, zIndex:10 },
  dot:        { width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.25)', cursor:'pointer', transition:'all .3s' },
  dotOn:      { width:26, borderRadius:3, background:'#FFD700' },
  navRow:     { position:'absolute', bottom:'1.5rem', right:'2.5rem', display:'flex', gap:10, zIndex:10 },
  navBtn:     { width:42, height:42, borderRadius:'50%', border:'1.5px solid rgba(255,215,0,.4)', background:'rgba(255,215,0,.08)', color:'#FFD700', fontSize:'1.1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', fontFamily:'inherit' },
  divider:    { height:2, background:'linear-gradient(to right,#6b0020,#FFD700,#6b0020)' },
  gridSec:    { background:'#120005', padding:'3rem 3.5rem' },
  gridHd:     { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' },
  gridTit:    { fontFamily:"'Bebas Neue',sans-serif", fontSize:'2rem', letterSpacing:'.05em', fontWeight:400 },
  filRow:     { display:'flex', gap:8, flexWrap:'wrap' },
  filBtn:     { fontSize:12, fontWeight:500, padding:'5px 14px', borderRadius:20, border:'1px solid rgba(255,215,0,.2)', background:'transparent', color:'rgba(255,255,255,.55)', cursor:'pointer', fontFamily:'inherit', transition:'all .2s' },
  filBtnOn:   { background:'#FFD700', color:'#6b0020', borderColor:'#FFD700', fontWeight:700 },
  grid:       { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' },
  card:       { background:'#2a0010', borderRadius:12, overflow:'hidden', cursor:'pointer', border:'1px solid rgba(255,215,0,.08)', transition:'all .3s', display:'flex', flexDirection:'column' },
  cardIW:     { overflow:'hidden', position:'relative', height:175, flexShrink:0 },
  cardImg:    { width:'100%', height:'100%', objectFit:'cover', display:'block' },
  cardGrad:   { position:'absolute', inset:0, background:'linear-gradient(to top,rgba(42,0,16,.75) 0%,transparent 55%)' },
  cardAward:  { position:'absolute', top:8, right:8, fontSize:10, fontWeight:700, background:'rgba(255,215,0,.15)', border:'1px solid rgba(255,215,0,.4)', color:'#FFD700', borderRadius:20, padding:'3px 8px' },
  cardBody:   { padding:'1rem', flex:1, display:'flex', flexDirection:'column' },
  cardArea:   { fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#FFD700', marginBottom:5 },
  cardTit:    { fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', color:'#fff', marginBottom:6, lineHeight:1.2, fontWeight:400 },
  cardDesc:   { fontSize:12, color:'rgba(255,255,255,.45)', lineHeight:1.5, marginBottom:10, flex:1, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' },
  cardFt:     { display:'flex', alignItems:'center', justifyContent:'space-between' },
  cardEst:    { fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 },
  cardYr:     { fontSize:11, color:'rgba(255,255,255,.3)' },
  modalBg:    { position:'fixed', inset:0, background:'rgba(26,0,8,.88)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', backdropFilter:'blur(6px)' },
  modalBox:   { background:'#2a0010', borderRadius:18, overflow:'hidden', maxWidth:680, width:'100%', border:'1px solid rgba(255,215,0,.25)' },
  modalImg:   { width:'100%', height:280, objectFit:'cover', display:'block' },
  modalBody:  { padding:'1.5rem' },
  modalArea:  { fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'#FFD700', marginBottom:6 },
  modalAward: { fontSize:12, color:'#FFD700', marginBottom:6, opacity:.85 },
  modalTit:   { fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.9rem', color:'#fff', marginBottom:'.8rem', fontWeight:400 },
  modalDesc:  { fontSize:'.92rem', color:'rgba(255,255,255,.65)', lineHeight:1.7, marginBottom:'1.2rem' },
  modalMetas: { display:'flex', gap:'.8rem', flexWrap:'wrap', marginBottom:'1.2rem' },
  mmi:        { background:'rgba(255,215,0,.06)', border:'1px solid rgba(255,215,0,.12)', borderRadius:8, padding:'.6rem .9rem' },
  mmiL:       { fontSize:9, textTransform:'uppercase', letterSpacing:'.1em', color:'rgba(255,255,255,.35)', marginBottom:2 },
  mmiV:       { fontSize:13, fontWeight:600, color:'#fff' },
  modalClose: { background:'rgba(255,215,0,.1)', border:'1px solid rgba(255,215,0,.3)', color:'#FFD700', borderRadius:8, padding:'.6rem 1.4rem', cursor:'pointer', fontFamily:'inherit', fontSize:'.9rem', fontWeight:600, transition:'all .2s' },
}