# AGENTS.md - Guía para VanillaDocs

## Nombre del Proyecto
**VanillaDocs** - Visor de Documentación Minimalista

## Stack Tecnológico Exclusivo
- **HTML5**: Semántico, zero frameworks
- **CSS3**: Puro, sin preprocessors  
- **JavaScript**: Vanilla JS (ES5+), sin frameworks
- **Librerías CDN**: Solo marked.js y js-yaml permitidas

## Estructura de Archivos
```
VanillaDocs/
├── index.html          # Punto de entrada
├── styles.css          # Estilos CSS3 puro
├── script.js           # Lógica Vanilla JS
├── favicon.svg         # Icono del proyecto
├── docs/               # Documentación
│   ├── index.md        # Home
│   ├── getting-started.md
│   ├── api.md
│   └── config.yml      # Navegación
└── AGENTS.md           # Esta guía
```

## Reglas Estrictas de Implementación

### HTML5 Semántico
```html
<!-- MAL ❌ -->
<div class="nav"></div>

<!-- BIEN ✅ -->  
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#" data-path="section.md">Sección</a></li>
  </ul>
</nav>
```

### CSS3 Puro - Patrones Prohibidos
```css
/* MAL ❌ - Frameworks externos */
@import "tailwind.css";
.button { @apply bg-blue-500; }

/* BIEN ✅ - CSS nativo */
:root {
  --primary-color: #2563eb;
  --spacing: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}
```

### JavaScript Vanilla - Patrones
```javascript
// MAL ❌ - Frameworks
import React from 'react';
const app = Vue.createApp();

// BIEN ✅ - Vanilla ES6+
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/+esm';

class DocsViewer {
  async loadContent(path) {
    const response = await fetch(path);
    return await response.text();
  }
}
```

## Comandos y Flujos de Trabajo

### Desarrollo Local
```bash
# Servidor local simple
python3 -m http.server 8000

# O con http-server
npx http-server -p 8000 -c-1
```

### Estructura de Navegación (docs/config.yml)
```yaml
nav:
  - title: Introducción
    path: index.md
  - title: Empezando
    path: getting-started.md
  - title: API
    path: api.md
```

## Convenciones de Código

### Nomenclatura
- Variables: `camelCase`
- Clases: `PascalCase` 
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case`
- Selectores CSS: `kebab-case`

### Enrutamiento Simplificado
- Usar `#nombre-archivo` (sin .md) en URLs
- Paths relativos desde carpeta `docs/`
- Fallback automático a `index.md` en errores
- Validación de paths para seguridad
- History API para navegación sin recargas

**Ejemplo URLs:**
```
/#index              → docs/index.md
/#getting-started    → docs/getting-started.md  
/#api                → docs/api.md
```

### Organización de Imports
```javascript
// 1. Librerías externas (CDN)
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/+esm';

// 2. Módulos nativos
import { } from './modules/utils.js';

// 3. Estilos
import './styles.css';
```

### Manejo de Errores
```javascript
// Siempre usar try/catch con async/await
try {
  const response = await fetch('docs/content.md');
  if (!response.ok) throw new Error('HTTP error');
  const content = await response.text();
} catch (error) {
  console.error('Error loading content:', error);
  // Fallback automático a index.md
  if (path !== 'index.md') {
    this.loadContent('index.md');
  }
}
```

### Validación de Paths
```javascript
// Prevenir path traversal y asegurar .md
validatePath(path) {
  let cleanPath = path.replace(/\/\.\.\//g, '').replace(/\.\./g, '');
  if (!cleanPath.endsWith('.md')) cleanPath += '.md';
  if (!cleanPath.match(/^[a-zA-Z0-9_\-\.]+\.md$/)) return 'index.md';
  return cleanPath;
}
```

### Performance
- Lazy loading de contenido
- Debounce para búsquedas (300ms)
- Cache responses con localStorage
- Intersection Observer para imágenes
- Minimizar repaints/reflows

### Responsive Design
- Mobile-first con CSS Grid
- Breakpoints: 320px, 768px, 1024px
- Hamburger menu para móviles
- Touch-friendly interfaces
- Preferir REM sobre PX

## Accesibilidad (WCAG AA)

### Requisitos Mínimos
- ✅ Navegación por teclado
- ✅ Lectores de pantalla
- ✅ Alto contraste
- ✅ Textos alternativos
- ✅ Focus visibility
- ✅ Semántica HTML5

### Patrones ARIA
```html
<nav aria-label="Navegación principal">
  <button aria-expanded="false" aria-controls="menu">
    Menú
  </button>
</nav>
```

## Security Considerations

### XSS Prevention
- Sanitize Markdown output
- Escape user-generated content
- Content Security Policy headers
- Avoid innerHTML con user input

### Data Handling
- Never store secrets in code
- Validate all fetched content
- Use HTTPS for CDN resources
- Sanitize URLs and paths

## Testing Approach

### Testing Strategy
- Manual testing en múltiples navegadores
- Validación HTML/CSS con linters
- Performance con Lighthouse
- Accessibility con axe-core

### Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ❌ IE11 (no soportado)

## Deployment

### Static Hosting
- GitHub Pages
- Netlify
- Vercel
- Surge.sh
- Any CDN

### Build Process
- Zero build process
- Solo copiar archivos estáticos
- Opcional: minificación CSS/JS
- Opcional: compresión GZIP

## Monitoring & Analytics

### Performance Metrics
- Largest Contentful Paint (LCP)
- First Input Delay (FID)  
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

### Error Tracking
- Console error logging
- Network error handling
- User feedback mechanism

## Maintenance Guidelines

### Code Quality
- Consistent formatting
- Descriptive variable names
- Modular architecture
- Comprehensive comments

### Documentation
- Keep AGENTS.md updated
- Maintain code comments
- Update config examples
- Changelog for changes

---

**Última actualización**: 2024-04-05  
**Versión**: 1.0.0  
**Estado**: Activo