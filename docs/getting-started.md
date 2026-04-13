# Empezando

Desplegar y arrancar con **VanillaDocs** es sorprendentemente rápido. Sigue estos pasos para comenzar tu propio sitio de documentación.

## 1. Descargar o Clonar los Archivos
Puedes descargar todo el directorio y ponerlo donde más gustes. Asegúrate de tener al menos los siguientes archivos clave:
- `index.html`
- `script.js`
- `styles.css`
- La carpeta `docs/`

```bash
# Ejemplo: clonar el repositorio si estuviera git
git clone https://github.com/Carlitic/VanillaDocs.git
cd vanilladocs
```

## 2. Ejecutar de forma local

Dado que el navegador necesita cargar archivos JSON, YAML y recursos dinámicos, **necesitarás ejecutar la aplicación mediante un servidor HTTP local**, no puedes abrir directamente el archivo `index.html` con un doble clic (de lo contrario la política de CORS de importación de módulos ESM bloqueará la ejecución del script).

### Opción A (Bash script rápido)
Si estás en Linux o MacOS, simplemente usa el script adjunto:
```bash
./start-server.sh
```

### Opción B (npx)
Si tienes Node.js instalado, un método igual de efectivo es usar `http-server`:
```bash
npx http-server -p 3000 -c-1 --cors
```

Ve a `http://localhost:3000` y ¡verás VanillaDocs funcionando!

## 3. Configuración del Menú (config.yml)

Para añadir o quitar páginas de la barra lateral izquierda, simplemente abre y edita el archivo `docs/config.yml`.

```yaml
nav:
  - title: "Inicio"
    path: "index.md"
  - title: "Empezando"
    path: "getting-started.md"
  # Agrega tus propias rutas debajo:
  - title: "Mi Primer Guía"
    path: "mi-guia.md"
```
Asegúrate de que el documento `mi-guia.md` que acabas de referenciar en el path realmente exista en la carpeta `docs/`.

## 4. Estructura y Estilos CSS

Todas las variables de estilo predominantes se ubican en la parte superior del archivo `styles.css`.
Ahí puedes alterar `primary-color` para que cuadre con tu marca personal o empresa:

```css
:root {
  --primary-color: #ff5722; /* Cambiamos a Naranja */
  --primary-hover: #e64a19;
  /* ... */
}
```