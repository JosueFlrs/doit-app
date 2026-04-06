//Componente para el formulario de creación de ofertas, con manejo de estado y conexión a Supabase para insertar datos en la base de datos.

import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import { useAuth } from '../contexto/AuthContexto';

export default function FormularioOferta({ alCrearOferta }) {
    const { usuario } = useAuth(); // <-- 2. Obtener el usuario actual
    const [nuevaOferta, setNuevaOferta] = useState({
        tituloOferta: '', descripcionDetallada: '', barrioZona: '', precioSugerido: ''
    });

    const manejarCambio = (e) => {
        setNuevaOferta({ ...nuevaOferta, [e.target.id]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        // 3. Agregamos el usuario_id a los datos que vamos a guardar
        const datosAGuardar = {
            ...nuevaOferta,
            usuario_id: usuario.id
        };

        const { data, error } = await supabase
            .from('ofertasTrabajo')
            .insert([datosAGuardar])
            .select();

        if (!error) {
            setNuevaOferta({ tituloOferta: '', descripcionDetallada: '', barrioZona: '', precioSugerido: '' });
            if (data) alCrearOferta(data[0]);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header>Publicar Nueva Oferta</Card.Header>
            <Card.Body>
                <Form onSubmit={manejarEnvio}>
                    <Form.Group className="mb-3" controlId="tituloOferta">
                        <Form.Label>Título del Trabajo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej: Reparación de cañería"
                            value={nuevaOferta.tituloOferta}
                            onChange={manejarCambio}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descripcionDetallada">
                        <Form.Label>Descripción Detallada</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={nuevaOferta.descripcionDetallada}
                            onChange={manejarCambio}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex gap-3 mb-3">
                        <Form.Group className="w-50" controlId="barrioZona">
                            <Form.Label>Barrio / Zona</Form.Label>
                            <Form.Control
                                type="text"
                                value={nuevaOferta.barrioZona}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="w-50" controlId="precioSugerido">
                            <Form.Label>Precio Sugerido ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={nuevaOferta.precioSugerido}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>
                    </div>

                    <Button variant="primary" type="submit">
                        Publicar Oferta
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}