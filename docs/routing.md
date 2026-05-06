# Sistema de Routing e Hipervínculos

VanillaDocs utiliza un sistema de enrutamiento (routing) avanzado en **Vanilla JS**. Esto significa que es una aplicación SPA (Single Page Application): al navegar entre páginas, no se recarga toda la ventana del navegador, lo que permite una experiencia ultrarrápida y libre de parpadeos.

## ¿Cómo funcionan los enlaces?

El motor principal (`script.js`) intercepta todos los clics que el usuario hace en el contenido de la documentación. Su regla es muy sencilla: **Si el enlace termina en `.md`, VanillaDocs se encarga de cargarlo.**

### Creando Enlaces en Markdown

Si estás escribiendo documentación normal en Markdown y quieres enlazar a otro archivo de tu proyecto, simplemente usa la sintaxis estándar de Markdown apuntando al archivo:

```markdown
Para ver cómo instalar, ve a la [Guía de Inicio](getting-started.md).
```

### Creando Enlaces con HTML (Ej. Tarjetas de Portada)

La página de inicio (`index.md`) utiliza tarjetas interactivas construidas con código HTML para lograr un diseño más avanzado. 

Si quieres crear un botón o una tarjeta que navegue hacia otro documento, debes asegurarte de que el atributo `href` apunte **exactamente al nombre del archivo `.md`**, sin el símbolo `#` ni barras de directorio.

```html
<!-- ✔️ CORRECTO: El sistema capturará el clic y cargará 'features.md' sin recargar -->
<a href="features.md" class="course-card">
  <h3>Características</h3>
  <p>Ver todas las funciones</p>
</a>

<!-- ❌ INCORRECTO: Recargará la página por completo buscando un archivo en el servidor -->
<a href="/docs/features.md" class="course-card">...</a>

<!-- ❌ INCORRECTO: Dará un error de ruta no encontrada -->
<a href="#features.md" class="course-card">...</a>
```

## Navegación desde la Portada (Landing Page)

Cuando te encuentras en `index.md`, VanillaDocs se pone automáticamente en "Modo Landing Page", ocultando la cabecera y el menú lateral para dar protagonismo absoluto al diseño visual.

Al hacer clic en cualquier tarjeta válida (ej. `<a href="api.md">`), el router realizará las siguientes acciones:

1. **Previene la recarga** del navegador.
2. Hace una petición asíncrona (`fetch`) para traer el archivo `api.md`.
3. Convierte el Markdown en HTML usando Marked.js.
4. **Desactiva el Modo Landing**, volviendo a mostrar instantáneamente la barra lateral de navegación y el índice (TOC).
5. Cambia la URL en la barra de direcciones del navegador.

¡Todo esto ocurre en cuestión de milisegundos!

## Enlaces Externos

Si necesitas enlazar a una página web externa, usa el `http://` o `https://`. VanillaDocs detectará que es un dominio externo y permitirá que el navegador lo abra normalmente (o en una nueva pestaña si usas `target="_blank"`).

```markdown
Síguenos en [GitHub](https://github.com/Carlitic/VanillaDocs).
```

```html
<a href="https://ejemplo.com" target="_blank" class="mi-boton">Visitar sitio</a>
```
