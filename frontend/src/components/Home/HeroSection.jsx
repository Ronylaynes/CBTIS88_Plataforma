import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section className="relative gradient-bg text-white overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-10" />

      <div className="container-custom px-4 relative z-10">
        <div className="min-h-[480px] md:min-h-[600px] flex items-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12
                          items-center w-full">

            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                              font-bold leading-tight">
                Bienvenidos al{' '}
                <span className="text-gold-300">CBTIS No. 88</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gold-100">
                Formando el Futuro
              </p>
              <p className="text-base md:text-lg text-neutral-100
                            max-w-xl mx-auto lg:mx-0">
                Formamos técnicos bachilleres altamente capacitados,
                comprometidos con la innovación y el desarrollo tecnológico
                de nuestra región.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4
                              pt-2 md:pt-4 justify-center lg:justify-start">
                <Link to="/preficha"
                  className="btn-secondary inline-flex items-center
                             justify-center gap-2 group text-sm md:text-base">
                  <span>Iniciar Preinscripción</span>
                  <FaArrowRight className="group-hover:translate-x-1
                                           transition-transform" />
                </Link>
                <Link to="/oferta-educativa"
                  className="btn-outline bg-white/10 backdrop-blur-sm
                             hover:bg-white hover:text-primary-500
                             border-white inline-flex items-center
                             justify-center text-sm md:text-base">
                  Ver Especialidades
                </Link>
              </div>
            </div>

            {/* Escudo sin fondo blanco */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gold-400 rounded-full
                                blur-3xl opacity-20" />
                <div className="relative w-full h-72 lg:h-96 bg-white/10
                                backdrop-blur-sm rounded-2xl flex
                                items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-44 h-44 rounded-full border-4
                                    border-gold-400 overflow-hidden
                                    flex items-center justify-center
                                    shadow-2xl mx-auto">
                      <img
                        src="/assets/cbtis_88.png"
                        alt="Escudo CBTIS 88"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                    <p className="text-xl font-semibold">Excelencia Académica</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60
                   720 65C840 70 960 80 1080 85C1200 90 1320 90 1380
                   90L1440 90V120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection