import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Tabs, Tab, Spinner } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useNavigate } from 'react-router-dom';

import { useMunicipios } from '../hooks/useMunicipios';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [datosRegistro, setDatosRegistro] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: ''
    });

    const [errorLogin, setErrorLogin] = useState(null);
    const [erroresValidacion, setErroresValidacion] = useState([]);
    const [pestañaActiva, setPestañaActiva] = useState('login');
    const [estadoRegistro, setEstadoRegistro] = useState('inactivo');

    const navegar = useNavigate();

    const { municipios, cargando: cargandoApi, error: errorApi } = useMunicipios();

    const validarRegistro = () => {
        const errores = [];
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regexNumeros = /^[0-9]+$/;

        if (!datosRegistro.nombre.trim() || !regexLetras.test(datosRegistro.nombre)) {
            errores.push("El nombre debe ser real y contener solo letras.");
        }
        if (!datosRegistro.apellido.trim() || !regexLetras.test(datosRegistro.apellido)) {
            errores.push("El apellido debe contener solo letras.");
        }
        if (!datosRegistro.telefono.trim() || !regexNumeros.test(datosRegistro.telefono) || datosRegistro.telefono.length < 8) {
            errores.push("El teléfono debe contener solo números (mínimo 8 dígitos).");
        }
        if (!datosRegistro.direccion || datosRegistro.direccion === "Selecciona un municipio...") {
            errores.push("Debes seleccionar una Zona/Ciudad válida de la lista.");
        }
        if (contrasena.length < 6) {
            errores.push("La contraseña debe tener al menos 6 caracteres por seguridad.");
        }

        setErroresValidacion(errores);
        return errores.length === 0;
    };

    const manejarCambioRegistro = (e) => {
        setDatosRegistro({ ...datosRegistro, [e.target.id]: e.target.value });
        setErroresValidacion([]);
    };

    const manejarLogin = async (e) => {
        e.preventDefault();
        setErrorLogin(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: contrasena,
        });

        if (error) setErrorLogin('Credenciales incorrectas o usuario no registrado.');
        else navegar('/');
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();

        if (!validarRegistro()) return;

        setEstadoRegistro('cargando');

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: correo,
            password: contrasena,
        });

        if (authError) {
            setEstadoRegistro('inactivo');
            return setErroresValidacion([authError.message]);
        }

        if (authData.user) {
            const { error: perfilError } = await supabase.from('perfiles').insert([{
                id: authData.user.id,
                ...datosRegistro
            }]);

            if (perfilError) {
                setEstadoRegistro('inactivo');
                setErroresValidacion(["Error al guardar perfil: " + perfilError.message]);
            } else {
                setEstadoRegistro('exito');
                setTimeout(() => navegar('/perfil'), 2000);
            }
        }
    };

    if (estadoRegistro === 'exito') {
        return (
            <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Card style={{ width: '550px' }} className="shadow-lg border-0 custom-card py-5">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center animacion-exito text-center h-100">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                        </div>
                        <h2 className="fw-bold mb-2">¡Cuenta Creada!</h2>
                        <p className="text-secondary fs-5">Bienvenido a Do'it. Preparando tu perfil...</p>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <Card style={{ width: '550px' }} className="shadow-lg border-0 custom-card">
                <Card.Body className="p-4 p-md-5">
                    <h2 className="text-center mb-4 fw-bold text-primary">Do'it</h2>

                    <Tabs
                        id="tabs-autenticacion"
                        activeKey={pestañaActiva}
                        onSelect={(k) => {
                            setPestañaActiva(k);
                            setErrorLogin(null);
                            setErroresValidacion([]);
                        }}
                        className="mb-4 nav-fill"
                    >
                        <Tab eventKey="login" title="Iniciar Sesión">
                            {errorLogin && <Alert variant="danger" className="text-center border-0 rounded-3">{errorLogin}</Alert>}
                            <Form onSubmit={manejarLogin} className="mt-4">
                                <Form.Group className="mb-4" controlId="correoLogin">
                                    <Form.Label className="text-light fw-medium mb-2">Correo Electrónico</Form.Label>
                                    <Form.Control type="email" className="custom-input" placeholder="ejemplo@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="contrasenaLogin">
                                    <Form.Label className="text-light fw-medium mb-2">Contraseña</Form.Label>
                                    <Form.Control type="password" className="custom-input" placeholder="Tu contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 fw-bold rounded-pill py-3 shadow">
                                    Ingresar a mi cuenta
                                </Button>
                            </Form>
                        </Tab>

                        {/* --- PESTAÑA 2: CREAR CUENTA --- */}
                        <Tab eventKey="registro" title="Crear Cuenta">
                            {erroresValidacion.length > 0 && (
                                <Alert variant="danger" className="border-0 rounded-3">
                                    <h6 className="fw-bold mb-2">Corrige los siguientes errores:</h6>
                                    <ul className="mb-0 ps-3">
                                        {erroresValidacion.map((err, i) => <li key={i} className="small">{err}</li>)}
                                    </ul>
                                </Alert>
                            )}

                            <Form onSubmit={manejarRegistro} className="mt-4" noValidate>

                                <div className="row mb-3">
                                    <Form.Group className="col-md-6 mb-3 mb-md-0" controlId="nombre">
                                        <Form.Label className="text-light fw-medium mb-2">Nombre</Form.Label>
                                        <Form.Control type="text" className="custom-input" placeholder="Ej: Juan" value={datosRegistro.nombre} onChange={manejarCambioRegistro} disabled={estadoRegistro === 'cargando'} />
                                    </Form.Group>

                                    <Form.Group className="col-md-6" controlId="apellido">
                                        <Form.Label className="text-light fw-medium mb-2">Apellido</Form.Label>
                                        <Form.Control type="text" className="custom-input" placeholder="Ej: Pérez" value={datosRegistro.apellido} onChange={manejarCambioRegistro} disabled={estadoRegistro === 'cargando'} />
                                    </Form.Group>
                                </div>

                                <div className="row mb-3">
                                    <Form.Group className="col-md-6 mb-3 mb-md-0" controlId="telefono">
                                        <Form.Label className="text-light fw-medium mb-2">Teléfono</Form.Label>
                                        <Form.Control type="text" className="custom-input" placeholder="Ej: 2615555555" value={datosRegistro.telefono} onChange={manejarCambioRegistro} disabled={estadoRegistro === 'cargando'} />
                                    </Form.Group>

                                    <Form.Group className="col-md-6" controlId="direccion">
                                        <Form.Label className="text-light fw-medium mb-2">Zona / Ciudad</Form.Label>
                                        {cargandoApi ? (
                                            <div className="d-flex align-items-center form-control custom-input text-secondary">
                                                <Spinner size="sm" className="me-2" /> Cargando...
                                            </div>
                                        ) : errorApi ? (
                                            <Form.Control type="text" className="custom-input border-warning" placeholder="Escribe tu ciudad" value={datosRegistro.direccion} onChange={manejarCambioRegistro} disabled={estadoRegistro === 'cargando'} />
                                        ) : (
                                            <Form.Select className="custom-input" value={datosRegistro.direccion} onChange={manejarCambioRegistro} disabled={estadoRegistro === 'cargando'}>
                                                <option value="">Selecciona un municipio...</option>
                                                {municipios.map(mun => (
                                                    <option key={mun.id} value={mun.nombre}>{mun.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    </Form.Group>
                                </div>

                                <hr className="border-secondary opacity-25 my-4" />
                                <p className="text-secondary small fw-bold mb-3">DATOS DE ACCESO</p>

                                <Form.Group className="mb-3" controlId="correoRegistro">
                                    <Form.Label className="text-light fw-medium mb-2">Correo Electrónico</Form.Label>
                                    <Form.Control type="email" className="custom-input" placeholder="Usa un correo válido" value={correo} onChange={(e) => { setCorreo(e.target.value); setErroresValidacion([]); }} disabled={estadoRegistro === 'cargando'} />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="contrasenaRegistro">
                                    <Form.Label className="text-light fw-medium mb-2">Crear Contraseña</Form.Label>
                                    <Form.Control type="password" className="custom-input" placeholder="Mínimo 6 caracteres" value={contrasena} onChange={(e) => { setContrasena(e.target.value); setErroresValidacion([]); }} disabled={estadoRegistro === 'cargando'} />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 fw-bold rounded-pill py-3 shadow" disabled={estadoRegistro === 'cargando'}>
                                    {estadoRegistro === 'cargando' ? (
                                        <><Spinner size="sm" className="me-2" />Creando cuenta...</>
                                    ) : (
                                        "Registrarme en Do'it"
                                    )}
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Container>
    );
}