// Página de Login que permite a los usuarios iniciar sesión o registrarse utilizando Supabase. Contiene un formulario con campos para correo electrónico y contraseña y un botón para alternar entre el modo de inicio de sesión y registro. Al enviar el formulario se conecta a Supabase para autenticar al usuario o crear una nueva cuenta y maneja los errores que puedan surgir durante el proceso.

import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Tabs, Tab } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const [pestañaActiva, setPestañaActiva] = useState('login'); // Controla qué pestaña está abierta
    const navegar = useNavigate();

    // Función exclusiva para Iniciar Sesión
    const manejarLogin = async (e) => {
        e.preventDefault();
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: contrasena,
        });

        if (error) setError('Credenciales incorrectas o usuario no registrado.');
        else navegar('/');
    };

    // Función exclusiva para Registrarse
    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError(null);
        const { error } = await supabase.auth.signUp({
            email: correo,
            password: contrasena,
        });

        if (error) setError(error.message);
        else navegar('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '450px' }} className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 fw-bold text-primary">Do'it</h2>

                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    {/* Componente de Pestañas de Bootstrap */}
                    <Tabs
                        id="tabs-autenticacion"
                        activeKey={pestañaActiva}
                        onSelect={(k) => {
                            setPestañaActiva(k);
                            setError(null); // Limpiamos errores si cambia de pestaña
                            setCorreo('');  // Opcional: limpiar los campos
                            setContrasena('');
                        }}
                        className="mb-4 nav-fill" // nav-fill hace que ocupen el 50% cada una
                    >
                        {/* ---------------- PESTAÑA 1: INICIAR SESIÓN ---------------- */}
                        <Tab eventKey="login" title="Iniciar Sesión">
                            <Form onSubmit={manejarLogin}>
                                <Form.Group className="mb-3" controlId="correoLogin">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="contrasenaLogin">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Tu contraseña"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 fw-bold">
                                    Ingresar a mi cuenta
                                </Button>
                            </Form>
                        </Tab>

                        {/* ---------------- PESTAÑA 2: CREAR CUENTA ---------------- */}
                        <Tab eventKey="registro" title="Crear Cuenta">
                            <Form onSubmit={manejarRegistro}>
                                <Form.Group className="mb-3" controlId="correoRegistro">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Usa un correo válido"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Nunca compartiremos tu correo con nadie más.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="contrasenaRegistro">
                                    <Form.Label>Elige una Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Mínimo 6 caracteres"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 fw-bold">
                                    Registrarme en Do'it
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>

                </Card.Body>
            </Card>
        </Container>
    );
}