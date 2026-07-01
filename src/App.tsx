import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flexGrow: 1, paddingTop: '80px' }}>
        <Home />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
