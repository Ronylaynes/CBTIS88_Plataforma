import React from 'react';
import { Award, Users, Target } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="flex flex-col gap-4">
        
        {/* Tarjeta 1 */}
        <StatBar 
          icon={<Award size={32} />} 
          number="50+" 
          label="Años de Excelencia" 
        />

        {/* Tarjeta 2 */}
        <StatBar 
          icon={<Users size={32} />} 
          number="2000+" 
          label="Estudiantes Activos" 
        />

        {/* Tarjeta 3 */}
        <StatBar 
          icon={<Target size={32} />} 
          number="15+" 
          label="Especialidades" 
        />

      </div>
    </section>
  );
};

const StatBar = ({ icon, number, label }) => (
  <div className="bg-[#C59B40] rounded-xl p-6 flex flex-col items-center justify-center text-[#5D0A1F] shadow-lg hover:scale-[1.02] transition-transform cursor-default">
    <div className="mb-2 opacity-80">
      {icon}
    </div>
    <span className="text-4xl font-extrabold">{number}</span>
    <span className="font-semibold text-sm uppercase tracking-wide opacity-90">{label}</span>
  </div>
);

export default StatsSection;