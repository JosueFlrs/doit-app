// Página de Login que permite a los usuarios iniciar sesión o registrarse utilizando Supabase. Contiene un formulario con campos para correo electrónico y contraseña y un botón para alternar entre el modo de inicio de sesión y registro. Al enviar el formulario se conecta a Supabase para autenticar al usuario o crear una nueva cuenta y maneja los errores que puedan surgir durante el proceso.

import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [esRegistro, setEsRegistro] = useState(false); // Para alternar entre Login y Registro
    const [error, setError] = useState(null);
    const navegar = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError(null);

        let resultado;

        if (esRegistro) {
            // Registrar nuevo usuario
            resultado = await supabase.auth.signUp({
                email: correo,
                password: contrasena,
            });
        } else {
            // Iniciar sesión existente
            resultado = await supabase.auth.signInWithPassword({
                email: correo,
                password: contrasena,
            });
        }

        if (resultado.error) {
            setError(resultado.error.message);
        } else {
            // Si todo sale bien, lo mandamos al inicio
            navegar('/');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '400px' }} className="shadow-sm">
                <Card.Body>
                    <h2 className="text-center mb-4">
                        {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={manejarEnvio}>
                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="contrasena">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            {esRegistro ? 'Registrarme' : 'Ingresar'}
                        </Button>
                    </Form>

                    <div className="text-center">
                        <Button
                            variant="link"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            {esRegistro
                                ? '¿Ya tienes cuenta? Inicia sesión aquí'
                                : '¿No tienes cuenta? Regístrate aquí'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}