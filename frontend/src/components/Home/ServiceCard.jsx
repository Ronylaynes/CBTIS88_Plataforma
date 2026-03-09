const ServiceCard = ({ icon, title, description, bgColor, iconColor }) => {
  return (
    <div className="card group cursor-pointer">
      <div className={`${bgColor} ${iconColor} w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3 text-center">
        {title}
      </h3>
      <p className="text-neutral-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default ServiceCard