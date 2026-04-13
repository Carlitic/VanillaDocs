# Desplegar en Vercel

Vercel es una de las plataformas líderes para el despliegue de sitios estáticos y provee distribución global automática desde el primer momento. Alojar VanillaDocs en Vercel te tomará un par de minutos.

## Requisitos previos

- Una cuenta en [Vercel](https://vercel.com/) (puedes crearla vinculando tu GitHub).
- Tener VanillaDocs guardado en un repositorio en Github, GitLab, o Bitbucket.

## Guía Pormenorizada

### Paso 1: Importar Repositorio
1. Inicia sesión en tu cuenta de Vercel y dirígete al panel (`Dashboard`).
2. Haz clic en el botón de **"Add New"** > **"Project"**.
3. Verás una lista con tus repositorios de GitHub. Permite el acceso e **Importa** el repositorio que contenga tu código de VanillaDocs.

### Paso 2: Configurar Proyecto

Una vez seleccionado, aparecerá una pantalla de configuración (`Configure Project`):

- **Project Name:** Nombre que tendrá tu subdominio (ej. `mi-documentacion`).
- **Framework Preset:** Dado que VanillaDocs es completamente una aplicación estática independiente y no usa gestores de carga NodeJS (no requiere compilación build previa), puedes dejar este apartado establecido en **"Other"**.
- **Root Directory:** `./` (Déjalo idéntico para que use la ruta raíz).
- **Build and Output Settings:** Deberán estar completamente **vacíos** o en sus valores por defecto (No se necesita ejecutar comando build, el contenido es enteramente estático y Vercel servirá todos los archivos tal cual los subiste).

### Paso 3: Despliegue

Haz clic en el botón gigante de **Deploy**. Vercel leerá tus archivos, creará automáticamente la estructura web en la CDN y te asignará una URL personalizada (como `https://mi-documentacion.vercel.app`).

::: tip Integración Continua (CI)
Vercel mantendrá una sincronización automática. Cada vez que decidas añadir nuevos archivos `.md` o corregir erratas en `docs/config.yml` y realices un `git push` a tu repositorio principal (`main`), Vercel desplegará los cambios instantáneamente de forma silenciosa.
:::
