
import { Outlet } from 'react-router-dom'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import ChatButton from '@components/common/ChatButton'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}

export default MainLayout