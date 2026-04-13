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
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 mb-4 border-bottom border-secondary border-opacity-25">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary" style={{ letterSpacing: '-1px' }}>
                    Do'it
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto ms-lg-4">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-medium px-3 ${ubicacion.pathname === '/' ? 'text-primary' : 'text-secondary'}`}
                        >
                            Explorar trabajos
                        </Nav.Link>
                    </Nav>

                    <Nav className="align-items-center gap-2 mt-3 mt-lg-0">
                        {usuario ? (
                            <>
                                <Button
                                    as={Link}
                                    to="/perfil"
                                    variant="light"
                                    className="rounded-pill px-4 fw-medium text-secondary"
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
                                    className="text-muted text-decoration-none p-0 ms-2"
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
        </Navbar>
    );
}