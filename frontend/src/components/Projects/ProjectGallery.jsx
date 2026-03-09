import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'

const ProjectGallery = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Sistema de Riego Inteligente',
      description: 'Sistema automatizado de riego con sensores IoT para optimizar el uso del agua en cultivos.',
      category: 'Innovación Tecnológica',
      team: 'Equipo Alpha',
      date: '2024',
      award: 'Primer Lugar Regional',
      type: 'innovation'
    },
    {
      id: 2,
      title: 'App de Apoyo Escolar',
      description: 'Aplicación móvil para facilitar el aprendizaje colaborativo entre estudiantes.',
      category: 'Impacto Social',
      team: 'Dev Team',
      date: '2024',
      type: 'social'
    },
    {
      id: 3,
      title: 'Robot de Reciclaje',
      description: 'Robot autónomo para clasificación automática de residuos reciclables.',
      category: 'Innovación Tecnológica',
      team: 'Robotics 88',
      date: '2023',
      award: 'Mención Honorífica',
      type: 'awarded'
    }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.type === filter)

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        <h2 className="section-title">Nuestros Proyectos</h2>
        <ProjectFilter onFilterChange={setFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectGallery