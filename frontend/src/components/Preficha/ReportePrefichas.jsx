// ================================================================
//  ARCHIVO: frontend/src/components/Preficha/ReportePrefichas.jsx
//
//  Solo visible para roles: admin y servicios_escolares
//  Muestra tabla de aspirantes + botón de descarga Excel
// ================================================================

import { useState, useEffect } from 'react'
import { descargarExcelAspirantes } from '@services/prefichaService'

const ReportePrefichas = ({ prefichas = [], userRole }) => {
  const [descargando, setDescargando]   = useState(false)
  const [error,       setError]         = useState(null)
  const [exito,       setExito]         = useState(false)
  const [busqueda,    setBusqueda]      = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  // Solo admin y servicios_escolares pueden ver este componente
  const rolesPermitidos = ['admin', 'servicios_escolares']
  if (!rolesPermitidos.includes(userRole)) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">
          ⛔ No tienes permisos para ver esta sección.
        </p>
      </div>
    )
  }

  // ── Descarga Excel ───────────────────────────────────────
  const handleDescargarExcel = async () => {
    setDescargando(true)
    setError(null)
    setExito(false)
    try {
      await descargarExcelAspirantes()
      setExito(true)
      setTimeout(() => setExito(false), 3000)
    } catch (err) {
      if (err.response?.status === 403) {
        setError('No tienes permisos para descargar el reporte.')
      } else {
        setError('Error al descargar el reporte. Intenta de nuevo.')
      }
    } finally {
      setDescargando(false)
    }
  }

  // ── Filtros ──────────────────────────────────────────────
  const prefichasFiltradas = prefichas.filter(p => {
    const coincideBusqueda =
      p.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.folio?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.curp?.toLowerCase().includes(busqueda.toLowerCase())

    const coincideStatus =
      filtroStatus === 'todos' || p.status === filtroStatus

    return coincideBusqueda && coincideStatus
  })

  const STATUS_COLOR = {
    pendiente:       'bg-yellow-100 text-yellow-800',
    aprobada:        'bg-green-100  text-green-800',
    rechazada:       'bg-red-100    text-red-800',
    en_lista_espera: 'bg-blue-100   text-blue-800',
    inscrito:        'bg-purple-100 text-purple-800',
  }

  return (
    <div className="space-y-4">

      {/* ── Encabezado + botón descarga ── */}
      <div className="flex flex-col sm:flex-row justify-between
                      items-start sm:items-center gap-3
                      bg-white p-4 rounded-xl shadow-sm
                      border border-neutral-200">
        <div>
          <h2 className="text-lg font-bold text-primary-500">
            Relación de Aspirantes
          </h2>
          <p className="text-sm text-neutral-500">
            {prefichas.length} aspirante{prefichas.length !== 1 ? 's' : ''} registrado{prefichas.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleDescargarExcel}
            disabled={descargando}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg
                        font-semibold text-sm transition-all
                        ${descargando
                          ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                        }`}
          >
            {descargando ? (
              <>
                <svg className="animate-spin h-4 w-4"
                     xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Generando Excel...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4" viewBox="0 0 20 20"
                     fill="currentColor">
                  <path fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"/>
                </svg>
                Descargar Excel
              </>
            )}
          </button>

          {/* Mensajes de feedback */}
          {exito && (
            <span className="text-xs text-green-600 font-medium">
              ✅ Archivo descargado correctamente
            </span>
          )}
          {error && (
            <span className="text-xs text-red-500 font-medium">
              ❌ {error}
            </span>
          )}
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-3
                      bg-white p-3 rounded-xl shadow-sm
                      border border-neutral-200">
        <input
          type="text"
          placeholder="Buscar por nombre, folio o CURP..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="flex-1 px-3 py-2 border border-neutral-300
                     rounded-lg text-sm focus:outline-none
                     focus:ring-2 focus:ring-primary-300"
        />
        <select
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value)}
          className="px-3 py-2 border border-neutral-300
                     rounded-lg text-sm focus:outline-none
                     focus:ring-2 focus:ring-primary-300
                     bg-white"
        >
          <option value="todos">Todos los status</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobada">Aprobada</option>
          <option value="rechazada">Rechazada</option>
          <option value="en_lista_espera">En lista de espera</option>
          <option value="inscrito">Inscrito</option>
        </select>
      </div>

      {/* ── Tabla ── */}
      <div className="bg-white rounded-xl shadow-sm
                      border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-500 text-white">
                {['Folio', 'Nombre Completo', 'CURP', 'Teléfono',
                  '1ª Opción', 'Pago', 'Status', 'Fecha'].map(h => (
                  <th key={h}
                      className="px-4 py-3 text-left font-semibold
                                 text-xs uppercase tracking-wide
                                 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {prefichasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={8}
                      className="px-4 py-8 text-center
                                 text-neutral-400 text-sm">
                    No se encontraron aspirantes con ese criterio.
                  </td>
                </tr>
              ) : (
                prefichasFiltradas.map((p, i) => (
                  <tr key={p.id}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 font-mono text-xs
                                   text-primary-600 font-semibold">
                      {p.folio}
                    </td>
                    <td className="px-4 py-2 font-medium text-neutral-800
                                   whitespace-nowrap">
                      {p.nombre_completo}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs
                                   text-neutral-500">
                      {p.curp}
                    </td>
                    <td className="px-4 py-2 text-neutral-600">
                      {p.telefono}
                    </td>
                    <td className="px-4 py-2 text-neutral-700
                                   whitespace-nowrap">
                      {p.especialidad_1}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs
                                        font-semibold ${
                        p.pago_confirmado
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100   text-red-700'
                      }`}>
                        {p.pago_confirmado ? 'Pagado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs
                                        font-semibold ${STATUS_COLOR[p.status] || ''}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-neutral-500 text-xs
                                   whitespace-nowrap">
                      {p.created_at?.slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default ReportePrefichas
