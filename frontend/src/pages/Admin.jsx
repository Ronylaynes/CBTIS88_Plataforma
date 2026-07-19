// frontend/src/pages/Admin.jsx
import { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { AuthContext } from '@context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') ||
                 'http://localhost:5000'

const ESTATUS = [
  'todos','pendiente','aprobada','rechazada',
  'en_lista_espera','inscrito'
]

const EST_STYLE = {
  aprobada:        { bg:'#C6EFCE', color:'#006100' },
  inscrito:        { bg:'#BDD7EE', color:'#0C447C' },
  pendiente:       { bg:'#FFEB9C', color:'#7D6608' },
  rechazada:       { bg:'#FFC7CE', color:'#9C0006' },
  en_lista_espera: { bg:'#E2EFDA', color:'#375623' },
}

const C = {
  vino:     '#6B0020',
  vinoOsc:  '#4A0016',
  vinoClar: '#F5E6EA',
  dorado:   '#FFD700',
  blanco:   '#FFFFFF',
  gris:     '#F8F4F5',
}

export default function Admin({ seccionInicial = 'dashboard' }) {
  const { user, logout } = useContext(AuthContext)
  const navigate         = useNavigate()

  const [seccion,     setSeccion]     = useState(seccionInicial)
  const [stats,       setStats]       = useState(null)
  const [prefichas,   setPrefichas]   = useState([])
  const [usuarios,    setUsuarios]    = useState([])
  const [total,       setTotal]       = useState(0)
  const [pagina,      setPagina]      = useState(1)
  const [filtroEst,   setFiltroEst]   = useState('todos')
  const [busqueda,    setBusqueda]    = useState('')
  const [cargando,    setCargando]    = useState(false)
  const [descargando, setDescargando] = useState(false)
  const [mensaje,     setMensaje]     = useState(null)
  const [modalPref,   setModalPref]   = useState(null)

  const token   = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  const rolUsuario    = user?.role?.value || user?.role
  const puedeDescargar = ['admin', 'servicios_escolares'].includes(rolUsuario)

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto })
    setTimeout(() => setMensaje(null), 4000)
  }

  // ── Cargar stats ──────────────────────────────────────────
  const cargarStats = useCallback(async () => {
    try {
      const r = await axios.get(`${API_BASE}/api/admin/dashboard`, { headers })
      setStats(r.data.stats)
    } catch { /* silencioso */ }
  }, [])

  // ── Cargar prefichas ──────────────────────────────────────
  const cargarPrefichas = useCallback(async () => {
    setCargando(true)
    try {
      const r = await axios.get(`${API_BASE}/api/admin/prefichas`, {
        headers,
        params: { page: pagina, per_page: 20, status: filtroEst, search: busqueda },
      })
      setPrefichas(r.data.prefichas || [])
      setTotal(r.data.total || 0)
    } catch {
      mostrarMensaje('error', 'Error al cargar las prefichas.')
    } finally {
      setCargando(false)
    }
  }, [pagina, filtroEst, busqueda])

  // ── Cargar usuarios ───────────────────────────────────────
  const cargarUsuarios = useCallback(async () => {
    try {
      const r = await axios.get(`${API_BASE}/api/admin/users`, { headers })
      setUsuarios(r.data.users || [])
    } catch { /* silencioso */ }
  }, [])

  useEffect(() => { cargarStats() }, [cargarStats])

  useEffect(() => {
    if (seccion === 'prefichas') cargarPrefichas()
    if (seccion === 'usuarios')  cargarUsuarios()
  }, [seccion, cargarPrefichas, cargarUsuarios])

  // ── Actualizar estatus ────────────────────────────────────
  const actualizarEstatus = async (id, nuevoEstatus) => {
    try {
      await axios.put(
        `${API_BASE}/api/admin/prefichas/${id}/status`,
        { status: nuevoEstatus },
        { headers }
      )
      mostrarMensaje('ok', `Preficha actualizada a "${nuevoEstatus}"`)
      cargarPrefichas()
      setModalPref(null)
    } catch {
      mostrarMensaje('error', 'No se pudo actualizar el estatus.')
    }
  }

  // ════════════════════════════════════════════════════════
  //  DESCARGA EXCEL — funciona SIN backend
  //  Usa la librería xlsx directamente en el navegador
  //  Solo para: admin y servicios_escolares
  // ════════════════════════════════════════════════════════
  const descargarExcel = () => {
    if (!puedeDescargar) {
      mostrarMensaje('error', 'No tienes permiso para descargar.')
      return
    }
    if (prefichas.length === 0) {
      mostrarMensaje('error', 'No hay prefichas cargadas. Ve a la sección Prefichas primero.')
      return
    }

    setDescargando(true)
    try {
      // ── Preparar datos ──────────────────────────────────
      const datos = prefichas.map(p => ({
        'Folio':            p.folio             || '—',
        'CURP':             p.curp              || '—',
        'Nombre':           p.nombre            || '—',
        'Apellido Paterno': p.apellido_paterno  || '—',
        'Apellido Materno': p.apellido_materno  || '—',
        'Nombre Completo':  p.nombre_completo   ||
                            `${p.nombre||''} ${p.apellido_paterno||''} ${p.apellido_materno||''}`.trim(),
        'Fecha Nacimiento': p.fecha_nacimiento  || '—',
        'Sexo':             p.sexo              || '—',
        'Teléfono':         p.telefono          || '—',
        'Correo':           p.email             || '—',
        'Dirección':        p.direccion         || '—',
        '1ª Especialidad':  p.especialidad_1    || p.opcion1 || '—',
        '2ª Especialidad':  p.especialidad_2    || p.opcion2 || '—',
        '3ª Especialidad':  p.especialidad_3    || p.opcion3 || '—',
        'Secundaria':       p.secundaria_nombre || '—',
        'Promedio':         p.promedio_egreso   || '—',
        'Status':           p.status            || 'pendiente',
        'Fecha Registro':   p.created_at
                            ? new Date(p.created_at).toLocaleDateString('es-MX')
                            : '—',
      }))

      // ── Crear hoja ──────────────────────────────────────
      const wb = XLSX.utils.book_new()

      // Fila de título institucional
      const titulo = [['CBTIS No. 88 — Vicente Guerrero — Tapachula, Chiapas']]
      const wsTit  = XLSX.utils.aoa_to_sheet(titulo)

      // Fila de subtítulo
      const fecha     = new Date().toLocaleDateString('es-MX', {
        day:'2-digit', month:'2-digit', year:'numeric',
        hour:'2-digit', minute:'2-digit'
      })
      const subtitulo = [[`RELACIÓN DE ASPIRANTES — FICHA DE APLICACIÓN DE INSTRUMENTO DIAGNÓSTICO — Generado: ${fecha}`]]
      XLSX.utils.sheet_add_aoa(wsTit, subtitulo, { origin: 'A2' })

      // Total
      XLSX.utils.sheet_add_aoa(wsTit, [[`Total de aspirantes: ${prefichas.length}`]], { origin: 'A3' })

      // Espacio
      XLSX.utils.sheet_add_aoa(wsTit, [['']], { origin: 'A4' })

      // Datos con encabezados
      XLSX.utils.sheet_add_json(wsTit, datos, { origin: 'A5' })

      // Ancho de columnas
      wsTit['!cols'] = [
        { wch:14 },{ wch:22 },{ wch:18 },{ wch:18 },
        { wch:18 },{ wch:28 },{ wch:16 },{ wch:8  },
        { wch:14 },{ wch:28 },{ wch:30 },{ wch:22 },
        { wch:22 },{ wch:22 },{ wch:24 },{ wch:10 },
        { wch:14 },{ wch:18 },
      ]

      XLSX.utils.book_append_sheet(wb, wsTit, 'Relación Aspirantes')

      // ── Descargar ───────────────────────────────────────
      const fechaArchivo = new Date().toISOString().slice(0,10).replace(/-/g,'')
      XLSX.writeFile(wb, `relacion_aspirantes_${fechaArchivo}.xlsx`)

      mostrarMensaje('ok', `✅ Excel descargado — ${prefichas.length} aspirantes`)
    } catch (err) {
      mostrarMensaje('error', 'Error al generar el Excel.')
      console.error(err)
    } finally {
      setDescargando(false)
    }
  }

  // ── Función para ir a prefichas y descargar ───────────────
  const irAPrefichasYDescargar = () => {
    setSeccion('prefichas')
    // Espera a que carguen las prefichas y luego descarga
    setTimeout(() => descargarExcel(), 2000)
  }

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div style={s.root}>

      {/* ── SIDEBAR ── */}
      <aside style={s.sidebar}>
        <div style={s.sidebarTop}>
          <div style={s.logoRow}>
            <img src="/assets/images/icons/cbtis88.jpg" alt="Logo" style={s.sidebarLogo} />
            <div>
              <div style={s.sidebarTitulo}>CBTIS No. 88</div>
              <div style={s.sidebarSub}>Panel Institucional</div>
            </div>
          </div>
          <div style={s.userBadge}>
            <div style={s.userAvatar}>
              {user?.first_name?.[0]?.toUpperCase() ?? user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <div style={s.userName}>
                {user?.first_name ? `${user.first_name} ${user.last_name ?? ''}` : user?.name ?? 'Administrador'}
              </div>
              <div style={s.userRole}>{rolUsuario ?? 'admin'}</div>
            </div>
          </div>
        </div>

        <nav style={s.nav}>
          {[
            { id:'dashboard', icon:'📊', label:'Dashboard' },
            { id:'prefichas', icon:'📋', label:'Prefichas'  },
            { id:'usuarios',  icon:'👥', label:'Usuarios'   },
          ].map(item => (
            <button key={item.id}
              style={{ ...s.navBtn, ...(seccion === item.id ? s.navBtnOn : {}) }}
              onClick={() => setSeccion(item.id)}>
              <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button style={s.logoutBtn} onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* ── CONTENIDO ── */}
      <main style={s.main}>

        {mensaje && (
          <div style={{ ...s.alerta, ...(mensaje.tipo === 'error' ? s.alertaErr : s.alertaOk) }}>
            {mensaje.texto}
          </div>
        )}

        {/* ════════ DASHBOARD ════════ */}
        {seccion === 'dashboard' && (
          <div>
            <h1 style={s.pageTitle}>Dashboard</h1>
            <div style={s.statsGrid}>
              {stats && [
                { label:'Total Prefichas', num:stats.prefichas,  icon:'📋', color:C.vino    },
                { label:'Pendientes',      num:stats.pendientes, icon:'⏳', color:'#856404' },
                { label:'Aprobadas',       num:stats.aprobadas,  icon:'✅', color:'#006100' },
                { label:'Rechazadas',      num:stats.rechazadas, icon:'❌', color:'#9C0006' },
                { label:'Proyectos',       num:stats.projects,   icon:'🔬', color:C.vinoOsc },
                { label:'Docentes',        num:stats.teachers,   icon:'👨‍🏫', color:'#0C447C'},
              ].map(st => (
                <div key={st.label} style={s.statCard}>
                  <div style={{ ...s.statIcon, background:st.color }}>{st.icon}</div>
                  <div>
                    <div style={{ ...s.statNum, color:st.color }}>{st.num ?? 0}</div>
                    <div style={s.statLbl}>{st.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Acceso rápido — solo roles permitidos */}
            {puedeDescargar && (
              <div style={s.quickCard}>
                <h3 style={s.quickTit}>📥 Descargar Relación de Aspirantes</h3>
                <p style={{ fontSize:'0.85rem', color:'#888', marginBottom:'1rem' }}>
                  Genera el Excel con todos los aspirantes que sacaron ficha.
                  Solo disponible para administradores y servicios escolares.
                </p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                  <button
                    style={{ ...s.btnDescarga, ...(descargando ? s.btnDis : {}) }}
                    onClick={irAPrefichasYDescargar}
                    disabled={descargando}
                  >
                    {descargando ? '⏳ Generando...' : '📥 Descargar Excel (.xlsx)'}
                  </button>
                  <span style={{ fontSize:'0.78rem', color:'#aaa' }}>
                    Se cargará la lista y descargará automáticamente
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════ PREFICHAS ════════ */}
        {seccion === 'prefichas' && (
          <div>
            <div style={s.pageHd}>
              <h1 style={s.pageTitle}>Gestión de Prefichas</h1>

              {/* Botón descarga — solo roles permitidos */}
              {puedeDescargar && (
                <button
                  style={{ ...s.btnDescarga, ...(descargando ? s.btnDis : {}) }}
                  onClick={descargarExcel}
                  disabled={descargando}
                  title="Descargar relación de aspirantes en Excel"
                >
                  {descargando ? '⏳ Generando...' : '📥 Descargar Excel'}
                </button>
              )}
            </div>

            {/* Filtros */}
            <div style={s.filtrosRow}>
              <input
                type="text"
                placeholder="🔍 Buscar por nombre, CURP o folio..."
                value={busqueda}
                onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
                style={s.inputSearch}
              />
              <select
                value={filtroEst}
                onChange={e => { setFiltroEst(e.target.value); setPagina(1) }}
                style={s.selectFiltro}
              >
                {ESTATUS.map(e => (
                  <option key={e} value={e}>
                    {e === 'todos' ? 'Todos los estatus' : e.replace('_',' ')}
                  </option>
                ))}
              </select>
            </div>

            <p style={s.totalTxt}>
              {cargando ? 'Cargando...' : `${total} registro${total!==1?'s':''} encontrado${total!==1?'s':''}`}
            </p>

            {/* Tabla */}
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {['Folio','Nombre completo','CURP','Teléfono','1ª Opción','Estatus','Fecha','Ver'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!cargando && prefichas.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ ...s.td, textAlign:'center', color:'#aaa', padding:'2.5rem' }}>
                        No hay registros con los filtros seleccionados
                      </td>
                    </tr>
                  ) : prefichas.map((p, i) => (
                    <tr key={p.id} style={{ background: i%2===0 ? C.blanco : C.vinoClar }}>
                      <td style={{ ...s.td, fontWeight:700, color:C.vino }}>{p.folio}</td>
                      <td style={s.td}>
                        {p.nombre_completo || `${p.nombre??''} ${p.apellido_paterno??''} ${p.apellido_materno??''}`}
                      </td>
                      <td style={{ ...s.td, fontSize:11 }}>{p.curp}</td>
                      <td style={s.td}>{p.telefono}</td>
                      <td style={s.td}>{p.especialidad_1 || p.opcion1}</td>
                      <td style={s.td}>
                        <span style={{ ...s.estBadge, background:EST_STYLE[p.status]?.bg??'#eee', color:EST_STYLE[p.status]?.color??'#333' }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ ...s.td, fontSize:11, color:'#999' }}>
                        {p.created_at ? new Date(p.created_at).toLocaleDateString('es-MX') : ''}
                      </td>
                      <td style={s.td}>
                        <button style={s.btnVer} onClick={() => setModalPref(p)}>Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {total > 20 && (
              <div style={s.pag}>
                <button style={s.btnPag} disabled={pagina===1} onClick={() => setPagina(p=>p-1)}>← Anterior</button>
                <span style={{ fontSize:13, color:'#666' }}>Página {pagina} de {Math.ceil(total/20)}</span>
                <button style={s.btnPag} disabled={pagina>=Math.ceil(total/20)} onClick={() => setPagina(p=>p+1)}>Siguiente →</button>
              </div>
            )}
          </div>
        )}

        {/* ════════ USUARIOS ════════ */}
        {seccion === 'usuarios' && (
          <div>
            <h1 style={s.pageTitle}>Usuarios del Sistema</h1>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {['ID','Nombre','Email','Rol','Activo','Registro'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u, i) => (
                    <tr key={u.id} style={{ background: i%2===0 ? C.blanco : C.vinoClar }}>
                      <td style={s.td}>{u.id}</td>
                      <td style={s.td}>{u.first_name ? `${u.first_name} ${u.last_name??''}` : u.name}</td>
                      <td style={s.td}>{u.email}</td>
                      <td style={s.td}>
                        <span style={{ ...s.estBadge, background:u.role==='admin'?'#fde8ef':'#E2EFDA', color:u.role==='admin'?C.vino:'#375623' }}>
                          {u.role?.value || u.role}
                        </span>
                      </td>
                      <td style={s.td}>{u.is_active ? '✅' : '❌'}</td>
                      <td style={{ ...s.td, fontSize:11, color:'#999' }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('es-MX') : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      {modalPref && (
        <div style={s.modalBg} onClick={() => setModalPref(null)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={s.modalHd}>
              <h2 style={s.modalTit}>
                {modalPref.nombre_completo || `${modalPref.nombre??''} ${modalPref.apellido_paterno??''} ${modalPref.apellido_materno??''}`}
              </h2>
              <button style={s.modalX} onClick={() => setModalPref(null)}>✕</button>
            </div>
            <div style={s.modalBody}>
              {(modalPref.foto_url || modalPref.foto_base64) && (
                <div style={{ textAlign:'center', marginBottom:'1rem' }}>
                  <img src={modalPref.foto_base64 || `${API_BASE}${modalPref.foto_url}`} alt="Foto aspirante" style={s.modalFoto} />
                </div>
              )}
              <div style={s.modalGrid}>
                {[
                  { label:'Folio',      valor: modalPref.folio },
                  { label:'CURP',       valor: modalPref.curp },
                  { label:'Teléfono',   valor: modalPref.telefono },
                  { label:'Correo',     valor: modalPref.email },
                  { label:'Secundaria', valor: modalPref.secundaria_nombre },
                  { label:'Promedio',   valor: modalPref.promedio_egreso },
                  { label:'Tutor',      valor: `${modalPref.tutor_nombre??''} (${modalPref.tutor_parentesco??''})` },
                  { label:'Tel. Tutor', valor: modalPref.tutor_telefono },
                  { label:'1ª Opción',  valor: modalPref.especialidad_1 || modalPref.opcion1 },
                  { label:'2ª Opción',  valor: modalPref.especialidad_2 || modalPref.opcion2 },
                  { label:'3ª Opción',  valor: modalPref.especialidad_3 || modalPref.opcion3 },
                  { label:'Estatus',    valor: modalPref.status },
                ].map(d => (
                  <div key={d.label} style={s.mItem}>
                    <div style={s.mLabel}>{d.label}</div>
                    <div style={s.mValor}>{d.valor || '—'}</div>
                  </div>
                ))}
              </div>
              <div style={s.modalAcciones}>
                <p style={{ fontWeight:700, marginBottom:8, color:C.vino, fontSize:'0.9rem' }}>Cambiar estatus:</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {['aprobada','rechazada','en_lista_espera','inscrito','pendiente'].map(est => (
                    <button key={est}
                      style={{ ...s.btnEst, background:EST_STYLE[est]?.bg??'#eee', color:EST_STYLE[est]?.color??'#333', border:modalPref.status===est?`2px solid ${EST_STYLE[est]?.color}`:'1px solid #ccc', fontWeight:modalPref.status===est?800:500 }}
                      onClick={() => actualizarEstatus(modalPref.id, est)}>
                      {est.replace('_',' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  root:          { display:'flex', minHeight:'100vh', background:'#F8F4F5', fontFamily:"'Segoe UI',sans-serif" },
  sidebar:       { width:240, background:C.vino, display:'flex', flexDirection:'column', flexShrink:0 },
  sidebarTop:    { padding:'1.2rem', borderBottom:'1px solid rgba(255,255,255,.12)' },
  logoRow:       { display:'flex', alignItems:'center', gap:10, marginBottom:'1rem' },
  sidebarLogo:   { width:40, height:40, borderRadius:'50%', objectFit:'cover', border:'2px solid #FFD700' },
  sidebarTitulo: { color:'#fff', fontWeight:700, fontSize:'0.9rem' },
  sidebarSub:    { color:'rgba(255,255,255,.55)', fontSize:'0.72rem' },
  userBadge:     { display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.08)', borderRadius:8, padding:'0.5rem 0.7rem' },
  userAvatar:    { width:32, height:32, borderRadius:'50%', background:'#FFD700', color:C.vino, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'0.9rem', flexShrink:0 },
  userName:      { color:'#fff', fontWeight:600, fontSize:'0.82rem' },
  userRole:      { color:'rgba(255,255,255,.5)', fontSize:'0.7rem' },
  nav:           { padding:'1rem 0.8rem', display:'flex', flexDirection:'column', gap:4, flex:1 },
  navBtn:        { display:'flex', alignItems:'center', gap:10, padding:'0.6rem 1rem', borderRadius:8, border:'none', background:'transparent', color:'rgba(255,255,255,.7)', fontSize:'0.88rem', cursor:'pointer', textAlign:'left', fontFamily:'inherit', transition:'all .2s' },
  navBtnOn:      { background:'rgba(255,215,0,.15)', color:'#FFD700', fontWeight:600 },
  logoutBtn:     { margin:'0.8rem', padding:'0.55rem 1rem', background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.7)', borderRadius:8, cursor:'pointer', fontSize:'0.85rem', fontFamily:'inherit', transition:'all .2s' },
  main:          { flex:1, padding:'2rem', overflowY:'auto' },
  pageTitle:     { fontSize:'1.5rem', fontWeight:700, color:C.vino, marginBottom:'1.5rem' },
  pageHd:        { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' },
  statsGrid:     { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:'1rem', marginBottom:'2rem' },
  statCard:      { background:'#fff', borderRadius:12, padding:'1.1rem', display:'flex', alignItems:'center', gap:'1rem', boxShadow:'0 2px 12px rgba(107,0,32,.07)', border:'1px solid rgba(107,0,32,.07)' },
  statIcon:      { width:42, height:42, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 },
  statNum:       { fontSize:'1.7rem', fontWeight:800, lineHeight:1 },
  statLbl:       { fontSize:'0.75rem', color:'#999', fontWeight:500, marginTop:2 },
  quickCard:     { background:'#fff', borderRadius:12, padding:'1.5rem', boxShadow:'0 2px 12px rgba(107,0,32,.07)', border:'1px solid rgba(107,0,32,.07)' },
  quickTit:      { fontSize:'1rem', fontWeight:700, color:C.vino, marginBottom:'.5rem' },
  btnDescarga:   { display:'inline-flex', alignItems:'center', gap:8, padding:'0.65rem 1.4rem', background:C.vino, color:'#FFD700', border:'none', borderRadius:9, fontWeight:700, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit', transition:'all .2s', boxShadow:'0 4px 12px rgba(107,0,32,.2)' },
  btnDis:        { background:'#ccc', color:'#888', cursor:'not-allowed', boxShadow:'none' },
  btnVer:        { padding:'4px 12px', background:C.vinoClar, color:C.vino, border:`1px solid ${C.vino}`, borderRadius:6, fontSize:12, cursor:'pointer', fontWeight:600, fontFamily:'inherit' },
  btnPag:        { padding:'6px 14px', background:'#fff', border:`1px solid ${C.vino}`, color:C.vino, borderRadius:6, cursor:'pointer', fontSize:13, fontFamily:'inherit' },
  btnEst:        { padding:'5px 12px', borderRadius:20, cursor:'pointer', fontSize:12, fontFamily:'inherit', transition:'all .2s' },
  filtrosRow:    { display:'flex', gap:'1rem', marginBottom:'1rem', flexWrap:'wrap' },
  inputSearch:   { flex:1, minWidth:220, padding:'0.55rem 0.9rem', borderRadius:8, border:`1.5px solid rgba(107,0,32,.2)`, fontSize:'0.9rem', outline:'none', fontFamily:'inherit' },
  selectFiltro:  { padding:'0.55rem 0.9rem', borderRadius:8, border:`1.5px solid rgba(107,0,32,.2)`, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit', outline:'none' },
  totalTxt:      { fontSize:'0.83rem', color:'#aaa', marginBottom:'0.8rem' },
  tableWrap:     { overflowX:'auto', borderRadius:10, boxShadow:'0 2px 12px rgba(107,0,32,.07)', border:'1px solid rgba(107,0,32,.07)' },
  table:         { width:'100%', borderCollapse:'collapse', background:'#fff' },
  th:            { padding:'0.7rem 0.9rem', background:C.vino, color:'#fff', fontSize:11, fontWeight:700, textAlign:'left', whiteSpace:'nowrap' },
  td:            { padding:'0.5rem 0.9rem', fontSize:12, color:'#1a0008', borderBottom:'1px solid rgba(107,0,32,.05)' },
  estBadge:      { display:'inline-block', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 },
  pag:           { display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', marginTop:'1.5rem' },
  alerta:        { padding:'0.8rem 1.2rem', borderRadius:8, marginBottom:'1rem', fontWeight:500, fontSize:'0.88rem' },
  alertaOk:      { background:'#C6EFCE', color:'#006100' },
  alertaErr:     { background:'#FFC7CE', color:'#9C0006' },
  modalBg:       { position:'fixed', inset:0, background:'rgba(26,0,8,.75)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', backdropFilter:'blur(4px)' },
  modalBox:      { background:'#fff', borderRadius:16, overflow:'hidden', maxWidth:700, width:'100%', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 60px rgba(107,0,32,.3)' },
  modalHd:       { background:C.vino, padding:'1.1rem 1.4rem', display:'flex', alignItems:'center', justifyContent:'space-between' },
  modalTit:      { color:'#fff', fontWeight:700, fontSize:'1rem', margin:0 },
  modalX:        { background:'rgba(255,255,255,.15)', border:'none', color:'#fff', width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:'0.85rem', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' },
  modalBody:     { padding:'1.4rem' },
  modalFoto:     { width:90, height:90, borderRadius:'50%', objectFit:'cover', border:`3px solid ${C.vino}` },
  modalGrid:     { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:'0.7rem', marginBottom:'1.3rem' },
  mItem:         { background:C.vinoClar, borderRadius:8, padding:'0.55rem 0.8rem' },
  mLabel:        { fontSize:10, textTransform:'uppercase', letterSpacing:'.08em', color:C.vino, fontWeight:700, marginBottom:2 },
  mValor:        { fontSize:13, color:'#1a0008', fontWeight:500 },
  modalAcciones: { background:'#FFF8E1', borderRadius:10, padding:'1rem', border:'1px solid #FFD700' },
}