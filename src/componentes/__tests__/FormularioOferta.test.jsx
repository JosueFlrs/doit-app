import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioOferta from '../FormularioOferta';

// Para que la prueba sea 'Unitaria', no podemos depender de servicios externos.
// Por lo tanto, interceptamos las llamadas al sistema y le devolvemos datos falsos.

// 1. Mock del Contexto de Autenticación: Engañamos al componente haciéndole
// creer que hay un usuario con sesión iniciada.
vi.mock('../../contexto/AuthContexto', () => ({
    useAuth: () => ({
        usuario: { id: 'usuario-falso-123' }
    })
}));

// 2. Mock de Supabase: Evitamos que el formulario intente conectarse a internet.
// Si el componente intenta guardar (insert), le devolvemos una respuesta simulada de éxito.
vi.mock('../../servicios/supabaseCliente', () => ({
    supabase: {
        from: () => ({
            insert: () => ({
                select: vi.fn().mockResolvedValue({ data: [{ id: '1' }], error: null })
            })
        })
    }
}));

// Iniciamos la familia de pruebas para el Formulario
describe('Prueba Unitaria - Componente FormularioOferta', () => {

    // CASO PU-01: OPERACIÓN DE ALTA (CREATE) Y FORMATEO
    it('PU-01: El formulario permite ingresar datos, los formatea y los captura correctamente', () => {

        // Dibujamos el formulario en nuestra pantalla virtual
        render(<FormularioOferta alCrearOferta={vi.fn()} />);

        // 1. IDENTIFICACIÓN DE ELEMENTOS: Buscamos las cajas de texto en la pantalla
        // usando las etiquetas (Labels) tal como las vería un usuario real.
        const inputTitulo = screen.getByLabelText('¿Qué necesitas?');
        const inputBarrio = screen.getByLabelText('Zona');
        const inputPresupuesto = screen.getByLabelText('Presupuesto ($)');

        // 2. SIMULACIÓN DE ESCRITURA: Usamos fireEvent.change para simular 
        // que el usuario teclea información dentro de las cajas de texto.
        fireEvent.change(inputTitulo, { target: { value: 'Arreglar persiana' } });
        fireEvent.change(inputBarrio, { target: { value: 'Godoy Cruz' } });
        fireEvent.change(inputPresupuesto, { target: { value: '15000' } });

        // 3. ASERCIONES (COMPROBACIONES): 
        // Verificamos que el estado interno de React haya guardado los textos correctamente.
        expect(inputTitulo.value).toBe('Arreglar persiana');
        expect(inputBarrio.value).toBe('Godoy Cruz');
        expect(inputPresupuesto.value).toBe('15.000');

        // Finalmente, verificamos que el botón de envío exista en el formulario
        // para garantizar que el usuario pueda completar la acción.
        const botonPublicar = screen.getByRole('button', { name: /Publicar Trabajo/i });
        expect(botonPublicar).toBeInTheDocument();
    });
});