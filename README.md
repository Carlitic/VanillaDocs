# VanillaDocs

**VanillaDocs** es un visor de documentación minimalista, asombrosamente rápido y ligero, construido utilizando únicamente tecnologías web nativas (**Vanilla JS, HTML5 y CSS3**). No requiere un proceso de compilación complejo ni frameworks pesados. Simplemente escribe en Markdown y disfruta de tus documentos con una experiencia de usuario moderna.

## ✨ Características Principales

VanillaDocs incluye todo lo necesario para presentar artículos técnicos, documentación de APIs y guías, con una estética pulida y un conjunto robusto de características:

- 📝 **Soporte Completo de Markdown:** Impulsado por *marked.js*.
- 🎨 **Resaltado de Sintaxis:** Código coloreado automáticamente mediante *Prism.js* (soporta docenas de lenguajes).
- 🌓 **Modo Oscuro / Claro:** Alternancia rápida de temas gestionada en el navegador y con persistencia.
- 🔍 **Búsqueda Integrada:** Motor de búsqueda full-text que indexa y encuentra coincidencias en tus documentos en tiempo real.
- 📑 **Navegación Dinámica (TOC):** Tabla de contenidos que se genera automáticamente basándose en los encabezados de tu Markdown.
- 🗂 **Configuración mediante YAML:** Define toda tu estructura de navegación en un práctico archivo `config.yml`.
- ⚠️ **Callouts/Admonitions:** Soporte personalizado para destacar notas, advertencias, trucos y peligro (`::: note`).
- 📊 **Diagramas de Mermaid:** Soporte nativo para renderizar increíbles diagramas de flujo y otros gráficos (`language-mermaid`).
- 💻 **Pestañas de Código:** Muestra código en múltiples lenguajes usando un diseño de pestañas si es necesario.
- 🖼 **Image Lightbox:** Visualización ampliada para las imágenes de tu documentación.
- 📄 **Visor PDF Integrado:** Embebe PDFs directamente usando sintaxis especial.
- 📱 **PWA Compatible:** Soporte de Service Worker para lectura offline.

## 🚀 Empezando Rápido

1. **Clona o descarga el repositorio:**
   Ubica los archivos en el directorio donde alojarás tu sitio.

2. **Inicia el Servidor de Desarrollo Local:**
   Debido a cómo los navegadores manejan las peticiones CORS al requerir módulos, necesitarás un servidor local.
   
   Puedes ejecutar el script proporcionado:
   ```bash
   ./start-server.sh
   ```
   *O alternativamente, usando npx:*
   ```bash
   npx http-server -p 3000 -c-1 --cors
   ```

3. **Visita en tu navegador:**
   Navega a [http://localhost:3000](http://localhost:3000)

4. **Edita y Crea Contenido:**
   - Modifica el archivo `docs/config.yml` para gestionar la estructura de menús de tu sitio de documentación.
   - Añade tus páginas Markdown dentro de la carpeta `docs/`.

## 📂 Estructura del Proyecto

```text
VanillaDocs/
├── docs/                 # Tus archivos Markdown vivirán aquí
│   ├── config.yml        # Configuración de navegación de la barra lateral
│   ├── index.md          # Página de inicio por defecto
│   ├── api.md
│   ├── getting-started.md
│   └── features.md
├── index.html            # Visor principal de la app
├── script.js             # Lógica Vanilla JS principal de la app
├── styles.css            # Hoja de estilos con variables CSS ajustables
├── sw.js                 # Service Worker para capacidades Offline (PWA)
└── start-server.sh       # Script bash rápido para arrancar un servidor HTTP
```

## 🛠 Tecnologías Utilizadas

- **HTML5 & CSS3** puros para la vista base.
- **JavaScript (Vanilla)**.
- Dependencias cargadas por CDN:
  - [Marked.js](https://marked.js.org/)
  - [JS-YAML](https://github.com/nodeca/js-yaml)
  - [Prism.js](https://prismjs.com/)
  - [Mermaid.js](https://mermaid-js.github.io/mermaid/)

## 📝 Licencia

Este proyecto se proporciona tal cual, libre para uso y modificación según tus propias necesidades de documentación.
