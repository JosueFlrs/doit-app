// Componente para mostrar la lista de ofertas publicadas, utilizando tarjetas de Bootstrap. Cada oferta muestra su título, precio sugerido, ubicación y descripción detallada.

// src/componentes/ListaOfertas.jsx
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

export default function ListaOfertas({ listaOfertas, alEliminar, alEditar, mostrarAcciones }) {
    if (listaOfertas.length === 0) {
        return <p className="text-center mt-4 text-muted">No hay ofertas para mostrar.</p>;
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {listaOfertas.map((oferta) => (
                <Col key={oferta.id}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between align-items-start">
                                {oferta.tituloOferta}
                                <Badge bg="success">${oferta.precioSugerido}</Badge>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">📍 {oferta.barrioZona}</Card.Subtitle>
                            <Card.Text>{oferta.descripcionDetallada}</Card.Text>
                        </Card.Body>

                        {/* Solo mostramos el pie con los botones si mostrarAcciones es TRUE */}
                        {mostrarAcciones && (
                            <Card.Footer className="border-top-0 d-flex justify-content-end gap-2">
                                <Button variant="outline-primary" size="sm" onClick={() => alEditar(oferta)}>
                                    Editar
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => alEliminar(oferta.id)}>
                                    Eliminar
                                </Button>
                            </Card.Footer>
                        )}

                    </Card>
                </Col>
            ))}
        </Row>
    );
}