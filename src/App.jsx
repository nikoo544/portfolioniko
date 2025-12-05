import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import ClickEffects from './components/ClickEffects'
import SocialBar from './components/SocialBar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Manga from './pages/Manga'
import Illustration from './pages/Illustration'
import Digital from './pages/Digital'
import './components/LiquidTransition.css'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/illustration" element={<Illustration />} />
        <Route path="/digital" element={<Digital />} />
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper for the liquid effect
function PageWrapper({ children }) {
  return (
    <>
      <motion.div
        className="slide"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#fff',
          transformOrigin: 'top',
          zIndex: 200
        }}
      />
      <motion.div
        className="slide"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#fff',
          transformOrigin: 'bottom',
          zIndex: 200
        }}
      />
      {children}
    </>
  )
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <ClickEffects />
      <Navigation />
      <SocialBar />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
