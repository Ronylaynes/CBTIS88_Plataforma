
const CompanyCard = ({ name, logo, sector, description }) => {
  return (
    <div className="card group">
      <div className="h-32 bg-neutral-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden group-hover:bg-neutral-200 transition-colors duration-300">
        {logo ? (
          <img src={logo} alt={name} className="max-h-20 max-w-full object-contain" />
        ) : (
          <span className="text-4xl font-bold text-neutral-400">{name.charAt(0)}</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">
        {name}
      </h3>
      <span className="inline-block bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-4 mx-auto">
        {sector}
      </span>
      <p className="text-neutral-600 text-center text-sm">
        {description}
      </p>
    </div>
  )
}

export default CompanyCard