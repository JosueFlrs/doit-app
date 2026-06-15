// Componente para mostrar la lista de ofertas tanto en el Home (sin acciones) como en el Perfil (con acciones de editar y eliminar). Recibe la lista de ofertas desde el componente padre, un booleano para mostrar u ocultar los botones de acción, y funciones para manejar la edición, eliminación y postulación.

import { Card, Button } from 'react-bootstrap';

export default function ListaOfertas({ listaOfertas, mostrarAcciones, alEliminar, alEditar, alPostularse }) {

    if (!listaOfertas || listaOfertas.length === 0) {
        return (
            <div className="text-center py-5 animacion-fade">
                <h4 className="text-secondary fw-bold">No encontramos ofertas en este momento.</h4>
                <p className="text-muted">¡Anímate a ser el primero en publicar un trabajo!</p>
            </div>
        );
    }

    return (
        <div className="row g-4 animacion-fade">
            {listaOfertas.map((ofertaActual) => (
                <div className="col-12 col-md-6 col-lg-4" key={ofertaActual.id}>
                    <Card className="tarjeta-moderna h-100 text-light shadow-sm">
                        <Card.Body className="d-flex flex-column p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                                <h5 className="fw-bold mb-0 text-truncate">{ofertaActual.tituloOferta}</h5>
                                <div className="precio-destacado text-nowrap">
                                    ${ofertaActual.precioSugerido}
                                </div>
                            </div>

                            <div className="mb-3">
                                <span className="etiqueta-ubicacion">
                                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                    {ofertaActual.barrioZona}
                                </span>
                            </div>

                            <Card.Text className="text-secondary flex-grow-1 texto-truncado" style={{ fontSize: '0.95rem' }}>
                                {ofertaActual.descripcionDetallada}
                            </Card.Text>

                            {!mostrarAcciones && (
                                <Button
                                    variant="primary"
                                    className="w-100 rounded-pill fw-bold py-2 mt-3 shadow-sm"
                                    onClick={() => alPostularse(ofertaActual)}
                                >
                                    Postularse
                                </Button>
                            )}

                            {mostrarAcciones && (
                                <div className="d-flex gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        className="w-100 rounded-pill fw-medium"
                                        onClick={() => alEditar(ofertaActual)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="w-100 rounded-pill fw-medium"
                                        onClick={() => alEliminar(ofertaActual.id)}
                                    >
                                        Borrar
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
}