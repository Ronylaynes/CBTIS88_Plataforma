import { FaEnvelope, FaGraduationCap } from 'react-icons/fa'

const TeacherCard = ({ name, photo, specialty, degree, email }) => {
  return (
    <div className="card text-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 mx-auto mb-6 overflow-hidden">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">
        {name}
      </h3>
      <p className="text-primary-500 font-medium mb-3">
        {specialty}
      </p>
      <div className="flex items-center justify-center text-sm text-neutral-600 mb-3">
        <FaGraduationCap className="mr-2" />
        <span>{degree}</span>
      </div>
      {email && (
        <a 
          href={`mailto:${email}`}
          className="flex items-center justify-center text-sm text-gold-600 hover:text-gold-700 transition-colors"
        >
          <FaEnvelope className="mr-2" />
          <span>Contactar</span>
        </a>
      )}
    </div>
  )
}

export default TeacherCard