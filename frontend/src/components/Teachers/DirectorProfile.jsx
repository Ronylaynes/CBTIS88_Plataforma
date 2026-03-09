const DirectorProfile = ({ name, photo, position, message }) => {
  return (
    <div className="card lg:flex items-center gap-8 bg-gradient-to-br from-primary-50 to-gold-50">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 mx-auto lg:mx-0 flex-shrink-0 overflow-hidden">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 mt-6 lg:mt-0">
        <h3 className="text-3xl font-bold text-neutral-900 mb-2">
          {name}
        </h3>
        <p className="text-xl text-primary-600 font-semibold mb-6">
          {position}
        </p>
        <p className="text-neutral-700 leading-relaxed italic">
          "{message}"
        </p>
      </div>
    </div>
  )
}

export default DirectorProfile