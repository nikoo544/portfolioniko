import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Background3D from './components/Background3D'
import SocialBar from './components/SocialBar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Manga from './pages/Manga'
import Illustration from './pages/Illustration'
import Digital from './pages/Digital'

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

function App() {
  return (
    <Router>
      <CustomCursor />
      <Background3D />
      <Navigation />
      <SocialBar />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
