# Características

VanillaDocs soporta más que simplemente renderizar Markdown convencional. A continuación se presentan las extensiones construidas sobre el sistema para potenciar la técnica u oficio de escribir documentación.

## 1. Syntax Highlighting

Gracias a Prism.js, los bloques de código automáticamente incluyen resaltado de sintaxis, junto a un botón de "copiado" automático en su variante Vanilla Custom.

```javascript
// Un ejemplo sencillo de JavaScript
function holaMundo(nombre) {
    return `¡Hola ${nombre}!`;
}

console.log(holaMundo("VanillaDocs"));
```

## 2. Callouts (Admonitions)

La herramienta amplía el markdown para dar soporte a alertas tipo bloque. Usa el prefijo `:::` en conjunto con uno de los tipos aceptados.

::: info
Este es un bloque informativo. Útil para información complementaria.
:::

::: tip
¡Consejo de Pro! Este diseño suele llamar mucho la atención positivamente.
:::

::: warning
Esto es una advertencia. Ideal para denotar comportamiento inesperado o limitaciones del componente.
:::

::: danger
Mensajes de peligro o crítica inminente.
:::

::: note
Las notas estándar ayudan a mantener información que debe ser leída antes de usar ciertos comandos.
:::

## 3. Pestañas de Código Múltiple (Code Tabs)

Si tienes un bloque de código y quieres mostrar un lenguaje, es fácil. Pero si se define el lenguaje usando identificadores concretos del motor de marcado, automáticamente obtendrá una envoltura visual moderna (code-tabs) gracias a JavaScript:

```python
# Ejemplo de código en pestañas
print("Hola mundo dedse Python")
```

```java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("Hola desde Java!");
    }
}
```

## 4. Búsqueda Rápida

Usa la barra a tu izquierda en el Sidebar. Busca contenido tanto en los títulos como en texto dentro de tus `*.md`. Está indexado al vuelo, así que no necesitas ningún servidor backend, bases de datos o indices costosos en ElasticSearch.

**Atajo Global:** Presiona la tecla `/` desde tu teclado numérico o regular y saltarás inmediatamente a la caja de búsqueda.

## 5. Diagramas (Mermaid.js)

¡Puedes incrustar diagramas visuales en el mismo Markdown sin salir de la vista previa! Escribe bloques de código y asígnales el "lenguaje" *mermaid*.

```mermaid
graph TD;
    A[Cliente de Navegador] --> B{Enrutador Local (Hash)};
    B --> C[Markdown Parse];
    B --> D[Config YAML Parse];
    C --> E[Visualización en UI];
    D --> F[Construcción del Sidebar];
```

## 6. Table of Contents (TOC) Dinámico y Scrollspy

Revisa el panel de tu derecha. Cada etiqueta Markdown `## H2` y `### H3` se mapea dinámicamente y se registra al instante para mantener un enlace rápido e identificativo.

A medida que haces scroll, ¡la pestaña actualizara qué sección estás leyendo (Scrollspy interactivo)! Es tan orgánico que dudarás si era Vanilla JS.

## 7. Incrustado de PDFs

Añadir documentos PDF dentro de tus artículos es sumamente sencillo en VanillaDocs. El sistema generará una caja de visualización (iframe) con el reproductor junto con un botón extra de descarga.

Para **incrustar un PDF**, simplemente crea un bloque de código indicando que el lenguaje es `pdf` y escribe adentro el nombre del archivo o su ruta.

### Pasos a seguir:

1. **Guarda el documento:** Coloca el archivo PDF que desees mostrar (por ejemplo, `manual.pdf`) en la carpeta especial `docs/pdfs/`.
2. **Escribe el bloque:** Ve a cualquier página Markdown y añade lo siguiente:

````markdown
```pdf
manual.pdf
```
````

¡Y listo! Automáticamente se creará el visor. 

### Resolviendo el 'Lío' con Múltiples PDFs

Si tienes decenas de PDFs para múltiples clientes o temas, **no tienes que amontonarlos todos sueltos** en la misma carpeta raíz, puedes usar subcarpetas libremente para no causar un lío.

Por ejemplo, si guardas un documento en `docs/pdfs/2026/reportes/abril.pdf`, sólo especifica su ruta parcial:

````markdown
```pdf
2026/reportes/abril.pdf
```
````

También, si prefieres alojar el PDF externamente (en tu servidor de AWS, Drive, etc) simplemente engancha la URL completa y VanillaDocs lo identificará:

````markdown
```pdf
https://mis-archivos.com/documento-tecnico.pdf
```
````