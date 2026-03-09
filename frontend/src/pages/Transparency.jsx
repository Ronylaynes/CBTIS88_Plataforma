import DocumentList from '@components/Transparency/DocumentList'
import ReportViewer from '@components/Transparency/ReportViewer'

const Transparency = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Transparencia</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Acceso a información pública, reportes y documentos oficiales del CBTIS No. 88.
          </p>
        </div>
      </section>

      <DocumentList />
      <ReportViewer />

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="card bg-primary-50">
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Compromiso con la Transparencia
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              En CBTIS No. 88 creemos en la transparencia y rendición de cuentas como 
              principios fundamentales de nuestra gestión institucional. Todos los documentos 
              y reportes están disponibles para consulta pública, garantizando el derecho 
              de acceso a la información de nuestra comunidad educativa y la sociedad en general.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Transparency