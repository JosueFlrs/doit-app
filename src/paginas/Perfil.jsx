// Página de perfil del usuario donde se muestran sus ofertas publicadas. Permite eliminar y editar cada oferta utilizando un modal para la edición. Se conecta a Supabase para obtener y actualizar los datos de las ofertas.

import { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useAuth } from '../contexto/AuthContexto';
import { useNavigate } from 'react-router-dom';
import ListaOfertas from '../componentes/ListaOfertas';
import ModalEditarOferta from '../componentes/ModalEditarOferta';

export default function Perfil() {
    const { usuario } = useAuth();
    const navegar = useNavigate();
    const [misOfertas, setMisOfertas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [ofertaAEditar, setOfertaAEditar] = useState(null);

    useEffect(() => {
        if (usuario) {
            obtenerMisOfertas();
        }
    }, [usuario]);

    const obtenerMisOfertas = async () => {
        // Aquí el secreto: filtramos usando .eq('usuario_id', usuario.id)
        const { data } = await supabase
            .from('ofertasTrabajo')
            .select('*')
            .eq('usuario_id', usuario.id)
            .order('id', { ascending: false });
        if (data) setMisOfertas(data);
    };

    const eliminarOferta = async (idOferta) => {
        const { error } = await supabase.from('ofertasTrabajo').delete().eq('id', idOferta);
        if (!error) setMisOfertas(misOfertas.filter(o => o.id !== idOferta));
    };

    const prepararEdicion = (oferta) => {
        setOfertaAEditar(oferta);
        setMostrarModal(true);
    };

    const actualizarOferta = async (ofertaModificada) => {
        const { data, error } = await supabase
            .from('ofertasTrabajo')
            .update({
                tituloOferta: ofertaModificada.tituloOferta,
                descripcionDetallada: ofertaModificada.descripcionDetallada,
                barrioZona: ofertaModificada.barrioZona,
                precioSugerido: ofertaModificada.precioSugerido
            })
            .eq('id', ofertaModificada.id)
            .select();

        if (!error) {
            setMisOfertas(misOfertas.map(o => o.id === ofertaModificada.id ? data[0] : o));
            setMostrarModal(false);
        }
    };

    // Si no hay usuario logueado, no mostramos nada o redirigimos
    if (!usuario) return null;

    return (
        <Container className="mt-4">
            {/* Sección de Información del Usuario */}
            <Card className="mb-4 border-0 shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="mb-1">Mi Perfil</h4>
                        <p className="text-muted mb-0">{usuario.email}</p>
                    </div>
                    <Button variant="primary" onClick={() => navegar('/publicar')}>
                        + Nueva Publicación
                    </Button>
                </Card.Body>
            </Card>

            <h3 className="mb-3">Mis Publicaciones</h3>

            {/* Pasamos mostrarAcciones={true} para que AQUI sí se vean los botones */}
            <ListaOfertas
                listaOfertas={misOfertas}
                mostrarAcciones={true}
                alEliminar={eliminarOferta}
                alEditar={prepararEdicion}
            />

            <ModalEditarOferta
                mostrar={mostrarModal}
                alCerrar={() => setMostrarModal(false)}
                ofertaAEditar={ofertaAEditar}
                alGuardarCambios={actualizarOferta}
            />
        </Container>
    );
}