// Archivo principal de la aplicación React. Configura el enrutamiento utilizando React Router para mostrar diferentes componentes según la URL. Incluye un Navbar que se muestra en todas las páginas y define rutas para la página de inicio (Home) y la página de publicación (Publicar).

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexto/AuthContexto'; // <-- Importamos el contexto
import NavbarPrincipal from './componentes/NavbarPrincipal';
import Home from './paginas/Home';
import Publicar from './paginas/Publicar';
import Login from './paginas/Login'; // <-- Importamos la nueva página
import Perfil from './paginas/Perfil';

function App() {
  return (
    <AuthProvider> {/* <-- Envolvemos toda la app */}
      <BrowserRouter>
        <NavbarPrincipal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;