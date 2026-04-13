# Referencia API Interna

Aunque **VanillaDocs** tiene el objetivo de ser sencillo en superficie, su modularidad y estructura orientada a componentes permiten personalización extensa para desarrolladores al manipular el objeto `DocsViewer` subyacente.

## Objeto Global: `DocsViewer`

El visor interactúa con el DOM mediante un objeto singleton que puedes acceder directamente en ventana si requieres depurarlo en consola o expandirlo mediante un plugin.

```javascript
// Obtiene el objeto principal
console.log(window.docsViewer);
```

### Propiedades Destacadas

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `currentPath` | `String` | Contiene el path de la página markdown renderizada actualmente. (ej. `'index.md'`) |
| `navConfig` | `Object` | Retorna la interpretación en memoria de todo el objeto leído desde `config.yml`. |
| `searchIndex` | `Array` | Listado que almacena el índice total de búsqueda precompilado que hace el cliente al llegar en primera instancia. |
| `theme` | `String` | Tema actual cargado, que corresponde al que está en el `localStorage` o default (`'light'` / `'dark'`). |

### Métodos Principales

Si necesitas orquestar interacciones en el navegador desde el lado del cliente (quizás inyectando un botón HTML propio en los headers), estos métodos te serán útiles.

#### `DocsViewer.loadContent(path)`
Fuerza a la aplicación a cargar un documento y renderizarlo asíncronamente en el canvas o panel principal.
```javascript
// Carga features.md programáticamente
window.docsViewer.loadContent('features.md');
```

#### `DocsViewer.toggleTheme()`
Invocado automáticamente por el botón del Sol/Luna del Header. Intercambia los colores generales CSS y dispara actualización de `Prism.js`.

#### `DocsViewer.handleSearch(query)`
Método responsable de tomar un string `query`, iterar sobre `searchIndex` y renderizar el popup con resultados.

## Sistema de Eventos

Durante el setup inicial se implementó un flujo customizado de control de carreras (race-condition).

- **`CDNDepsLoaded`**: Este evento es disparado en el objeto global de ventana (`window.dispatchEvent()`) tan pronto el archivo principal detecta que `marked.js` y `jsyaml` han terminado su ejecución e importación desde la CDN.

Cualquier bloque personalizado script que tengas debe inicializarse preferentemente después de escuchar este evento.