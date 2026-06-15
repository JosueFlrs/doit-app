// Componente para el modal de postulación a una oferta desde el Home, que recibe la oferta seleccionada y permite al usuario ingresar sus datos de contacto y un mensaje de presentación, enviando esta información por correo electrónico al anunciante a través de EmailJS.

import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

export default function ModalPostularse({ oferta, mostrar, alCerrar }) {
    const [datosPostulacion, setDatosPostulacion] = useState({
        nombrePostulante: '',
        telefonoContacto: '',
        mensajePresentacion: ''
    });
    const [erroresValidacion, setErroresValidacion] = useState([]);
    const [estadoEnvio, setEstadoEnvio] = useState('inactivo');

    const manejarCambio = (e) => {
        setDatosPostulacion({ ...datosPostulacion, [e.target.id]: e.target.value });
        setErroresValidacion([]);
    };

    const validarFormulario = () => {
        const errores = [];
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const regexNumeros = /^[0-9]+$/;

        if (!datosPostulacion.nombrePostulante.trim() || !regexLetras.test(datosPostulacion.nombrePostulante)) {
            errores.push("El nombre debe contener únicamente letras.");
        }
        if (!datosPostulacion.telefonoContacto.trim() || !regexNumeros.test(datosPostulacion.telefonoContacto) || datosPostulacion.telefonoContacto.length < 8) {
            errores.push("Ingresa un número de teléfono válido (mínimo 8 dígitos).");
        }
        if (datosPostulacion.mensajePresentacion.trim().length < 15) {
            errores.push("Por favor, escribe una breve presentación o propuesta (mínimo 15 caracteres).");
        }

        setErroresValidacion(errores);
        return errores.length === 0;
    };

    // src/componentes/ModalPostularse.jsx
    // ... (todo el resto del código se mantiene exactamente igual)

    const manejarEnvioEmail = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setEstadoEnvio('cargando');

        const parametrosEmail = {
            titulo_oferta: oferta.tituloOferta,
            nombre_postulante: datosPostulacion.nombrePostulante,
            telefono_postulante: datosPostulacion.telefonoContacto,
            mensaje_postulante: datosPostulacion.mensajePresentacion,
        };

        try {
            await emailjs.send(
                'service_8l2kjxq',
                'template_7fzsbn9',
                parametrosEmail,
                'DVb3y-XB37kfAW8aE'
            );

            setEstadoEnvio('exito');

            setTimeout(() => {
                setDatosPostulacion({ nombrePostulante: '', telefonoContacto: '', mensajePresentacion: '' });
                setEstadoEnvio('inactivo');
                alCerrar();
            }, 2000);

        } catch (error) {
            console.error("Error real al enviar el correo a través de EmailJS:", error);
            setErroresValidacion([
                "No se pudo despachar el correo electrónico. Verifica la configuración del servicio externo."
            ]);
            setEstadoEnvio('inactivo');
        }
    };


    return (
        <Modal show={mostrar} onHide={alCerrar} centered contentClassName="bg-dark text-light border-secondary custom-card">
            <Modal.Header closeButton className="border-secondary">
                <Modal.Header>
                    <Modal.Title className="fw-bold fs-5">
                        Postulación: <span className="text-primary">{oferta?.tituloOferta}</span>
                    </Modal.Title>
                </Modal.Header>
            </Modal.Header>
            <Modal.Body className="p-4">
                {erroresValidacion.length > 0 && (
                    <Alert variant="danger" className="border-0 rounded-3 small">
                        <ul className="mb-0 ps-3">
                            {erroresValidacion.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    </Alert>
                )}

                {estadoEnvio === 'exito' ? (
                    <div className="text-center py-4 animacion-fade">
                        <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                        </div>
                        <h5 className="fw-bold">¡Postulación Enviada!</h5>
                        <p className="text-secondary small">El anunciante recibirá tu propuesta en su correo.</p>
                    </div>
                ) : (
                    <Form onSubmit={manejarEnvioEmail} noValidate>
                        <Form.Group className="mb-3" controlId="nombrePostulante">
                            <Form.Label className="small fw-medium text-light">Tu Nombre Completo</Form.Label>
                            <Form.Control type="text" className="custom-input" placeholder="Ej: Carlos Gómez" value={datosPostulacion.nombrePostulante} onChange={manejarCambio} disabled={estadoEnvio === 'cargando'} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="telefonoContacto">
                            <Form.Label className="small fw-medium text-light">Teléfono de Contacto</Form.Label>
                            <Form.Control type="text" className="custom-input" placeholder="Ej: 2619999999" value={datosPostulacion.telefonoContacto} onChange={manejarCambio} disabled={estadoEnvio === 'cargando'} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="mensajePresentacion">
                            <Form.Label className="small fw-medium text-light">Propuesta o Mensaje</Form.Label>
                            <Form.Control as="textarea" rows={4} className="custom-input" placeholder="Cuéntale al anunciante por qué eres el indicado para el trabajo..." value={datosPostulacion.mensajePresentacion} onChange={manejarCambio} disabled={estadoEnvio === 'cargando'} />
                        </Form.Group>

                        <div className="d-flex gap-2 justify-content-end">
                            <Button variant="outline-secondary" className="rounded-pill px-4" onClick={alCerrar} disabled={estadoEnvio === 'cargando'}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" className="rounded-pill px-4 fw-bold" disabled={estadoEnvio === 'cargando'}>
                                {estadoEnvio === 'cargando' ? <><Spinner size="sm" className="me-2" />Enviando...</> : 'Enviar Postulación'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}