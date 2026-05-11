import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto';
import { Spinner, Container } from 'react-bootstrap';

export default function RutaPrivada({ children }) {
    const { usuario, cargando } = useAuth();
    if (cargando) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }
    return usuario ? children : <Navigate to="/login" replace />;
}