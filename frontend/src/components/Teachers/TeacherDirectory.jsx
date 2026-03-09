import { useState } from 'react'
import TeacherCard from './TeacherCard'
import { FaSearch } from 'react-icons/fa'

const TeacherDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const teachers = [
    {
      id: 1,
      name: 'José de Jesús García',
      specialty: 'Programación',
      degree: 'Ingeniero en Sistemas',
      email: 'jgarcia@cbtis88.edu.mx'
    },
    {
      id: 2,
      name: 'Guadalupe Martínez',
      specialty: 'Electrónica',
      degree: 'Ingeniera Electrónica',
      email: 'gmartinez@cbtis88.edu.mx'
    },
    {
      id: 3,
      name: 'Eimer Sumayoa',
      specialty: 'Administración',
      degree: 'Licenciado en Administración',
      email: 'esumayoa@cbtis88.edu.mx'
    }
  ]

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Nuestro Cuerpo Docente</h2>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar maestros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} {...teacher} />
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">No se encontraron maestros.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherDirectory