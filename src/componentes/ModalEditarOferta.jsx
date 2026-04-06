// Componente para el modal de edición de ofertas, que recibe la oferta a editar y permite modificar sus campos, enviando los cambios al componente principal (App) para actualizar la base de datos a través de Supabase.

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ModalEditarOferta({ mostrar, alCerrar, ofertaAEditar, alGuardarCambios }) {
    const [ofertaEditada, setOfertaEditada] = useState({
        id: '',
        tituloOferta: '',
        descripcionDetallada: '',
        barrioZona: '',
        precioSugerido: ''
    });

    // Cada vez que se abre el modal con una nueva oferta, cargamos sus datos en el estado
    useEffect(() => {
        if (ofertaAEditar) {
            setOfertaEditada(ofertaAEditar);
        }
    }, [ofertaAEditar]);

    const manejarCambio = (e) => {
        const { id, value } = e.target;
        setOfertaEditada({ ...ofertaEditada, [id]: value });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Enviamos la oferta modificada al componente principal (App)
        alGuardarCambios(ofertaEditada);
    };

    return (
        <Modal show={mostrar} onHide={alCerrar} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Oferta de Trabajo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={manejarEnvio} id="formularioEditar">
                    <Form.Group className="mb-3" controlId="tituloOferta">
                        <Form.Label>Título del Trabajo</Form.Label>
                        <Form.Control
                            type="text"
                            value={ofertaEditada.tituloOferta}
                            onChange={manejarCambio}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descripcionDetallada">
                        <Form.Label>Descripción Detallada</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={ofertaEditada.descripcionDetallada}
                            onChange={manejarCambio}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex gap-3 mb-3">
                        <Form.Group className="w-50" controlId="barrioZona">
                            <Form.Label>Barrio / Zona</Form.Label>
                            <Form.Control
                                type="text"
                                value={ofertaEditada.barrioZona}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="w-50" controlId="precioSugerido">
                            <Form.Label>Precio Sugerido ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={ofertaEditada.precioSugerido}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={alCerrar}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" form="formularioEditar">
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}