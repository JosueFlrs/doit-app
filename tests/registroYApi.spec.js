import { test, expect } from '@playwright/test';

test.describe('Pruebas E2E - Formulario de Registro e Integración de API', () => {
   
    // CP-03: VALIDACIÓN DE FORMULARIOS (DATOS INVÁLIDOS)

    test('CP-03: Validación de campos - Debe bloquear el registro si hay números en el nombre o letras en el teléfono', async ({ page }) => {
        // 1. Navegamos a la pantalla de acceso
        await page.goto('http://localhost:5173/login');

        // 2. Hacemos clic en la pestaña "Crear Cuenta" para cambiar de formulario
        await page.getByRole('tab', { name: /crear cuenta/i }).click();

        // 3. Inyectamos "datos basura" inválidos en las cajas de texto
        await page.getByPlaceholder('Ej: Juan').fill('Juan123');
        await page.getByPlaceholder('Ej: Pérez').fill('Pérez');
        await page.getByPlaceholder('Ej: 2615555555').fill('telefonoConLetras');

        // 4. Intentamos enviar el formulario haciendo clic en el botón de registro
        await page.getByRole('button', { name: "Registrarme en Do'it" }).click();

        // 5. ASERCIONES: 
        // Comprobamos que aparezca la alerta roja con los mensajes de corrección
        const cajaAlertas = page.getByText(/corrige los siguientes errores/i);
        await expect(cajaAlertas).toBeVisible();

        // Verificamos que el sistema muestre los errores específicos en la lista
        await expect(page.getByText('El nombre debe ser real y contener solo letras.')).toBeVisible();
        await expect(page.getByText('El teléfono debe contener solo números')).toBeVisible();

        // Verificamos que el usuario NO haya sido registrado ni redirigido (sigue en /login)
        await expect(page).toHaveURL(/.*login/);
    });


    // CP-04: CONSUMO CORRECTO DE LA API EXTERNA (GEOREF)

    test('CP-04: Integración API exitosa - El menú desplegable debe poblarse con los municipios de Mendoza', async ({ page }) => {

        // 1. Vamos al login y entramos a la pestaña de registro
        await page.goto('http://localhost:5173/login');
        await page.getByRole('tab', { name: /crear cuenta/i }).click();

        // 2. Buscamos el elemento <select> por su etiqueta/ID
        const selectZonas = page.locator('select#direccion');

        // 3. ASERCIÓN CLAVE: Verificamos que el select tenga cargadas las opciones de la API.
        
        const cantidadOpciones = await selectZonas.locator('option').count();
        expect(cantidadOpciones).toBeGreaterThan(1);

        // 4. Verificamos de forma explícita que algún municipio real de Mendoza esté adentro de la lista
        const opcionGodoyCruz = selectZonas.locator('option', { hasText: 'Godoy Cruz' });
        await expect(opcionGodoyCruz).toBeAttached();
    });


    // CP-05: COMPORTAMIENTO ANTE ERRORES O AUSENCIA DE RESPUESTA DE LA API

    test('CP-05: API fallida - Si la API externa se cae (Error 500), debe aparecer el input de texto de contingencia', async ({ page }) => {

        // Le ordenamos a Playwright que escuche internet. Si ve que la aplicación intenta consultar la URL de GeoRef, Playwright intercepta la llamada y simula un error 500 del servidor

        await page.route('https://apis.datos.gob.ar/georef/api/municipios*', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Servidor del gobierno caído temporalmente' })
            });
        });

        // Ahora sí navegamos a la aplicación con la API simulada como "caída"
        await page.goto('http://localhost:5173/login');
        await page.getByRole('tab', { name: /crear cuenta/i }).click();

        // Como la API falló el bloque try/catch debió activar el Plan B.
        // El menú desplegable <select> NO debe estar visible, y en su lugar debe aparecer el campo de texto clásico.
        const inputContingencia = page.getByPlaceholder('Escribe tu ciudad');

        await expect(inputContingencia).toBeVisible();
        await expect(inputContingencia).toHaveClass(/border-warning/);
    });

});