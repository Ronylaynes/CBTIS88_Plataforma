import { FaFilePdf, FaFileExcel, FaFileWord, FaDownload } from 'react-icons/fa'

const DocumentList = () => {
  const documents = [
    {
      id: 1,
      title: 'Plan de Trabajo Anual 2024',
      category: 'Planeación',
      date: '2024-01-15',
      type: 'pdf',
      size: '2.5 MB'
    },
    {
      id: 2,
      title: 'Presupuesto Institucional 2024',
      category: 'Finanzas',
      date: '2024-01-10',
      type: 'excel',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Informe de Actividades Primer Semestre',
      category: 'Informes',
      date: '2024-07-20',
      type: 'pdf',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'Reglamento Interno Actualizado',
      category: 'Normatividad',
      date: '2024-02-01',
      type: 'word',
      size: '850 KB'
    }
  ]

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf className="text-red-500" size={24} />
      case 'excel': return <FaFileExcel className="text-green-500" size={24} />
      case 'word': return <FaFileWord className="text-blue-500" size={24} />
      default: return <FaFilePdf className="text-neutral-500" size={24} />
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Documentos de Transparencia</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="card flex items-center justify-between hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 flex-1">
                {getFileIcon(doc.type)}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {doc.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {doc.category}
                    </span>
                    <span>{doc.date}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <button className="btn-outline flex items-center space-x-2 ml-4">
                <FaDownload />
                <span className="hidden md:inline">Descargar</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DocumentList