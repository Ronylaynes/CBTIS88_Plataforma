import { useState, useRef, useCallback } from 'react'

const FotoSection = ({ formData, updateFormData }) => {
  const [camaraActiva, setCamaraActiva]   = useState(false)
  const [fotoPreview, setFotoPreview]     = useState(formData.foto_base64 || null)
  const [error, setError]                 = useState(null)

  const videoRef  = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  // ── Cámara ────────────────────────────────────────
  const activarCamara = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCamaraActiva(true)
    } catch {
      setError('No se pudo acceder a la cámara. Verifica los permisos del navegador.')
    }
  }

  const detenerCamara = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setCamaraActiva(false)
  }, [])

  const tomarFoto = () => {
    const canvas = canvasRef.current
    const video  = videoRef.current
    if (!canvas || !video) return

    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)

    const base64 = canvas.toDataURL('image/jpeg', 0.85)
    setFotoPreview(base64)
    updateFormData('foto_base64', base64)
    detenerCamara()
  }

  // ── Galería ───────────────────────────────────────
  const handleArchivo = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    if (!archivo.type.startsWith('image/')) {
      setError('Solo se permiten imágenes (JPG, PNG, etc.)')
      return
    }
    if (archivo.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setFotoPreview(ev.target.result)
      updateFormData('foto_base64', ev.target.result)
      setError(null)
    }
    reader.readAsDataURL(archivo)
  }

  const resetearFoto = () => {
    setFotoPreview(null)
    updateFormData('foto_base64', null)
    detenerCamara()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary-500 mb-2">
          5. FOTO DEL ASPIRANTE
        </h2>
        <p className="text-gray-500 text-sm">
          Toma una foto o sube una imagen clara de tu rostro para tu preficha.{' '}
          <span className="text-red-600 font-semibold">* Obligatoria para enviar la solicitud.</span>
        </p>
      </div>

      {/* ── Foto capturada ── */}
      {fotoPreview ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={fotoPreview}
              alt="Foto del aspirante"
              className="w-48 h-48 object-cover rounded-full
                         border-4 border-primary-500 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 bg-green-500 text-white
                             text-xs px-2 py-1 rounded-full">
              ✓ Lista
            </span>
          </div>
          <button
            type="button"
            onClick={resetearFoto}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            Cambiar foto
          </button>
        </div>

      ) : (
        <>
          {/* ── Botones de modo ── */}
          {!camaraActiva && (
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={activarCamara}
                className="flex flex-col items-center gap-2 p-6 border-2
                           border-dashed border-primary-300 rounded-xl
                           hover:border-primary-500 hover:bg-primary-50 transition w-40"
              >
                <span className="text-4xl">📷</span>
                <span className="text-sm font-medium text-primary-600">
                  Usar cámara
                </span>
              </button>

              <label className="flex flex-col items-center gap-2 p-6 border-2
                                border-dashed border-primary-300 rounded-xl
                                hover:border-primary-500 hover:bg-primary-50
                                transition w-40 cursor-pointer">
                <span className="text-4xl">🖼️</span>
                <span className="text-sm font-medium text-primary-600">
                  Subir foto
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleArchivo}
                />
              </label>
            </div>
          )}

          {/* ── Vista cámara ── */}
          {camaraActiva && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg
                              border-2 border-primary-500">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-80 h-60 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center
                                pointer-events-none">
                  <div className="w-36 h-44 border-2 border-white border-dashed
                                  rounded-full opacity-60" />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Centra tu rostro en el óvalo y presiona capturar
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={tomarFoto}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg
                             font-medium hover:bg-primary-600 transition"
                >
                  📸 Capturar foto
                </button>
                <button
                  type="button"
                  onClick={detenerCamara}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg
                             font-medium hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Canvas oculto para captura */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          ⚠️ {error}
        </div>
      )}

      {!fotoPreview && (
        <p className="text-center text-xs text-red-400 font-medium">
          ⚠️ Debes agregar tu foto para poder enviar la solicitud.
        </p>
      )}
    </div>
  )
}

export default FotoSection