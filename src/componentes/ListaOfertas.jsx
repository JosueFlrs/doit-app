// Componente para mostrar la lista de ofertas publicadas, utilizando tarjetas de Bootstrap. Cada oferta muestra su título, precio sugerido, ubicación y descripción detallada.

import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

export default function ListaOfertas({ listaOfertas, alEliminar, alEditar, mostrarAcciones }) {
    if (listaOfertas.length === 0) {
        return (
            <div className="text-center py-5">
                <h5 className="text-muted fw-normal">No encontramos ofertas en este momento.</h5>
            </div>
        );
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {listaOfertas.map((oferta) => (
                <Col key={oferta.id}>
                    <Card className="h-100 border-0 shadow-sm custom-card">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <Badge bg="primary-subtle" className="text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold">
                                    ${oferta.precioSugerido.toLocaleString()}
                                </Badge>
                                <span className="text-muted small">📍 {oferta.barrioZona}</span>
                            </div>

                            <Card.Title className="fw-bold fs-4 mb-2">{oferta.tituloOferta}</Card.Title>

                            <Card.Text className="text-secondary line-clamp">
                                {oferta.descripcionDetallada}
                            </Card.Text>
                        </Card.Body>

                        <Card.Footer className="border-top border-secondary border-opacity-25 p-4 pt-3 d-flex justify-content-between align-items-center">
                            {mostrarAcciones ? (
                                <div className="d-flex gap-2 w-100">
                                    <Button variant="outline-primary" className="rounded-pill flex-grow-1" onClick={() => alEditar(oferta)}>
                                        Editar
                                    </Button>
                                    <Button variant="outline-danger" className="rounded-pill" onClick={() => alEliminar(oferta.id)}>
                                        Borrar
                                    </Button>
                                </div>
                            ) : (
                                <Button variant="dark" className="w-100 rounded-pill fw-bold py-2 shadow-sm" onClick={() => alert('Funcionalidad de postulación aún no implementada')}>
                                    Postularse ahora
                                </Button>
                            )}
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}