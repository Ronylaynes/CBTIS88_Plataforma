import { useState, useEffect } from 'react'
import { getStaff } from '../../services/teacherService'

const TIPOS = [
  { value: '', label: 'Todos' },
  { value: 'docente', label: 'Docentes' },
  { value: 'administrativo', label: 'Administrativos' },
  { value: 'intendente', label: 'Intendentes' },
]

const BADGE_COLORS = {
  docente: 'bg-green-100 text-green-700',
  administrativo: 'bg-blue-100 text-blue-700',
  intendente: 'bg-yellow-100 text-yellow-700',
}

export default function TeachersList() {
  const [staff, setStaff] = useState([])
  const [tipo, setTipo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getStaff(tipo)
      .then(setStaff)
      .finally(() => setLoading(false))
  }, [tipo])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Personal del Plantel</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TIPOS.map(t => (
          <button
            key={t.value}
            onClick={() => setTipo(t.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tipo === t.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : staff.length === 0 ? (
        <p className="text-gray-400">No se encontró personal.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {staff.map(s => (
            <div key={s.id} className="p-4 border rounded-lg shadow-sm bg-white flex flex-col items-center">
              {s.foto_url ? (
                <img
                  src={s.foto_url}
                  alt={s.nombre}
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-2xl text-gray-400">
                  👤
                </div>
              )}
              <p className="font-semibold text-gray-800 text-center text-sm">{s.nombre}</p>
              <span className={`mt-2 text-xs px-2 py-1 rounded-full capitalize font-medium ${BADGE_COLORS[s.tipo]}`}>
                {s.tipo}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}