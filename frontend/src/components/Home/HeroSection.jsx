import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <section className="relative gradient-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-grid opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="min-h-[600px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Bienvenidos al <span className="text-gold-300">CBTIS No. 88</span>
              </h1>
              <p className="text-xl md:text-2xl text-gold-100">
                Formando el Futuro
              </p>
              <p className="text-lg text-neutral-100 max-w-xl">
                Formamos técnicos bachilleres altamente capacitados, comprometidos con la 
                innovación y el desarrollo tecnológico de nuestra región.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/preficha"
                  className="btn-secondary inline-flex items-center justify-center space-x-2 group"
                >
                  <span>Iniciar Preinscripción</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/oferta-educativa"
                  className="btn-outline bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-500 border-white inline-flex items-center justify-center"
                >
                  Conoce Nuestras Especialidades
                </Link>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="hidden lg:block animate-slide-down">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-400 rounded-full blur-3xl opacity-20"></div>
                <img 
                  src="/assets/images/hero-illustration.svg" 
                  alt="Estudiantes CBTIS 88"
                  className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                {/* Placeholder if image doesn't load */}
                <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-gold-500 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-6xl font-bold">88</span>
                    </div>
                    <p className="text-2xl font-semibold">Excelencia Académica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection