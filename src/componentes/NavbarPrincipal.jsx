// src/componentes/NavbarPrincipal.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto'; // <-- Importamos el hook

export default function NavbarPrincipal() {
    const ubicacion = useLocation();
    const navegar = useNavigate();
    const { usuario, cerrarSesion } = useAuth(); // <-- Obtenemos el usuario actual

    const manejarCierreSesion = async () => {
        await cerrarSesion();
        navegar('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    Do'it
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-principal" />

                <Navbar.Collapse id="navbar-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" active={ubicacion.pathname === '/'}>
                            Inicio
                        </Nav.Link>
                    </Nav>

                    <Nav className="align-items-center gap-3">
                        {usuario ? (
                            // Qué mostrar si el usuario SÍ inició sesión
                            <>
                                <Button as={Link} to="/perfil" variant="outline-light" size="sm">
                                    Mi Perfil
                                </Button>
                                <Button variant="outline-light" size="sm" onClick={manejarCierreSesion}>
                                    Salir
                                </Button>
                            </>
                        ) : (
                            // Qué mostrar si NO inició sesión
                            <Button as={Link} to="/login" variant="success" size="sm">
                                Ingresar / Registro
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}