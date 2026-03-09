import React from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Footer from './components/common/Footer';

function App() {
  return (
    // Aquí definimos el fondo oscuro global
    <div className="min-h-screen bg-[#5D0A1F] text-white font-sans selection:bg-[#C59B40] selection:text-white">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App;