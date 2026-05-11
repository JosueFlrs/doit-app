import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMunicipios() {
    const [municipios, setMunicipios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await axios.get('https://apis.datos.gob.ar/georef/api/municipios?provincia=Mendoza&max=50');

                const municipiosOrdenados = respuesta.data.municipios.sort((a, b) =>
                    a.nombre.localeCompare(b.nombre)
                );

                setMunicipios(municipiosOrdenados);
                setError(null);
            } catch (err) {
                console.error("Error de Axios:", err);
                setError("No se pudieron cargar las zonas.");
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    return { municipios, cargando, error };
}