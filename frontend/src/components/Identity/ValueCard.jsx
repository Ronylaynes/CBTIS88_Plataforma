const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="card group hover:border-gold-400 border-2 border-transparent">
      <div className="text-gold-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
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

export default ValueCard