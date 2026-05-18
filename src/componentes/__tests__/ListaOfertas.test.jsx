import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListaOfertas from '../ListaOfertas';

// 'describe' agrupa una familia de pruebas. Es el título general de nuestro test.
describe('Pruebas Unitarias - Componente ListaOfertas', () => {
  
  // CASO PU-03: EXCEPCIÓN (LISTA VACÍA)
  // 'it' declara un caso de prueba individual. Describe lo que "debería" pasar.
  it('PU-03: Debe mostrar un mensaje amigable si la lista de ofertas está vacía', () => {
    
    // RENDER: Dibujamos el componente en un "Navegador Virtual" invisible.
    // Le pasamos un arreglo vacío [] simulando que la base de datos no tiene nada.
    render(<ListaOfertas listaOfertas={[]} mostrarAcciones={false} />);
    
    // SCREEN & EXPECT: Buscamos en esa pantalla virtual un texto específico.
    // Nuestra 'asercion' (expect) verifica matemáticamente que el mensaje exista.
    const mensaje = screen.getByText('No encontramos ofertas en este momento.');
    expect(mensaje).toBeInTheDocument();
  });


  // CASO PU-02: LECTURA CON DATOS (READ)
  it('PU-02: Debe renderizar las tarjetas con los datos de las ofertas (Lectura)', () => {
    
    // MOCK DATA: Creamos datos falsos para aislar la prueba de la base de datos real.
    const datosDePrueba = [
      { id: '1', tituloOferta: 'Electricista para tableros', descripcionDetallada: 'Revisar', barrioZona: 'Centro', precioSugerido: 15000 },
      { id: '2', tituloOferta: 'Pintor para exterior', descripcionDetallada: 'Pintar', barrioZona: 'Las Heras', precioSugerido: 40000 }
    ];

    // RENDER: Le inyectamos nuestros datos falsos al componente.
    render(<ListaOfertas listaOfertas={datosDePrueba} mostrarAcciones={false} />);

    // EXPECT: Comprobamos que el componente haya sido capaz de leer nuestro arreglo
    // y haya dibujado los títulos en el HTML correctamente.
    expect(screen.getByText('Electricista para tableros')).toBeInTheDocument();
    expect(screen.getByText('Pintor para exterior')).toBeInTheDocument();
  });


  // CASO PU-04: OPERACIÓN DE BAJA (DELETE)
  it('PU-04: Debe capturar el ID correcto al hacer clic en el botón Borrar', () => {
    
    // vi.fn(): Creamos una función "espía" simulada. No borra nada realmente, 
    // pero nos avisa si fue llamada y con qué parámetros.
    const funcionBorrarSimulada = vi.fn();
    
    // Creamos un trabajo falso con el ID específico '99'
    const datosDePrueba = [
      { id: '99', tituloOferta: 'Jardinero', descripcionDetallada: 'Cortar pasto', barrioZona: 'Godoy Cruz', precioSugerido: 5000 }
    ];

    // Dibujamos el componente, activamos los botones (mostrarAcciones={true})
    // y le pasamos nuestra función espía.
    render(
      <ListaOfertas 
        listaOfertas={datosDePrueba} 
        mostrarAcciones={true} 
        alEliminar={funcionBorrarSimulada} 
      />
    );

    // BÚSQUEDA Y ACCIÓN: Buscamos el botón rojo de borrar.
    const botonBorrar = screen.getByText('Borrar');
    
    // fireEvent: Simulamos que un usuario humano hace clic con el mouse en ese botón.
    fireEvent.click(botonBorrar);

    // COMPROBACIÓN FINAL: Verificamos que el componente haya reaccionado al clic
    // llamando a la función espía exactamente con el ID '99', garantizando que 
    // no borrará el trabajo equivocado.
    expect(funcionBorrarSimulada).toHaveBeenCalledWith('99');
  });
});