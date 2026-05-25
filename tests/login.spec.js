import { test, expect } from '@playwright/test';

test.describe('Flujo Crítico: Autenticación de Usuarios (Do it)', () => {

  // Precondición: Antes de cada test, navegamos a la pantalla de Login
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login'); 
  });

  test('CP-01: Login Inválido - Debe mostrar mensaje de error', async ({ page }) => {
    // 1. Llenamos el formulario con datos falsos usando selectores de accesibilidad
    await page.getByPlaceholder('ejemplo@correo.com').fill('usuario_falso@correo.com');
    await page.getByPlaceholder('Tu contraseña').fill('claveIncorrecta123');

    // 2. Hacemos clic en el botón de ingreso
    await page.getByRole('button', { name: /ingresar a mi cuenta/i }).click();

    // 3. Aserciones (Expects): Verificamos que aparezca la alerta roja de Bootstrap
    const alertaError = page.getByText(/credenciales incorrectas/i);
    
    // Verificamos que el mensaje sea visible en la pantalla
    await expect(alertaError).toBeVisible();
    
    // Verificamos que el usuario NO haya sido redirigido (sigue en /login)
    await expect(page).toHaveURL(/.*login/);
  });

  test('CP-02: Login Válido - Debe redirigir a la ruta principal', async ({ page }) => {
    // 1. Llenamos el formulario con datos reales de la base de datos
    await page.getByPlaceholder('ejemplo@correo.com').fill('josueflorescr9@gmail.com'); 
    await page.getByPlaceholder('Tu contraseña').fill('Dni1234');

    // 2. Hacemos clic en el botón
    await page.getByRole('button', { name: /ingresar a mi cuenta/i }).click();

    // 3. Aserciones: El sistema debe sacar al usuario del login y llevarlo al inicio
    // Esperamos a que la URL cambie al home '/'
    await expect(page).toHaveURL('http://localhost:5173/');

    // Verificamos que un elemento exclusivo de un usuario logueado esté visible
    // Por ejemplo, el botón de "Publicar Oferta"
    const botonPublicar = page.getByRole('button', { name: /publicar/i });
  });

});