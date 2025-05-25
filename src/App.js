import NavBar from './components/layout/NavBar';
import Container from './components/layout/Container'
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Camisetas from './pages/Camisetas';
import Blusas from './pages/Blusas';
import Calcas from './pages/Calcas';
import Moletom from './pages/Moletom';
import CamisaPolo from './pages/CamisaPolo';
import Login from './pages/admin/Login';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camisetas" element={<Camisetas />} />
          <Route path="/blusas" element={<Blusas />} />
          <Route path="/calcas" element={<Calcas />} />
          <Route path="/moletom" element={<Moletom />} />
          <Route path="/camisapolo" element={<CamisaPolo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )

}

export default App;
