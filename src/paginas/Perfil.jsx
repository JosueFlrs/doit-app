// Página de perfil del usuario donde se muestran sus ofertas publicadas. Permite eliminar y editar cada oferta utilizando un modal para la edición. Se conecta a Supabase para obtener y actualizar los datos de las ofertas.

import { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useAuth } from '../contexto/AuthContexto';
import { useNavigate } from 'react-router-dom';
import ListaOfertas from '../componentes/ListaOfertas';
import ModalEditarOferta from '../componentes/ModalEditarOferta';

export default function Perfil() {
    const { usuario } = useAuth();
    const navegar = useNavigate();
    const [perfil, setPerfil] = useState(null);
    const [misOfertas, setMisOfertas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [ofertaAEditar, setOfertaAEditar] = useState(null);

    useEffect(() => {
        if (usuario) {
            obtenerDatosPerfil();
            obtenerMisOfertas();
        }
    }, [usuario]);

    const obtenerDatosPerfil = async () => {
        const { data } = await supabase
            .from('perfiles')
            .select('*')
            .eq('id', usuario.id)
            .single();
        if (data) setPerfil(data);
    };

    const obtenerMisOfertas = async () => {
        const { data } = await supabase
            .from('ofertasTrabajo')
            .select('*')
            .eq('usuario_id', usuario.id)
            .order('id', { ascending: false });
        if (data) setMisOfertas(data);
    };

    if (!usuario) return null;

    return (
        <Container className="py-4">
            <Row className="mb-5">
                <Col lg={4}>
                    <Card className="custom-card border-0 h-100 p-3">
                        <Card.Body className="text-center">
                            <div className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold fs-2" style={{ width: '80px', height: '80px' }}>
                                {perfil?.nombre?.charAt(0)}{perfil?.apellido?.charAt(0)}
                            </div>
                            <h3 className="fw-bold mb-1">{perfil ? `${perfil.nombre} ${perfil.apellido}` : 'Cargando...'}</h3>
                            <p className="text-secondary mb-4">{usuario.email}</p>

                            <div className="text-start border-top border-secondary border-opacity-25 pt-4">
                                <p className="small text-muted mb-1">TELÉFONO</p>
                                <p className="fw-medium mb-3">{perfil?.telefono || 'No registrado'}</p>

                                <p className="small text-muted mb-1">UBICACIÓN</p>
                                <p className="fw-medium mb-0">{perfil?.direccion || 'No registrada'}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-4 mt-lg-0">
                        <h3 className="fw-bold mb-0">Mis Publicaciones</h3>
                        <Button variant="primary" onClick={() => navegar('/publicar')} className="rounded-pill px-4">
                            + Nueva Oferta
                        </Button>
                    </div>

                    <ListaOfertas
                        listaOfertas={misOfertas}
                        mostrarAcciones={true}
                        alEliminar={async (id) => {
                            await supabase.from('ofertasTrabajo').delete().eq('id', id);
                            obtenerMisOfertas();
                        }}
                        alEditar={(o) => {
                            setOfertaAEditar(o);
                            setMostrarModal(true);
                        }}
                    />
                </Col>
            </Row>

            <ModalEditarOferta
                mostrar={mostrarModal}
                alCerrar={() => setMostrarModal(false)}
                ofertaAEditar={ofertaAEditar}
                alGuardarCambios={async (o) => {
                    await supabase.from('ofertasTrabajo').update(o).eq('id', o.id);
                    obtenerMisOfertas();
                }}
            />
        </Container>
    );
}