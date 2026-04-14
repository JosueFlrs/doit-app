import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListaOfertas from '../ListaOfertas';

describe('Pruebas Unitarias - Componente ListaOfertas', () => {
  
  // --- PU-03: Consulta Vacía ---
  it('PU-03: Debe mostrar un mensaje si la lista de ofertas está vacía', () => {
    render(<ListaOfertas listaOfertas={[]} mostrarAcciones={false} />);
    
    const mensaje = screen.getByText('No encontramos ofertas en este momento.');
    expect(mensaje).toBeInTheDocument();
  });

  // --- PU-02: Consulta con Datos ---
  it('PU-02: Debe renderizar las tarjetas con los datos de las ofertas (Lectura)', () => {
    const datosDePrueba = [
      { id: '1', tituloOferta: 'Electricista para tableros', descripcionDetallada: 'Revisar', barrioZona: 'Centro', precioSugerido: 15000 },
      { id: '2', tituloOferta: 'Pintor para exterior', descripcionDetallada: 'Pintar', barrioZona: 'Las Heras', precioSugerido: 40000 }
    ];

    render(<ListaOfertas listaOfertas={datosDePrueba} mostrarAcciones={false} />);

    expect(screen.getByText('Electricista para tableros')).toBeInTheDocument();
    expect(screen.getByText('Pintor para exterior')).toBeInTheDocument();
  });

  // --- PU-04: Operación de Baja (Delete) ---
  it('PU-04: Debe capturar el ID correcto al hacer clic en el botón Borrar', () => {
    // 1. Creamos una función simulada (mock) para ver si es llamada
    const funcionBorrarSimulada = vi.fn();
    const datosDePrueba = [
      { id: '99', tituloOferta: 'Jardinero', descripcionDetallada: 'Cortar pasto', barrioZona: 'Godoy Cruz', precioSugerido: 5000 }
    ];

    // 2. Renderizamos la lista activando las acciones (mostrarAcciones={true})
    render(
      <ListaOfertas 
        listaOfertas={datosDePrueba} 
        mostrarAcciones={true} 
        alEliminar={funcionBorrarSimulada} 
      />
    );

    // 3. Buscamos el botón de borrar y simulamos un clic
    const botonBorrar = screen.getByText('Borrar');
    fireEvent.click(botonBorrar);

    // 4. Verificamos que la función se ejecutó exactamente con el ID '99'
    expect(funcionBorrarSimulada).toHaveBeenCalledWith('99');
  });
});