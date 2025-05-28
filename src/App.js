import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import { AuthProvider } from './contexts/AuthContext';
import CategoriasAdmin from './pages/admin/CategoriasAdmin';
import ProdutosAdmin from './pages/admin/ProdutosAdmin';
import CategoriaPage from './pages/CategoriaPage'
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import Carrinho from './pages/Carrinho';

const App = () => {

  return (
    <CarrinhoProvider>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/categorias" element={<CategoriasAdmin />} />
            <Route path="/admin/produtos" element={<ProdutosAdmin />} />
            <Route path="/categoria/:nome" element={<CategoriaPage />} />
            <Route path="/produto/:nome" element={<ProdutoDetalhes />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CarrinhoProvider>
  )

}

export default App;
