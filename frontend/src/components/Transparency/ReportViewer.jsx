import { useState } from 'react'
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa'

const ReportViewer = () => {
  const [activeTab, setActiveTab] = useState('budget')

  const tabs = [
    { id: 'budget', label: 'Presupuesto', icon: <FaChartBar /> },
    { id: 'enrollment', label: 'Matrícula', icon: <FaChartPie /> },
    { id: 'performance', label: 'Desempeño', icon: <FaChartLine /> }
  ]

  const budgetData = [
    { category: 'Personal Docente', amount: '45%', value: '$4,500,000' },
    { category: 'Infraestructura', amount: '25%', value: '$2,500,000' },
    { category: 'Equipamiento', amount: '20%', value: '$2,000,000' },
    { category: 'Operación', amount: '10%', value: '$1,000,000' }
  ]

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom max-w-5xl">
        <h2 className="section-title">Reportes y Estadísticas</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'budget' && (
          <div className="card">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Distribución del Presupuesto 2024
            </h3>
            <div className="space-y-4">
              {budgetData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-neutral-700">{item.category}</span>
                    <span className="font-bold text-primary-600">{item.value}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-gold-500 h-full rounded-full transition-all duration-500"
                      style={{ width: item.amount }}
                    ></div>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'enrollment' && (
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Matrícula por Especialidad
            </h3>
            <p className="text-neutral-600">Datos de matrícula del ciclo escolar 2024-2025</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-blue-600 mb-2">450</p>
                <p className="text-neutral-700">Programación</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-green-600 mb-2">380</p>
                <p className="text-neutral-700">Electrónica</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-purple-600 mb-2">320</p>
                <p className="text-neutral-700">Administración</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Indicadores de Desempeño
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg">
                <p className="text-5xl font-bold text-primary-600 mb-2">92%</p>
                <p className="text-neutral-700 font-medium">Eficiencia Terminal</p>
              </div>
              <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-6 rounded-lg">
                <p className="text-5xl font-bold text-gold-600 mb-2">88%</p>
                <p className="text-neutral-700 font-medium">Aprobación</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ReportViewer