import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioOferta from '../FormularioOferta';

// 1. Simulamos el contexto de Autenticación
vi.mock('../../contexto/AuthContexto', () => ({
    useAuth: () => ({
        usuario: { id: 'usuario-falso-123' }
    })
}));

// 2. Simulamos el cliente de Supabase para no hacer llamadas reales a internet
vi.mock('../../servicios/supabaseCliente', () => ({
    supabase: {
        from: () => ({
            insert: () => ({
                select: vi.fn().mockResolvedValue({ data: [{ id: '1' }], error: null })
            })
        })
    }
}));

describe('Prueba Unitaria - Componente FormularioOferta', () => {

    // --- PU-01: Operación de Alta (Create) ---
    it('PU-01: El formulario permite ingresar datos y capturarlos correctamente', () => {
        // Renderizamos el componente
        render(<FormularioOferta alCrearOferta={vi.fn()} />);

        // 1. Buscamos los inputs por las etiquetas (Labels) que les pusimos
        const inputTitulo = screen.getByLabelText('¿Qué necesitas?');
        const inputBarrio = screen.getByLabelText('Zona');
        const inputPresupuesto = screen.getByLabelText('Presupuesto ($)');

        // 2. Simulamos que el usuario escribe en los campos
        fireEvent.change(inputTitulo, { target: { value: 'Arreglar persiana' } });
        fireEvent.change(inputBarrio, { target: { value: 'Godoy Cruz' } });
        fireEvent.change(inputPresupuesto, { target: { value: '15000' } });

        // 3. Verificamos que los campos hayan guardado (capturado) el texto correcto
        expect(inputTitulo.value).toBe('Arreglar persiana');
        expect(inputBarrio.value).toBe('Godoy Cruz');

        // El presupuesto debería tener el punto de los miles que programamos
        expect(inputPresupuesto.value).toBe('15.000');

        // Verificamos que el botón de envío exista
        const botonPublicar = screen.getByRole('button', { name: /Publicar Trabajo/i });
        expect(botonPublicar).toBeInTheDocument();
    });
});