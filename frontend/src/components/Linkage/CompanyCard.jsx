const CompanyCard = ({ name, initials, color, sector, description }) => {
  return (
    <div className="card group hover:shadow-xl transition-all duration-300">

      {/* Logo con iniciales */}
      <div className={`${color} w-20 h-20 rounded-2xl flex items-center
                      justify-center mb-4 md:mb-6 mx-auto shadow-md
                      group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-white font-bold text-xl md:text-2xl text-center
                         leading-tight px-1">
          {initials}
        </span>
      </div>

      <h3 className="text-sm md:text-base font-bold text-neutral-900
                     mb-2 text-center leading-tight">
        {name}
      </h3>

      <span className="inline-block bg-gold-100 text-gold-700 px-3 py-1
                       rounded-full text-xs font-medium mb-3 mx-auto
                       block w-fit">
        {sector}
      </span>

      <p className="text-neutral-600 text-center text-xs md:text-sm
                    leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default CompanyCard