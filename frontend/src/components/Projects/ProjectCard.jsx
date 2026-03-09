import { FaUsers, FaCalendar, FaTrophy } from 'react-icons/fa'

const ProjectCard = ({ title, description, image, category, team, date, award }) => {
  return (
    <div className="card overflow-hidden p-0">
      <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span className="text-6xl font-bold opacity-30">88</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="inline-block bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
          {category}
        </span>
        {award && (
          <div className="flex items-center text-yellow-600 mb-2">
            <FaTrophy className="mr-2" />
            <span className="text-sm font-semibold">{award}</span>
          </div>
        )}
        <h3 className="text-xl font-bold text-neutral-900 mb-3">
          {title}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t">
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            <span>{team}</span>
          </div>
          <div className="flex items-center">
            <FaCalendar className="mr-2" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard