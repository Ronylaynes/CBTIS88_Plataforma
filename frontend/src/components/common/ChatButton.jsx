import { useState } from 'react'
import { FaComments, FaTimes } from 'react-icons/fa'

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold-500 hover:bg-gold-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-pulse hover:animate-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 animate-scale-in">
          <div className="bg-primary-500 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat de Ayuda</h3>
            <p className="text-xs text-gold-200">Estamos aquí para ayudarte</p>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-neutral-50">
            <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
              <p className="text-sm text-neutral-700">
                ¡Hola! ¿En qué podemos ayudarte hoy?
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatButton