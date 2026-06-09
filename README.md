# Do'it - Plataforma de Servicios

## Descripción del Sistema
Do'it es una plataforma web (Producto Mínimo Viable) diseñada para conectar a usuarios que necesitan resolver tareas cotidianas o trabajos de oficios con personas dispuestas a realizarlas. El sistema permite la publicación de presupuestos, validación de zonas geográficas mediante APIs gubernamentales y un entorno seguro de autenticación.

## Integrantes del Grupo
* Hassan El Hadad
* Josué Flores
* David Copa
* Santiago Molina

## Tecnologías Utilizadas
* **Frontend:** React, Vite, React Router DOM.
* **Estilos y UI:** Bootstrap, CSS Modules.
* **Backend as a Service (BaaS):** Supabase (Autenticación y Base de Datos PostgreSQL).
* **Integraciones Externas:** API GeoRef Argentina (Consumo mediante Axios y Custom Hooks).
* **Testing:** Vitest (Pruebas Unitarias), Playwright (Pruebas Funcionales E2E).

## Instrucciones de Instalación y Ejecución
1. Clonar el repositorio: `git clone https://github.com/josueflrs/doit-app.git`
2. Navegar al directorio: `cd doit-app`
3. Instalar dependencias: `npm install`
4. Levantar el servidor de desarrollo: `npm run dev`

## Estructura Principal del Proyecto
* `src/componentes/`: Componentes reutilizables de React (Navbar, Formularios, Listas, Rutas Privadas).
* `src/contexto/`: Manejo del estado global (AuthContexto).
* `src/hooks/`: Lógica de consumo de APIs externas (useMunicipios).
* `src/paginas/`: Vistas principales de la aplicación (Home, Login, Perfil).
* `src/servicios/`: Configuración del cliente de Supabase.
* `src/componentes/__tests__/`: Archivos de pruebas unitarias (Vitest).
* `tests/`: Archivos de pruebas funcionales automatizadas (Playwright).
