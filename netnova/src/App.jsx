import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import AuthPage from './components/AuthPage'
import Dashboard from './components/Dashboard'
import ServiceDetail from './components/ServiceDetail'

function isLoggedIn() {
  return !!localStorage.getItem('nn_token')
}

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/auth" replace />
}

function GuestRoute({ children }) {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : children
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="glow-divider" />
      <Stats />
      <div className="glow-divider" />
      <Services />
      <About />
      <div className="glow-divider" />
      <Testimonials />
      <div className="glow-divider" />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/auth" element={<GuestRoute><AuthPage /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
