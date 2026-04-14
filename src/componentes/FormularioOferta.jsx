//Componente para el formulario de creación de ofertas, con manejo de estado y conexión a Supabase para insertar datos en la base de datos.

import { useState } from 'react';
import { Form, Button, Card, Spinner, InputGroup } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useAuth } from '../contexto/AuthContexto';

export default function FormularioOferta({ alCrearOferta }) {
    const { usuario } = useAuth();
    const [nuevaOferta, setNuevaOferta] = useState({
        tituloOferta: '', descripcionDetallada: '', barrioZona: '', precioSugerido: ''
    });
    const [estadoEnvio, setEstadoEnvio] = useState('inactivo');

    const manejarCambio = (e) => {
        setNuevaOferta({ ...nuevaOferta, [e.target.id]: e.target.value });
    };

    const manejarCambioPrecio = (e) => {
        const valorLimpio = e.target.value.replace(/\D/g, "");
        const valorFormateado = valorLimpio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setNuevaOferta({ ...nuevaOferta, precioSugerido: valorFormateado });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setEstadoEnvio('cargando');

        const precioNumerico = parseInt(nuevaOferta.precioSugerido.replace(/\./g, ''), 10);

        const datosAGuardar = {
            ...nuevaOferta,
            precioSugerido: precioNumerico,
            usuario_id: usuario.id
        };

        const { data, error } = await supabase.from('ofertasTrabajo').insert([datosAGuardar]).select();

        if (!error) {
            setEstadoEnvio('exito');
            setNuevaOferta({ tituloOferta: '', descripcionDetallada: '', barrioZona: '', precioSugerido: '' });
            setTimeout(() => { if (data) alCrearOferta(data[0]); }, 2000);
        } else {
            setEstadoEnvio('inactivo');
        }
    };

    if (estadoEnvio === 'exito') {
        return (
            <Card className="custom-card border-0 py-5">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center animacion-exito text-center h-100">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                    </div>
                    <h2 className="fw-bold mb-2">¡Listo!</h2>
                    <p className="text-secondary fs-5">Tu oferta ha sido publicada.</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="custom-card border-0 p-4 shadow-lg">
            <Card.Body>
                <Form onSubmit={manejarEnvio}>
                    <Form.Group className="mb-4" controlId="tituloOferta">
                        <Form.Label className="text-light fw-medium mb-2">¿Qué necesitas?</Form.Label>
                        <Form.Control type="text" className="custom-input" placeholder="Ej: Arreglo de persiana" value={nuevaOferta.tituloOferta} onChange={manejarCambio} required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="descripcionDetallada">
                        <Form.Label className="text-light fw-medium mb-2">Detalles</Form.Label>
                        <Form.Control as="textarea" className="custom-input" rows={4} placeholder="Describe el trabajo..." value={nuevaOferta.descripcionDetallada} onChange={manejarCambio} required />
                    </Form.Group>

                    <div className="row mb-4">
                        <Form.Group className="col-md-6 mb-4 mb-md-0" controlId="barrioZona">
                            <Form.Label className="text-light fw-medium mb-2">Zona</Form.Label>
                            <Form.Control type="text" className="custom-input" placeholder="Ej: Las Heras" value={nuevaOferta.barrioZona} onChange={manejarCambio} required />
                        </Form.Group>

                        <Form.Group className="col-md-6" controlId="precioSugerido">
                            <Form.Label className="text-light fw-medium mb-2">Presupuesto ($)</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-transparent border-0 text-secondary position-absolute mt-2 ms-2 z-3 fs-5">$</InputGroup.Text>
                                <Form.Control type="text" className="custom-input ps-5" placeholder="0.00" value={nuevaOferta.precioSugerido} onChange={manejarCambioPrecio} required />
                            </InputGroup>
                        </Form.Group>
                    </div>

                    <Button variant="primary" type="submit" className="w-100 rounded-pill fw-bold py-3 mt-2 shadow" disabled={estadoEnvio === 'cargando'}>
                        {estadoEnvio === 'cargando' ? <><Spinner size="sm" className="me-2" />Publicando...</> : 'Publicar Trabajo'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}