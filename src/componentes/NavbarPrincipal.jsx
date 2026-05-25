// src/componentes/NavbarPrincipal.jsx
import { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto';
import { supabase } from '../servicios/supabaseCliente';

export default function NavbarPrincipal() {
    const { usuario } = useAuth();
    const navegar = useNavigate();
    const ubicacionActual = useLocation(); // Para saber en qué página estamos

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [cerrandoSesion, setCerrandoSesion] = useState(false);

    const abrirModal = () => setMostrarConfirmacion(true);
    const cerrarModal = () => setMostrarConfirmacion(false);

    const manejarCierreSesion = async () => {
        cerrarModal();
        setCerrandoSesion(true);

        setTimeout(async () => {
            await supabase.auth.signOut();
            setCerrandoSesion(false);
            navegar('/login');
        }, 1500);
    };

    return (
        <>
            {/* Agregamos navbar-moderna, py-3 para más altura y fixed="top" para que flote */}
            <Navbar variant="dark" expand="lg" className="navbar-moderna py-3 z-3">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-white d-flex align-items-center">
                        <span className="text-primary me-1">Do</span>'it
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-3">
                            {usuario ? (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/perfil"
                                        className={`enlace-nav ${ubicacionActual.pathname === '/perfil' ? 'activo' : ''}`}
                                    >
                                        Mi Perfil
                                    </Nav.Link>

                                    <Button
                                        as={Link}
                                        to="/publicar"
                                        className="btn-publicar rounded-pill px-4 py-2 mx-lg-2 my-2 my-lg-0"
                                    >
                                        + Publicar Trabajo
                                    </Button>

                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        onClick={abrirModal}
                                        className="rounded-pill px-4 py-2 border-secondary text-secondary hover-white"
                                    >
                                        Salir
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="primary"
                                    className="rounded-pill px-5 py-2 fw-bold shadow-sm"
                                >
                                    Ingresar
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* MODAL DE CONFIRMACIÓN (Se mantiene igual) */}
            <Modal show={mostrarConfirmacion} onHide={cerrarModal} centered contentClassName="bg-dark text-light border-secondary">
                <Modal.Header closeButton className="border-secondary">
                    <Modal.Title className="fw-bold">¿Cerrar sesión?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fs-5 text-center py-4">
                    ¿Estás seguro que deseas salir de tu cuenta en Do'it?
                </Modal.Body>
                <Modal.Footer className="border-secondary d-flex justify-content-center gap-2">
                    <Button variant="secondary" onClick={cerrarModal} className="rounded-pill px-4">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={manejarCierreSesion} className="rounded-pill px-4">
                        Sí, salir
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* PANTALLA DE DESPEDIDA (Se mantiene igual) */}
            {cerrandoSesion && (
                <div className="overlay-despedida animacion-fade">
                    <div className="animacion-escala text-center">
                        <div className="text-secondary mb-3">
                            <Spinner animation="border" variant="primary" />
                        </div>
                        <h2 className="text-light fw-bold">¡Hasta pronto!</h2>
                        <p className="text-secondary fs-5">Cerrando tu sesión de forma segura...</p>
                    </div>
                </div>
            )}
        </>
    );
}