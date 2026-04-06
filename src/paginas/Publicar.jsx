// Página para publicar una nueva oferta de trabajo. Contiene un formulario que se conecta a Supabase para guardar la nueva oferta. Al finalizar redirige automáticamente al Home para mostrar la lista actualizada de ofertas.

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormularioOferta from '../componentes/FormularioOferta';

export default function Publicar() {
    const navegar = useNavigate();

    // Cuando el formulario termine de guardar en Supabase, ejecutamos esto
    const manejarOfertaCreada = () => {
        navegar('/'); // Redirige al Home automáticamente
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h2 className="mb-4 text-center">Ofrecer un Trabajo</h2>
                    <FormularioOferta alCrearOferta={manejarOfertaCreada} />
                </Col>
            </Row>
        </Container>
    );
}