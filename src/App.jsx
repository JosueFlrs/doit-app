// Archivo principal de la aplicación React. Configura el enrutamiento utilizando React Router para mostrar diferentes componentes según la URL. Incluye un Navbar que se muestra en todas las páginas y define rutas para la página de inicio (Home) y la página de publicación (Publicar).

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexto/AuthContexto';
import NavbarPrincipal from './componentes/NavbarPrincipal';
import Home from './paginas/Home';
import Publicar from './paginas/Publicar';
import Login from './paginas/Login'; 
import Perfil from './paginas/Perfil';
import RutaPrivada from './componentes/RutaPrivada';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarPrincipal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publicar" element={<RutaPrivada><Publicar /></RutaPrivada>} />
          <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;