// Componente para el modal de edición de ofertas, que recibe la oferta a editar y permite modificar sus campos, enviando los cambios al componente principal (App) para actualizar la base de datos a través de Supabase.

import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Spinner } from 'react-bootstrap';

export default function ModalEditarOferta({ mostrar, alCerrar, ofertaAEditar, alGuardarCambios }) {
    const [ofertaEditada, setOfertaEditada] = useState({
        id: '', tituloOferta: '', descripcionDetallada: '', barrioZona: '', precioSugerido: ''
    });

    const [estadoEnvio, setEstadoEnvio] = useState('inactivo');

    useEffect(() => {
        if (ofertaAEditar) {
            const precioFormateado = ofertaAEditar.precioSugerido
                ? ofertaAEditar.precioSugerido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : '';

            setOfertaEditada({ ...ofertaAEditar, precioSugerido: precioFormateado });
            setEstadoEnvio('inactivo');
        }
    }, [ofertaAEditar]);

    const manejarCambio = (e) => {
        setOfertaEditada({ ...ofertaEditada, [e.target.id]: e.target.value });
    };

    const manejarCambioPrecio = (e) => {
        const valorLimpio = e.target.value.replace(/\D/g, "");
        const valorFormateado = valorLimpio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setOfertaEditada({ ...ofertaEditada, precioSugerido: valorFormateado });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setEstadoEnvio('cargando');

        const precioNumerico = parseInt(ofertaEditada.precioSugerido.toString().replace(/\./g, ''), 10);

        setTimeout(async () => {
            await alGuardarCambios({
                ...ofertaEditada,
                precioSugerido: precioNumerico
            });
            setEstadoEnvio('exito');

            setTimeout(() => {
                alCerrar();
            }, 1500);
        }, 800);
    };

    return (
        <Modal show={mostrar} onHide={alCerrar} centered data-bs-theme="dark" backdrop="static">
            <Modal.Header closeButton={estadoEnvio === 'inactivo'} className="border-0 pb-0">
                <Modal.Title className="fw-bold px-2 pt-2">
                    {estadoEnvio === 'exito' ? '¡Actualizado!' : 'Editar Publicación'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                {estadoEnvio === 'exito' ? (
                    <div className="text-center py-4 animacion-exito">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                        </div>
                        <p className="fs-5 fw-medium">Cambios guardados correctamente</p>
                    </div>
                ) : (
                    <Form onSubmit={manejarEnvio} id="formularioEditar">
                        <Form.Group className="mb-4" controlId="tituloOferta">
                            <Form.Label className="text-secondary small fw-medium mb-1">Título</Form.Label>
                            <Form.Control type="text" className="custom-input" value={ofertaEditada.tituloOferta} onChange={manejarCambio} required disabled={estadoEnvio === 'cargando'} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="descripcionDetallada">
                            <Form.Label className="text-secondary small fw-medium mb-1">Descripción</Form.Label>
                            <Form.Control as="textarea" className="custom-input" rows={3} value={ofertaEditada.descripcionDetallada} onChange={manejarCambio} required disabled={estadoEnvio === 'cargando'} />
                        </Form.Group>

                        <div className="row mb-2">
                            <Form.Group className="col-md-6 mb-4 mb-md-0" controlId="barrioZona">
                                <Form.Label className="text-secondary small fw-medium mb-1">Barrio / Zona</Form.Label>
                                <Form.Control type="text" className="custom-input" value={ofertaEditada.barrioZona} onChange={manejarCambio} required disabled={estadoEnvio === 'cargando'} />
                            </Form.Group>

                            <Form.Group className="col-md-6" controlId="precioSugerido">
                                <Form.Label className="text-secondary small fw-medium mb-1">Presupuesto</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-transparent border-0 text-secondary position-absolute mt-1 ms-2 z-3 fs-5">$</InputGroup.Text>
                                    <Form.Control type="text" className="custom-input ps-5" value={ofertaEditada.precioSugerido} onChange={manejarCambioPrecio} required disabled={estadoEnvio === 'cargando'} />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Form>
                )}
            </Modal.Body>

            {estadoEnvio !== 'exito' && (
                <Modal.Footer className="border-0 px-4 pb-4 pt-0 d-flex gap-2">
                    <Button variant="outline-secondary" className="rounded-pill flex-grow-1" onClick={alCerrar} disabled={estadoEnvio === 'cargando'}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" form="formularioEditar" className="rounded-pill flex-grow-1 fw-bold" disabled={estadoEnvio === 'cargando'}>
                        {estadoEnvio === 'cargando' ? <Spinner size="sm" /> : 'Guardar Cambios'}
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}