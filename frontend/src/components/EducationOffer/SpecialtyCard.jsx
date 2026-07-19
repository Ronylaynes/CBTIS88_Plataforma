// frontend/src/components/EducationOffer/SpecialtyCard.jsx

const AREA_COLORS = {
  'Industrial y de Energía': { icon: '#E6F1FB', dot: '#378ADD' },
  'Tecnología':              { icon: '#F1EFE8', dot: '#888780' },
  'Nuevas Carreras':         { icon: '#EEEDFE', dot: '#534AB7' },
}

const BADGE_STYLES = {
  'Turno matutino':  'bg-blue-50  text-blue-800',
  'Turno vespertino':'bg-neutral-100 text-neutral-600',
  '¡Nueva!':         'bg-purple-50 text-purple-800',
}

const SpecialtyCard = ({ icon, title, description, features = [], badge, area }) => {
  const colors = AREA_COLORS[area] || { icon: '#F5F5F5', dot: '#888' }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden
                    flex flex-col hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300">

      {/* Encabezado */}
      <div className="p-5 pb-4 flex flex-col gap-2">

        {/* Ícono */}
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl"
          style={{ background: colors.icon }}
        >
          {icon}
        </div>

        {/* Badge (turno / nueva) — solo si existe */}
        {badge && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${BADGE_STYLES[badge] ?? 'bg-gray-100 text-gray-700'}`}>
            {badge}
          </span>
        )}

        {/* Título */}
        <h3 className="text-base font-semibold text-neutral-900 leading-snug">
          {title}
        </h3>
      </div>

      {/* Descripción */}
      <p className="text-sm text-neutral-500 leading-relaxed px-5 pb-4 flex-1">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <div className="border-t border-neutral-100 px-5 py-4 flex flex-col gap-2">
          {features.map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-xs text-neutral-500">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: colors.dot }}
              />
              {feat}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SpecialtyCard