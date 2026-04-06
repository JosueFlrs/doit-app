// Página principal que muestra la lista de ofertas de trabajo. Se conecta a Supabase para obtener y actualizar los datos de las ofertas.

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { supabase } from '../servicios/supabaseCliente';
import ListaOfertas from '../componentes/ListaOfertas';

export default function Home() {
    const [listaOfertas, setListaOfertas] = useState([]);

    useEffect(() => {
        obtenerOfertas();
    }, []);

    const obtenerOfertas = async () => {
        const { data } = await supabase
            .from('ofertasTrabajo')
            .select('*')
            .order('id', { ascending: false });
        if (data) setListaOfertas(data);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Trabajos Disponibles</h2>
            {/* Pasamos mostrarAcciones={false} para que no haya botones */}
            <ListaOfertas listaOfertas={listaOfertas} mostrarAcciones={false} />
        </Container>
    );
}