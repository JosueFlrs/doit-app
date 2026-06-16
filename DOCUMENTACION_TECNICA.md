# Documentación Técnica - Do'it

Este documento detalla la arquitectura de software, el stack tecnológico, los patrones de diseño y las decisiones técnicas implementadas en la versión *Release Candidate* de **Do'it**.

---

## 1. Arquitectura General del Sistema
La aplicación está estructurada bajo el patrón de arquitectura **SPA (Single Page Application)** basada en componentes con **React**, desacoplada por completo del servidor de base de datos. 

La solución sigue un flujo de comunicación asíncrono y distribuido en tres capas lógicas:
1. **Capa de Interfaz y Estado (Frontend):** React se encarga del renderizado dinámico del DOM. El estado global de sesión se inyecta mediante Context API, permitiendo a un componente interceptor (*Route Guard*) denegar accesos no autorizados en el cliente.
2. **Capa de Servicios Externos (APIs):** Consumo directo de endpoints REST de terceros (GeoRef de forma interna y EmailJS mediante su SDK).
3. **Capa de Persistencia e Infraestructura (BaaS):** Supabase actúa como el Backend de servicios, proveyendo la base de datos relacional y la emisión de tokens de seguridad JWT.

---

## 2. Stack Tecnológico
* **Frontend Core:** React 18, Vite (Entorno de desarrollo y empaquetador rápido).
* **Enrutamiento:** React Router DOM (Manejo de rutas declarativas).
* **Estilos y UI:** Bootstrap, CSS Modules aplicando tendencias de *Glassmorphism* (Modo Oscuro).
* **Base de Datos y Auth:** Supabase (PostgreSQL nativo).
* **Cliente HTTP:** Axios (Peticiones asíncronas optimizadas).
* **Ecosistema de Testing:** Vitest (Pruebas unitarias de componentes) y Playwright (Pruebas de regresión End-to-End).

---

## 3. Organización del Proyecto (Estructura de Carpetas)
```text
doit-app/
├── public/                 # Assets públicos (Logos e imágenes estáticas)
├── src/
│   ├── componentes/        # Componentes de UI reutilizables (Formularios, Listas)
│   │   └── __tests__/      # Pruebas unitarias de componentes (Vitest)
│   ├── contexto/           # Estados globales de la aplicación (AuthContexto.jsx)
│   ├── hooks/              # Custom Hooks para aislamiento de APIs (useMunicipios.js)
│   ├── paginas/            # Vistas principales/Rutas (Home, Login, Perfil, Publicar)
│   ├── servicios/          # Instancia y cliente de conexión con Supabase
│   ├── App.jsx             # Enrutador central y pasarela de componentes
│   ├── index.css           # Estilos CSS globales y animaciones de UI
│   └── main.jsx            # Punto de entrada de la aplicación
├── tests/                  # Suite de pruebas funcionales automatizadas (Playwright)
├── playwright.config.js    # Configuración multi-navegador de Playwright
└── vite.config.js          # Configuración del empaquetador Vite
