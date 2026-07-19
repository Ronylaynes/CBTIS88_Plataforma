import { useState, useEffect, useCallback } from 'react'
import { obtenerReportePrefichas } from '@services/prefichaService'

export const usePrefichas = () => {
  const [alumnos, setAlumnos]     = useState([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  const cargarDatos = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const data = await obtenerReportePrefichas()
      setAlumnos(data)
      setUltimaActualizacion(new Date())
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los datos')
    } finally {
      setCargando(false)
    }
  }, [])

  // Carga solo al montar el componente
  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  return { alumnos, cargando, error, ultimaActualizacion, recargar: cargarDatos }
}