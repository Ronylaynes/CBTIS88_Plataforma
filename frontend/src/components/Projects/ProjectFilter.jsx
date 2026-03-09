import { useState } from 'react'

const ProjectFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'innovation', label: 'Innovación Tecnológica' },
    { id: 'social', label: 'Impacto Social' },
    { id: 'awarded', label: 'Premiados' }
  ]

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId)
    onFilterChange(filterId)
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-md'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default ProjectFilter