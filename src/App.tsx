import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const elementId = pathname === '/' ? 'hero' : pathname.slice(1);
    const element = document.getElementById(elementId);
    
    if (element) {
      const yOffset = -80; // Offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToSection />
      <Navbar />
      <main style={{ flexGrow: 1, paddingTop: '80px' }}>
        <Home />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
