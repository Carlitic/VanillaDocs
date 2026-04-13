# Manual de Usuario - VanillaDocs

Este es un archivo PDF de ejemplo para VanillaDocs.

## Cómo usar PDFs en tu documentación

### 1. Agregar archivos PDF

Coloca tus archivos PDF en la carpeta `docs/pdfs/`:

```
docs/
├── pdfs/
│   ├── manual.pdf
│   ├── guia.pdf
│   └── api.pdf
```

### 2. Insertar en el contenido

Usa la sintaxis de bloque ````pdf` en tu archivo .md:

```markdown
## Manual

````pdf
manual.pdf
````
```

### 3. Resultado

Se renderiza un visor con:
- **Iframe** mostrando el PDF
- **Título** del archivo
- **Botón descargar** para guardar el PDF

## Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `/` | Buscar |

| `Esc` | Cerrar modal |

---

VanillaDocs - Visor de Documentación Minimalista