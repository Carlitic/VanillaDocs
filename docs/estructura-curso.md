# Estructura de un Curso o Módulo

Cuando tu documentación crece mucho, no es buena idea poner *todos* los archivos en la barra lateral principal. La mejor forma de organizarlo en **VanillaDocs** es usar el patrón de **"Páginas Hub"** (o índices maestros).

Una Página Hub es simplemente un archivo Markdown que actúa como un índice para agrupar otros archivos relacionados bajo una misma temática o curso.

---

## 🛠️ ¿Cómo crearlo?

Imagina que tienes un curso con 20 temas diferentes. Para organizarlo bien:

1. **Crea la página Hub:** Crea un archivo llamado, por ejemplo, `mi-curso.md`.
2. **Enlázalo desde la Portada:** En tu `index.md`, crea una tarjeta que apunte a `<a href="mi-curso.md">`.
3. **Agrupa los contenidos:** Dentro de `mi-curso.md`, crea listas en Markdown (como la que ves abajo) que enlacen a los documentos individuales de los temas.

Al hacer clic en cualquiera de estos enlaces, el routing de VanillaDocs cargará la página correspondiente sin recargar la web.

---

## 📋 Ejemplo de Estructura Visual

Aquí tienes un ejemplo de cómo se vería tu archivo Hub. Puedes usar títulos (`##`) y listas simples (`*`) para organizar bloques masivos de información:

### Módulo 1: Introducción a la Herramienta
* 📄 [Guía de inicio rápido e instalación](getting-started.md)
* ✨ [Lista de características y funciones](features.md)
* 💎 [Escribir rápido usando Obsidian](obsidian.md)

### Módulo 2: Técnicas Avanzadas
* 📊 [Creación de diagramas con Mermaid](diagrams.md)
* 🔗 [Cómo funciona el sistema de routing](routing.md)
* ⚙️ [Referencia API para desarrolladores](api.md)

### Módulo 3: Opciones de Despliegue
* 🚀 [Despliegue automático en Vercel](deploy-vercel.md)
* 🐙 [Alojamiento web con GitHub Pages](deploy-github-pages.md)
* ☁️ [Despliegue global en Cloudflare](deploy-cloudflare.md)

---

::: tip Consejo de Organización
Si tienes muchos archivos para un mismo módulo, puedes organizarlos también en subcarpetas dentro de `docs/`. 

Por ejemplo, si tienes un archivo en `docs/modulo-1/teoria.md`, tu enlace en esta página Hub sería simplemente `[Teoría de Módulo 1](modulo-1/teoria.md)`. VanillaDocs resolverá las rutas automáticamente.
:::
