import React from 'react';
import StatsSection from '../components/Home/StatsSection';
import { FileText, Shield, Mail, Handshake, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="pb-20">
      
      {/* SECCIÓN 1: BIENVENIDA (Hero) */}
      <section className="relative pt-20 pb-16 px-4 text-center">
        {/* Efecto de luz de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-[#5D0A1F] to-[#5D0A1F] -z-10"></div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Bienvenido al <span className="text-[#C59B40]">CBTIS No. 88</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
          Formando técnicos bachilleres altamente capacitados, comprometidos con la innovación y el desarrollo tecnológico.
        </p>
      </section>

      {/* SECCIÓN 2: GRID DE TARJETAS (Servicios) */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          
          <ServiceCard 
            icon={<FileText size={48} />}
            title="Política de Calidad Educativa"
            desc="Compromiso con la mejora continua de nuestros procesos académicos y administrativos."
          />

          <ServiceCard 
            icon={<Shield size={48} />}
            title="Cero Tolerancia al Acoso"
            desc="Promovemos un ambiente escolar seguro, respetuoso y libre de violencia."
          />

          <ServiceCard 
            icon={<Mail size={48} />}
            title="Buzón de Atención Estudiantil"
            desc="Canal directo para recibir tus dudas, sugerencias y comentarios."
          />

          <ServiceCard 
            icon={<Handshake size={48} />}
            title="Vinculación con el Sector"
            desc="Alianzas estratégicas para fortalecer tus prácticas profesionales."
          />

        </div>
      </section>

      {/* SECCIÓN 3: ESTADÍSTICAS (Barras Doradas) */}
      <StatsSection />
      
    </div>
  );
};

// Componente interno para las tarjetas (Estilo Glassmorphism Rojo)
const ServiceCard = ({ icon, title, desc }) => (
  <div className="group relative overflow-hidden bg-gradient-to-br from-[#700C26] to-[#4A0819] border border-[#C59B40]/30 rounded-2xl p-8 hover:border-[#C59B40] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,155,64,0.2)]">
    {/* Decoración de esquina */}
    <div className="absolute top-4 left-4 w-12 h-1 border-t-2 border-l-2 border-[#C59B40]/20 rounded-tl-lg group-hover:border-[#C59B40] transition-colors"></div>
    
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 text-[#C59B40] p-4 bg-[#5D0A1F] rounded-full shadow-inner border border-[#C59B40]/10">
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        {desc}
      </p>

      <button className="flex items-center gap-2 text-[#C59B40] font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all">
        Conoce más <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

export default Home;