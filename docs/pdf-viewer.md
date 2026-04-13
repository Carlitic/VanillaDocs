# Visor de PDFs

VanillaDocs permite visualizar archivos PDF (y HTML) directamente en la página de documentación.

## Cómo Usar

### 1. Agregar archivos

Coloca tus archivos PDF o HTML en la carpeta `docs/pdfs/`:

```
docs/
├── pdfs/
│   ├── manual.pdf
│   ├── guia-rapida.pdf
│   └── documento.html
├── index.md
└── config.yml
```

### 2. Insertar en el contenido

Usa la sintaxis de bloque ````pdf` en tu archivo .md:

```markdown
## Manual de Usuario

````pdf
manual.pdf
````

## Guía Rápida

````pdf
guia-rapida.pdf
````
```

## Resultado

Se renderiza un visor con:

| Elemento | Descripción |
|----------|-------------|
| **Iframe** | Muestra el contenido del archivo |
| **Título** | Nombre del archivo sin extensión |
| **Descargar** | Botón para descargar el archivo |

### Ejemplo visual

```
┌─────────────────────────────────────────┐
│  📄 manual                      ⬇ Descargar│
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐  │
│ │                                     │  │
│ │         [PDF en iframe]             │  │
│ │                                     │  │
│ └─────────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Soporte de archivos

| Tipo | Extensión | Descripción |
|------|-----------|-------------|
| PDF | `.pdf` | Archivos PDF |
| HTML | `.html` | Páginas HTML (para documentación) |

## Ejemplo completo

```markdown
# Mi Proyecto

## Documentación

````pdf
manual.pdf
````

## API Reference

````pdf
referencia-api.pdf
````
```

## Notas

- Los archivos deben estar en la carpeta `docs/pdfs/`
- Solo se muestra un visor por bloque ````pdf``
- El visor incluye scroll para navegar
- El botón descargar abre el archivo directamente

## Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `/` | Buscar |

| `Esc` | Cerrar modal |
| `Ctrl+P` | Imprimir página actual |

---

**VanillaDocs** - Visor de Documentación Minimalista