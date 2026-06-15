# Guía de Usuario - Do'it

Bienvenido a la Guía de Usuario de **Do'it**. Este documento provee las instrucciones necesarias para que el cuerpo docente pueda comprender el flujo de negocio, los tipos de usuario y las funciones principales de la plataforma.

---

## 1. Objetivo de la Aplicación
**Do'it** es una plataforma web ágil y moderna diseñada para conectar de forma directa a personas que necesitan resolver tareas cotidianas o contrataciones de oficios en la provincia de Mendoza, con trabajadores independientes dispuestos a realizarlas. El sistema busca reducir la brecha del empleo informal mediante un entorno intuitivo y transparente.

## 2. Perfil de Usuario (Tipos de Usuario)
La plataforma unifica ambas necesidades en una cuenta común, permitiendo que un mismo usuario actúe en dos roles según su necesidad:
* **El Ofertante / Anunciante:** Ciudadano que posee una necesidad específica (ej. reparaciones domésticas, fletes, paseos) y publica una oferta detallando la tarea y el presupuesto dispuesto a pagar.
* **El Postulante / Prestador:** Trabajador independiente u oficiante que explora la plataforma en busca de ofertas que coincidan con sus habilidades para ofrecer sus servicios de forma directa.

---

## 3. Explicación de las Funciones Principales

1. **Autenticación Segura (Auth):** Registro e inicio de sesión de usuarios para proteger la integridad de las publicaciones.
2. **Buscador de Ofertas (*Home*):** Panel principal donde se listan de forma pública y cronológica los trabajos disponibles en Mendoza mediante tarjetas dinámicas.
3. **Formulario de Publicación:** Interfaz exclusiva para usuarios logueados que permite dar de alta una nueva necesidad laboral.
4. **Selector Geográfico Validado:** Menú desplegable que consume datos oficiales para asegurar que la zona de trabajo exista legalmente.
5. **Módulo de Postulación Real:** Botón interactivo en cada oferta que abre un formulario de contacto para enviar propuestas de trabajo en tiempo real.
6. **Panel de Gestión (*Mi Perfil*):** Espacio privado donde el usuario visualiza, edita o elimina (CRUD) sus propios anuncios publicados.

---

## 4. Pasos Básicos de Uso (Flujos Principales)

### Flujo A: Publicar un Trabajo (Rol Anunciante)
1. Ingrese a la plataforma y haga clic en **Ingresar**. Si no posee cuenta, vaya a la pestaña **Crear Cuenta** y regístrese.
2. Una vez autenticado, presione el botón **+ Publicar Trabajo** en la barra de navegación superior.
3. Complete los campos requeridos:
   * *Título de la oferta* (ej: "Necesito pintor para habitación").
   * *Presupuesto sugerido* (debe ser un valor numérico coherente).
   * *Seleccione el Municipio* (poblado asíncronamente por la API).
   * *Descripción detallada* de las tareas a realizar.
4. Haga clic en **Publicar**. El sistema lo redirigirá a la pantalla principal donde verá su anuncio al inicio de la lista.

### Flujo B: Postularse a un Trabajo (Rol Prestador)
1. Explore la pantalla de inicio para visualizar los anuncios disponibles.
2. Identifique una oferta de su interés y haga clic en el botón azul **Postularse**.
3. Se desplegará un modal flotante. Ingrese su *Nombre Completo*, un *Teléfono de contacto* válido y una breve *Propuesta o presentación* explicando por qué es el indicado.
4. Presione **Enviar Postulación**. El sistema procesará el envío y notificará por correo electrónico al creador del anuncio de forma automatizada.

### Flujo C: Cerrar Sesión Seguro
1. Haga clic en el botón **Salir** del Navbar flotante.
2. Confirme la acción en el cuadro de diálogo para evitar cierres accidentales. El sistema mostrará una animación de despedida y lo redirigirá de forma segura al Login.
