import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Studio from "./admin/Studio";

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

function Portfolio() {
  return (
    <>
      <ScrollToSection />
      <Navbar />
      <main style={{ flexGrow: 1, paddingTop: "80px" }}>
        <Home />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<Studio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
