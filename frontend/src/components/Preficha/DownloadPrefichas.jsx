// ================================================================
//  ARCHIVO: frontend/src/components/Preficha/DownloadPrefichas.jsx
//
//  Roles con acceso: admin, servicios_escolares
//  (Estos son los roles reales de tu base de datos CBTIS 88)
// ================================================================

import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '@context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ✅ Roles reales de tu BD — no director ni secretaria
const ROLES_PERMITIDOS = ['admin', 'servicios_escolares']

export default function DownloadPrefichas() {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [estado,    setEstado]    = useState('idle')
  const [prefichas, setPrefichas] = useState([])
  const [filtro,    setFiltro]    = useState('todos')
  const [busqueda,  setBusqueda]  = useState('')
  const [mensaje,   setMensaje]   = useState('')

  // ✅ Comparar con .value si es Enum, o directo si es string
  const rolUsuario = user?.role?.value || user?.role
  const tieneAcceso = isAuthenticated &&
                      user &&
                      ROLES_PERMITIDOS.includes(rolUsuario)

  useEffect(() => {
    if (tieneAcceso) cargarPrefichas()
  }, [tieneAcceso])

  const cargarPrefichas = async () => {
    setEstado('cargando')
    try {
      const token = localStorage.getItem('token')
      const res   = await fetch(`${API_BASE}/prefichas`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Sin acceso')
      const data = await res.json()
      // La API puede devolver { prefichas: [...] } o directamente un array
      setPrefichas(Array.isArray(data) ? data : data.prefichas || [])
      setEstado('idle')
    } catch {
      setEstado('error')
      setMensaje('No se pudieron cargar las prefichas.')
    }
  }

  const descargarArchivo = async (url, nombreArchivo) => {
    setEstado('descargando')
    try {
      const token = localStorage.getItem('token')
      const res   = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Error al exportar')
      const blob  = await res.blob()
      const urlOb = URL.createObjectURL(blob)
      const a     = document.createElement('a')
      a.href      = urlOb
      a.download  = nombreArchivo
      a.click()
      URL.revokeObjectURL(urlOb)
      setEstado('idle')
    } catch {
      setEstado('error')
      setMensaje('Error al descargar. Intenta de nuevo.')
    }
  }

  const descargarExcel = () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    descargarArchivo(
      `${API_BASE}/prefichas/reporte/excel`,
      `relacion_aspirantes_${fecha}.xlsx`
    )
  }

  const descargarCSV = () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    descargarArchivo(
      `${API_BASE}/prefichas/reporte/csv`,
      `relacion_aspirantes_${fecha}.csv`
    )
  }

  const descargarPDFIndividual = (folio, nombre) => {
    descargarArchivo(
      `${API_BASE}/prefichas/pdf/${folio}`,
      `preficha_${nombre.replace(/\s+/g, '_')}.pdf`
    )
  }

  const prefichasFiltradas = prefichas.filter(p => {
    const coincideBusqueda =
      p.nombre_completo?.toLowerCase().includes(
        busqueda.toLowerCase()) ||
      p.folio?.toLowerCase().includes(
        busqueda.toLowerCase()) ||
      p.curp?.toLowerCase().includes(busqueda.toLowerCase())
    const coincideFiltro =
      filtro === 'todos' || p.status === filtro
    return coincideBusqueda && coincideFiltro
  })

  // ── Sin sesión ───────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={s.aviso}>
        <span style={{ fontSize: 32, marginBottom: 12 }}>🔒</span>
        <p style={s.avisoTexto}>
          Debes iniciar sesión para acceder a esta sección.
        </p>
      </div>
    )
  }

  // ── Sin permisos ─────────────────────────────────────────
  if (!tieneAcceso) {
    return (
      <div style={s.aviso}>
        <span style={{ fontSize: 32, marginBottom: 12 }}>⛔</span>
        <p style={s.avisoTexto}>
          No tienes permisos para ver esta sección.
        </p>
        <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
          Solo pueden acceder: Administrador y Servicios Escolares.
        </p>
      </div>
    )
  }

  // ── Vista principal ───────────────────────────────────────
  return (
    <div style={s.contenedor}>

      {/* Encabezado */}
      <div style={s.encabezado}>
        <div>
          <h2 style={s.titulo}>Relación de Aspirantes</h2>
          <p style={s.subtitulo}>
            {user?.first_name || user?.email} · {rolUsuario}
          </p>
        </div>
        <div style={s.badgeAcceso}>
          <span style={s.puntoVerde} />
          Acceso autorizado
        </div>
      </div>

      {/* Error */}
      {mensaje && (
        <div style={s.error}>
          <span>⚠️ {mensaje}</span>
          <button style={s.cerrarError}
                  onClick={() => setMensaje('')}>✕</button>
        </div>
      )}

      {/* Controles de búsqueda */}
      <div style={s.controles}>
        <input
          type="text"
          placeholder="Buscar por nombre, folio o CURP..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={s.input}
        />
        <select
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          style={s.select}
        >
          <option value="todos">Todos los status</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobada">Aprobada</option>
          <option value="rechazada">Rechazada</option>
          <option value="en_lista_espera">En lista de espera</option>
          <option value="inscrito">Inscrito</option>
        </select>
        <button
          onClick={cargarPrefichas}
          style={s.btnSecundario}
          disabled={estado === 'cargando'}
        >
          ↻ Actualizar
        </button>
      </div>

      {/* Botones de descarga */}
      <div style={s.grupoDescarga}>
        <span style={s.etiquetaDescarga}>Descargar relación:</span>
        <button
          onClick={descargarExcel}
          disabled={estado === 'descargando' ||
                    prefichas.length === 0}
          style={s.btnExcel}
        >
          {estado === 'descargando'
            ? 'Generando...'
            : '↓ Excel (.xlsx)'}
        </button>
        <button
          onClick={descargarCSV}
          disabled={estado === 'descargando' ||
                    prefichas.length === 0}
          style={s.btnCsv}
        >
          ↓ CSV
        </button>
      </div>

      {/* Tabla */}
      <div style={s.tablaContenedor}>
        {estado === 'cargando' ? (
          <div style={s.cargando}>Cargando prefichas...</div>
        ) : prefichasFiltradas.length === 0 ? (
          <div style={s.vacio}>
            {busqueda || filtro !== 'todos'
              ? 'No hay resultados para tu búsqueda.'
              : 'No hay prefichas registradas aún.'}
          </div>
        ) : (
          <table style={s.tabla}>
            <thead>
              <tr>
                {['Folio', 'Nombre Completo', 'CURP',
                  'Teléfono', '1ª Opción',
                  'Pago', 'Status', 'PDF'].map(col => (
                  <th key={col} style={s.th}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prefichasFiltradas.map((p, i) => (
                <tr key={p.id}
                    style={{
                      background: i % 2 === 0 ? '#fafafa' : '#fff'
                    }}>
                  <td style={s.td}>
                    <span style={s.folio}>{p.folio}</span>
                  </td>
                  <td style={s.td}>{p.nombre_completo}</td>
                  <td style={{ ...s.td, fontFamily: 'monospace',
                               fontSize: 11 }}>
                    {p.curp}
                  </td>
                  <td style={s.td}>{p.telefono}</td>
                  <td style={s.td}>{p.especialidad_1}</td>
                  <td style={s.td}>
                    <span style={{
                      ...s.badge,
                      ...(p.pago_confirmado
                        ? s.badgeVerde
                        : s.badgeRojo)
                    }}>
                      {p.pago_confirmado ? 'Pagado' : 'Pendiente'}
                    </span>
                  </td>
                  <td style={s.td}>
                    <span style={{
                      ...s.badge,
                      ...s.badgeStatus[p.status] || {}
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button
                      onClick={() =>
                        descargarPDFIndividual(
                          p.folio, p.nombre_completo)}
                      style={s.btnIndividual}
                      title="Descargar PDF individual"
                    >
                      ↓ PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p style={s.pie}>
        {prefichasFiltradas.length} registro(s) ·
        Solo personal autorizado del CBTIS 88
      </p>
    </div>
  )
}

// ── Estilos ────────────────────────────────────────────────
const s = {
  contenedor:     { background: '#fff', borderRadius: 12,
                    border: '1px solid #e5e7eb',
                    padding: '1.5rem', maxWidth: 1000 },
  encabezado:     { display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap', gap: 12 },
  titulo:         { fontSize: 20, fontWeight: 600,
                    margin: 0, color: '#111' },
  subtitulo:      { fontSize: 13, color: '#6b7280',
                    margin: '4px 0 0' },
  badgeAcceso:    { display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 12, color: '#166534',
                    background: '#dcfce7',
                    border: '1px solid #bbf7d0',
                    borderRadius: 20, padding: '4px 12px',
                    fontWeight: 500 },
  puntoVerde:     { width: 7, height: 7, borderRadius: '50%',
                    background: '#16a34a', display: 'inline-block' },
  controles:      { display: 'flex', gap: 10,
                    marginBottom: '1rem', flexWrap: 'wrap' },
  input:          { flex: 1, minWidth: 200, padding: '8px 12px',
                    borderRadius: 8, border: '1px solid #d1d5db',
                    fontSize: 14, outline: 'none' },
  select:         { padding: '8px 12px', borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 14, background: '#fff',
                    cursor: 'pointer' },
  btnSecundario:  { padding: '8px 14px', borderRadius: 8,
                    border: '1px solid #d1d5db',
                    background: '#f9fafb', fontSize: 14,
                    cursor: 'pointer', fontWeight: 500,
                    color: '#374151' },
  grupoDescarga:  { display: 'flex', alignItems: 'center',
                    gap: 10, marginBottom: '1.25rem',
                    flexWrap: 'wrap' },
  etiquetaDescarga:{ fontSize: 13, color: '#6b7280',
                     fontWeight: 500 },
  btnExcel:       { padding: '8px 16px', borderRadius: 8,
                    border: 'none', background: '#166534',
                    color: '#fff', fontSize: 13,
                    fontWeight: 600, cursor: 'pointer' },
  btnCsv:         { padding: '8px 16px', borderRadius: 8,
                    border: '1px solid #6b7280',
                    background: '#fff', color: '#374151',
                    fontSize: 13, fontWeight: 500,
                    cursor: 'pointer' },
  tablaContenedor:{ border: '1px solid #e5e7eb', borderRadius: 8,
                    overflow: 'hidden', marginBottom: '1rem' },
  tabla:          { width: '100%', borderCollapse: 'collapse',
                    fontSize: 14 },
  th:             { textAlign: 'left', padding: '10px 14px',
                    background: '#6B1E2E', color: '#fff',
                    fontWeight: 600, fontSize: 12,
                    borderBottom: '1px solid #4A1220' },
  td:             { padding: '10px 14px',
                    borderBottom: '1px solid #f3f4f6',
                    color: '#111', verticalAlign: 'middle' },
  folio:          { fontFamily: 'monospace', fontSize: 12,
                    color: '#6B1E2E', fontWeight: 700 },
  badge:          { display: 'inline-block', padding: '2px 10px',
                    borderRadius: 20, fontSize: 12,
                    fontWeight: 500 },
  badgeVerde:     { background: '#dcfce7', color: '#166534' },
  badgeRojo:      { background: '#fee2e2', color: '#991b1b' },
  badgeStatus:    {
    pendiente:       { background: '#fef9c3', color: '#854d0e' },
    aprobada:        { background: '#dcfce7', color: '#166534' },
    rechazada:       { background: '#fee2e2', color: '#991b1b' },
    en_lista_espera: { background: '#dbeafe', color: '#1e40af' },
    inscrito:        { background: '#f3e8ff', color: '#6b21a8' },
  },
  btnIndividual:  { padding: '4px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db',
                    background: '#fff', color: '#374151',
                    fontSize: 12, fontWeight: 600,
                    cursor: 'pointer' },
  error:          { display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fee2e2', color: '#991b1b',
                    padding: '10px 14px', borderRadius: 8,
                    marginBottom: '1rem', fontSize: 14 },
  cerrarError:    { background: 'none', border: 'none',
                    cursor: 'pointer', color: '#991b1b',
                    fontWeight: 700 },
  cargando:       { padding: '2rem', textAlign: 'center',
                    color: '#6b7280', fontSize: 14 },
  vacio:          { padding: '2rem', textAlign: 'center',
                    color: '#9ca3af', fontSize: 14 },
  aviso:          { display: 'flex', flexDirection: 'column',
                    alignItems: 'center', padding: '3rem 2rem',
                    textAlign: 'center', background: '#f9fafb',
                    borderRadius: 12,
                    border: '1px solid #e5e7eb' },
  avisoTexto:     { fontSize: 16, fontWeight: 500,
                    color: '#374151', margin: '0 0 6px' },
  pie:            { fontSize: 12, color: '#9ca3af',
                    textAlign: 'right', margin: 0 },
}
