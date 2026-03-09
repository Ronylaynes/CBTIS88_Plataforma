const SpecialtyCard = ({ title, description, icon, color, features }) => {
  return (
    <div className="card group">
      <div className={`${color} text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
        {title}
      </h3>
      <p className="text-neutral-600 text-center mb-6">
        {description}
      </p>
      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-neutral-700">
              <span className={`${color} w-2 h-2 rounded-full mr-3`}></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SpecialtyCard