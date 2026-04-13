# Desplegar en GitHub Pages

Dado que VanillaDocs es completamente estático (Vanilla JS, HTML5, CSS y Markdown puro), encaja de maravilla con el tier cien por cien gratuito que provee GitHub Pages para exponer la documentación de tus repositorios de Github al resto de la comunidad. 

## Preparación

Verifica que todo el proyecto ya se encuentra en un repositorio en tu perfil de **GitHub**.

## Configurar el repositorio

### Método Clásico (Seleccionando la Rama)

La forma más genérica de activar Github Pages no requiere pipelines y se realiza directamente en la interfaz.

1. Ve a tu repositorio de `VanillaDocs` en GitHub.
2. Navega hacia la pestaña superior llamada **Settings (Ajustes)**.
3. Desliza hacia abajo en el panel izquierdo y dale clic a **Pages**.
4. Ahora, bajo la sección de **"Build and deployment"**:
   - En *Source*, asegúrate de seleccionar **Deploy from a branch**.
   - En *Branch*, selecciona la rama principal donde tengas hospedado el visor (generalmente llamada `main` o `master`).
   - Deja fijada la opción del directorio (la carpeta que se expone el servidor de lado) en `/ (root)`.
5. Aprieta el botón de confirmar y **Save**.

Github Pages empezará el proceso de publicación automáticamente. El proceso suele durar un de 1 a 3 minutos la primera vez, puedes monitorizar su avance picando en la pestaña exterior **"Actions"** de tu repositorio. Cuando dicho bot termine el trabajo en cascada, te proporcionará un enlace web similar al formato: `https://tu-usuario.github.io/VanillaDocs/`

::: warning Importancia del PWA y Service Worker en Github Pages
Al usar VanillaDocs en repositorios de subrutas en GitHub (ej: `...github.io/Tu_Rep/`) hay que tener cuidado. En local todo funciona genial bajo la raíz `/`, pero si VanillaDocs está dentro de una ruta subdirectorio de Github, asegúrate de que el URL base no se rompe y los archivos referidos están localizados en enlaces relativos `.` (como usa de hecho actualmente el proyecto).
:::
