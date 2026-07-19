// frontend/src/components/Teachers/TeacherDirectory.jsx
import { useState } from 'react'
import TeacherCard from './TeacherCard'
import { FaSearch } from 'react-icons/fa'

const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

const staff = {

  // ── Administrativo ────────────────────────────────────────
  // Removidos: GOMEZ RAMOS HELION (pasó a apoyo)
  administrativo: [
    { id: 'adm-0',  name: 'Ángel Antonio Zavala Morales',                          specialty: 'Director de la Institución',  email: 'direccion@cbtis88.edu.mx' },
    { id: 'adm-1',  name: toTitleCase('AGUIAR MEJIA RAFAEL'),                      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-2',  name: toTitleCase('ARIAS FIGUEROA AMADO'),                     specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-3',  name: toTitleCase('BALLINAS LARIOS DEYSY ROXANA'),             specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-4',  name: toTitleCase('BAMACA AGUILAR ALEJANDRO ANGEL'),           specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-5',  name: toTitleCase('CASTELLANOS VELA LUIS ALBERTO'),            specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-6',  name: toTitleCase('CRUZ HERNANDEZ ALONSO'),                    specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-7',  name: toTitleCase('DE LEON BRAVO LUIS ALONSO'),                specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-8',  name: toTitleCase('DIAZ MEJIA ERNESTO'),                       specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-9',  name: toTitleCase('ESPINOSA BECERRA ARMANDO'),                 specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-10', name: toTitleCase('FLORES CIFUENTES ROXANA'),                  specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-11', name: toTitleCase('GALVEZ GONZALEZ DANITZA CORINA'),           specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-12', name: toTitleCase('LARA VALDEZ LESTHER ANTONIO'),              specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-13', name: toTitleCase('LOPEZ MARROQUIN CLAUDIA PATRICIA'),         specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-14', name: toTitleCase('LOPEZ ROMAN GABRIEL'),                      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-15', name: toTitleCase('MARROQUIN PEREZ GUADALUPE DEL CARMEN'),     specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-16', name: toTitleCase('MARROQUIN PEREZ JUAN FRANCISCO'),           specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-17', name: toTitleCase('MORENO ALVAREZ MARIO'),                     specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-18', name: toTitleCase('MORGA FLORES DIDIER'),                      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-19', name: toTitleCase('OJIRA FUENTES DIEGO'),                      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-20', name: toTitleCase('PATATUCHI RODRIGUEZ AMERICA JULIANA'),      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-21', name: toTitleCase('PERAL FIGUEROA FRANCISCO MANUEL'),          specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-22', name: toTitleCase('RAMIREZ ZUÑIGA SILVESTRE'),                 specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-23', name: toTitleCase('RAMOS ESCALANTE JOSE MIGUEL'),              specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-24', name: toTitleCase('RIOS MENDEZ JUAN GABRIEL'),                 specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-25', name: toTitleCase('RIZO BARAJAS KARINA'),                      specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-26', name: toTitleCase('ROSALES BARRIOS MARIA GUADALUPE'),          specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-27', name: toTitleCase('SANCHEZ BECERRA MANUEL ALEJANDRO'),         specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-28', name: toTitleCase('SIBAJA FLORES MANUELA DEL CARMEN'),         specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-29', name: toTitleCase('TELLES GOMEZ HUMBERTO'),                    specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-30', name: toTitleCase('TERCERO MORALES GERARDO'),                  specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-31', name: toTitleCase('VAZQUEZ MONZON ADALBERTO'),                 specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-32', name: toTitleCase('VELAZQUEZ FIGUEROA DANIEL'),                specialty: 'Personal Administrativo',     email: '' },
    { id: 'adm-33', name: toTitleCase('VELAZQUEZ HERNANDEZ CLAUDIA PATRICIA'),     specialty: 'Personal Administrativo',     email: '' },
  ],

  // ── Docentes ──────────────────────────────────────────────
  // Removidos:
  //   CORZO VELAZQUEZ DAISY ARAIDY
  //   GALDAMEZ MARTINEZ RODOLFO ALFREDO
  //   GARCIA PAEZ ESTHER
  //   MENDEZ GONZALEZ RANDOLPH
  //   OVANDO NORIEGA GUILLERMO IGNACIO
  //   PANTOJA MONTERROSA ANDRES
  //   PEREZ AVENDAÑO ANGEL EDUARDO
  //   REYES MUÑOZ MARCONI
  docente: [
    { id: 1,  name: toTitleCase('AGUILAR CORDOVA SERGIO LUIS'),           specialty: 'Docente', email: '' },
    { id: 2,  name: toTitleCase('ALBORES CASTRO NATALY NAVIL'),           specialty: 'Docente', email: '' },
    { id: 3,  name: toTitleCase('ALFARO GARCIA ARTURO'),                  specialty: 'Docente', email: '' },
    { id: 4,  name: toTitleCase('BERNSTORFF SANCHEZ MERCEDES LUCIA'),     specialty: 'Docente', email: '' },
    { id: 5,  name: toTitleCase('CASTELLANOS PEREZ MANUEL ANTONIO'),      specialty: 'Docente', email: '' },
    { id: 6,  name: toTitleCase('CERDIO CABAÑAS MARCELA'),                specialty: 'Docente', email: '' },
    { id: 7,  name: toTitleCase('CHANG REYNA MIGUEL ANGEL'),              specialty: 'Docente', email: '' },
    { id: 8,  name: toTitleCase('COUTIÑO DE LOS SANTOS XOCHITL'),         specialty: 'Docente', email: '' },
    { id: 9,  name: toTitleCase('CRISTOBAL PAREDES MARIA EVELIA'),        specialty: 'Docente', email: '' },
    { id: 10, name: toTitleCase('DE LOS SANTOS MENDEZ CRISTIAN'),         specialty: 'Docente', email: '' },
    { id: 11, name: toTitleCase('FUENTES SANCHEZ DELFINO'),               specialty: 'Docente', email: '' },
    { id: 12, name: toTitleCase('GARCIA GARCIA MIGUEL FRANCISCO'),        specialty: 'Docente', email: '' },
    { id: 13, name: toTitleCase('GONZALEZ MEJIA ANDREA'),                 specialty: 'Docente', email: '' },
    { id: 14, name: toTitleCase('GONZZALI TOMASSINI MIGUEL GUSTAVO'),     specialty: 'Docente', email: '' },
    { id: 15, name: toTitleCase('GORDILLO ESCOBAR TERESITA DE JESUS'),    specialty: 'Docente', email: '' },
    { id: 16, name: toTitleCase('GUTIEREZ CRUZ JORGE DEMIAN'),            specialty: 'Docente', email: '' },
    { id: 17, name: toTitleCase('HERRERA CRUZ EDGARDO ELEAZAR'),          specialty: 'Docente', email: '' },
    { id: 18, name: toTitleCase('HUYS ORDAZ MONICA'),                     specialty: 'Docente', email: '' },
    { id: 19, name: toTitleCase('INCHAUSTEGUI ARIAS JOSE LUIS'),          specialty: 'Docente', email: '' },
    { id: 20, name: toTitleCase('LARA PAZ JUAN OSCAR'),                   specialty: 'Docente', email: '' },
    { id: 21, name: toTitleCase('MENDEZ ZAMORA JUAN MANUEL'),             specialty: 'Docente', email: '' },
    { id: 22, name: toTitleCase('MONTELONGO ORELLA DANIEL'),              specialty: 'Docente', email: '' },
    { id: 23, name: toTitleCase('MORALES MEJIA CECILIA'),                 specialty: 'Docente', email: '' },
    { id: 24, name: toTitleCase('ORTEGA LOPEZ FELIPE DE JESUS'),          specialty: 'Docente', email: '' },
    { id: 25, name: toTitleCase('PALOMEQUE BECERRA CIRO EDUARDO'),        specialty: 'Docente', email: '' },
    { id: 26, name: toTitleCase('PEÑA PEREZ EDUARDO'),                    specialty: 'Docente', email: '' },
    { id: 27, name: toTitleCase('RAMOS MENDOZA BELMAR'),                  specialty: 'Docente', email: '' },
    { id: 28, name: toTitleCase('RAMOS SOLIS FANNY DEL CARMEN'),          specialty: 'Docente', email: '' },
    { id: 29, name: toTitleCase('RAMOS SUSTAITA BRENDA AYDEE'),           specialty: 'Docente', email: '' },
    { id: 30, name: toTitleCase('REYNA AREVALO JESUS EDUARDO'),           specialty: 'Docente', email: '' },
    { id: 31, name: toTitleCase('ROBLERO HERNANDEZ EDGAR'),               specialty: 'Docente', email: '' },
    { id: 32, name: toTitleCase('RODRIGUEZ DE LA CRUZ ELIAS'),            specialty: 'Docente', email: '' },
    { id: 33, name: toTitleCase('RODRIGUEZ MAZARIEGOS LEONARDO DANIEL'),  specialty: 'Docente', email: '' },
    { id: 34, name: toTitleCase('RODRIGUEZ VARGAS MARTHA ELISA'),         specialty: 'Docente', email: '' },
    { id: 35, name: toTitleCase('ROMERO PEREZ MARIA ESTHER'),             specialty: 'Docente', email: '' },
    { id: 36, name: toTitleCase('SANTIAGO CABRERA ERIKA VICTORIA'),       specialty: 'Docente', email: '' },
    { id: 37, name: toTitleCase('SANTIAGO RODRIGUEZ CARLOS ALBERTO'),     specialty: 'Docente', email: '' },
    { id: 38, name: toTitleCase('VAZQUEZ MONZON KARLA JANETH'),           specialty: 'Docente', email: '' },
    { id: 39, name: toTitleCase('VELASCO ALVAREZ LIMBERG'),               specialty: 'Docente', email: '' },
    { id: 40, name: toTitleCase('VELAZQUEZ HERNANDEZ JOSE ANGEL'),        specialty: 'Docente', email: '' },
    { id: 41, name: toTitleCase('VIDAL FLORES MARIA ANTONIETA'),          specialty: 'Docente', email: '' },
    { id: 42, name: toTitleCase('VILLARREAL WONG FELIPE'),                specialty: 'Docente', email: '' },
    { id: 43, name: toTitleCase('VILLARREAL WONG ANAMIM'),                specialty: 'Docente', email: '' },
    { id: 44, name: toTitleCase('ZAMUDIO ARAUJO AMANDA'),                 specialty: 'Docente', email: '' },
    { id: 45, name: toTitleCase('ZAPATA GRAJALES RAFAEL AUGUSTO'),        specialty: 'Docente', email: '' },
  ],

  // ── Personal de Apoyo ─────────────────────────────────────
  // Sección nueva
  apoyo: [
    { id: 'apo-1', name: toTitleCase('ROSALES RUIZ MIGUEL ANGEL'),         specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-2', name: toTitleCase('PERAL FIGUEROA FRANCISCO MANUEL'),   specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-3', name: toTitleCase('LOPEZ MARROQUIN CLAUDIA PATRICIA'),  specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-4', name: toTitleCase('DIAZ MEJIA ERNESTO'),                specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-5', name: toTitleCase('ESPINOSA BECERRA ARMANDO'),          specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-6', name: toTitleCase('DE LEON BRAVO LUIS ALONSO'),         specialty: 'Personal de Apoyo', email: '' },
    { id: 'apo-7', name: toTitleCase('BAMACA AGUILAR ALEJANDRO ANGEL'),    specialty: 'Personal de Apoyo', email: '' },
  ],
}

const TABS = [
  { id: 'docente',        label: 'Cuerpo Docente',          color: 'primary' },
  { id: 'administrativo', label: 'Personal Administrativo', color: 'gold'    },
  { id: 'apoyo',          label: 'Personal de Apoyo',       color: 'apoyo'   },
]

const TeacherDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab,  setActiveTab]  = useState('docente')

  const allStaff     = [...staff.docente, ...staff.administrativo, ...staff.apoyo]
  const filteredStaff = allStaff.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const isSearching = searchTerm.trim() !== ''

  const tabColor = {
    primary: { active: 'border-primary-500 text-primary-500', hover: 'hover:text-primary-500' },
    gold:    { active: 'border-gold-500 text-gold-500',       hover: 'hover:text-gold-500'    },
    apoyo:   { active: 'border-green-600 text-green-600',     hover: 'hover:text-green-600'   },
  }

  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Directorio del CBTIS 88</h2>

        {/* Barra de búsqueda */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar personal..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-field pl-12 w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {isSearching ? (
          <section>
            <h3 className="text-2xl font-bold mb-6 text-primary-500 border-b-2 border-primary-500 inline-block">
              Resultados de la búsqueda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map(person => (
                <TeacherCard key={person.id} {...person} />
              ))}
            </div>
            {filteredStaff.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-lg">No se encontró personal con ese nombre.</p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-10 border-b border-neutral-200 overflow-x-auto">
              {TABS.map(tab => {
                const c = tabColor[tab.color]
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-4 text-base font-semibold border-b-2 transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? c.active
                        : `border-transparent text-neutral-500 ${c.hover}`
                    }`}
                  >
                    {tab.label} ({staff[tab.id].length})
                  </button>
                )
              })}
            </div>

            {/* Grid del tab activo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff[activeTab].map(person => (
                <TeacherCard key={person.id} {...person} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TeacherDirectory