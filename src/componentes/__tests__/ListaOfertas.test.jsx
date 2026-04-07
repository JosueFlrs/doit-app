import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListaOfertas from '../ListaOfertas';

describe('Pruebas Unitarias - Componente ListaOfertas (CRUD: Consulta)', () => {
  
  it('PU-03: Debe mostrar un mensaje si la lista de ofertas está vacía', () => {
    render(<ListaOfertas listaOfertas={[]} mostrarAcciones={false} />);
    
    const mensaje = screen.getByText('No hay ofertas para mostrar.');
    expect(mensaje).toBeInTheDocument();
  });

  it('PU-02: Debe renderizar las tarjetas con los datos de las ofertas (Lectura)', () => {
    const datosDePrueba = [
      {
        id: '1',
        tituloOferta: 'Electricista para tableros',
        descripcionDetallada: 'Revisar disyuntor',
        barrioZona: 'Godoy Cruz',
        precioSugerido: 15000,
      },
      {
        id: '2',
        tituloOferta: 'Pintor para exterior',
        descripcionDetallada: 'Pintar frente de casa',
        barrioZona: 'Luján de Cuyo',
        precioSugerido: 40000,
      }
    ];

    render(<ListaOfertas listaOfertas={datosDePrueba} mostrarAcciones={false} />);

    expect(screen.getByText('Electricista para tableros')).toBeInTheDocument();
    expect(screen.getByText('Pintor para exterior')).toBeInTheDocument();
    expect(screen.getByText('$15000')).toBeInTheDocument();
  });
});