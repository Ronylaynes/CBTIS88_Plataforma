import { FaClock, FaBook, FaCertificate } from 'react-icons/fa'

const ProgramInfo = () => {
  const info = [
    {
      icon: <FaClock size={30} />,
      title: 'Duración',
      description: '3 años (6 semestres)',
      color: 'bg-blue-500'
    },
    {
      icon: <FaBook size={30} />,
      title: 'Plan de Estudios',
      description: 'Modelo por competencias',
      color: 'bg-green-500'
    },
    {
      icon: <FaCertificate size={30} />,
      title: 'Certificación',
      description: 'Bachillerato + Título Técnico',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
        Información del Programa
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {info.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`${item.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {item.icon}
            </div>
            <h4 className="font-bold text-neutral-900 mb-2">{item.title}</h4>
            <p className="text-neutral-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgramInfo