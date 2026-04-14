import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto';

export default function NavbarPrincipal() {
    const ubicacion = useLocation();
    const navegar = useNavigate();
    const { usuario, cerrarSesion } = useAuth();

    const manejarCierreSesion = async () => {
        await cerrarSesion();
        navegar('/login');
    };

    return (
        < Navbar expand="lg" sticky="top" className="custom-navbar py-3 mb-4" >
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary" style={{ letterSpacing: '-1px' }}>
                    Do'it
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none" data-bs-theme="dark" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto ms-lg-4">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-medium px-3 nav-enlace ${ubicacion.pathname === '/' ? 'activo' : ''}`}
                        >
                            Explorar trabajos
                        </Nav.Link>
                    </Nav>

                    <Nav className="align-items-center gap-3 mt-3 mt-lg-0">
                        {usuario ? (
                            <>
                                <Button
                                    as={Link}
                                    to="/perfil"
                                    variant="outline-light"
                                    className="rounded-pill px-4 fw-medium border-opacity-25"
                                >
                                    Mi Perfil
                                </Button>

                                <Button
                                    as={Link}
                                    to="/publicar"
                                    variant="primary"
                                    className="rounded-pill px-4 fw-bold shadow-sm"
                                >
                                    + Publicar
                                </Button>

                                <Button
                                    variant="link"
                                    className="text-secondary text-decoration-none p-0 ms-2 nav-enlace"
                                    onClick={manejarCierreSesion}
                                >
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <Button
                                as={Link}
                                to="/login"
                                variant="primary"
                                className="rounded-pill px-4 fw-bold shadow-sm"
                            >
                                Comenzar ahora
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}