# Desplegar en Cloudflare Pages

Cloudflare Pages es extremadamente robusto y rápido. Permite cacheo perimetral y soporte para un tráfico inimaginable de manera enteramente gratuita para proyectos en Vanilla JS como nuestro VanillaDocs.

## Instrucciones

A continuación tienes un flujo sencillo para enganchar tu repositorio en la suite de Cloudflare:

1. Ingresa al Dashboard de **[Cloudflare](https://dash.cloudflare.com/)**. En el panel lateral, accede a **Workers & Pages**.
2. Dale al botón azul para añadir un proyecto presionando en **"Create Application"** > ve a la pestaña superior derecha llamada **"Pages"** > dale a **"Connect to Git"**.
3. Da permisos a Github o GitLab, escoge el repositorio de `VanillaDocs` de tu listado privado y dirígete al paso de inicializar (presionando `Begin setup`).
4. Te presentará un asistente llamado `Set up builds and deployments`:
   - En *Project Name*: Cloudflare le dará de forma automática un identificador limpio, normalmente el que ya tenías en tu repositorio en minúsculas. 
   - En *Production Branch*: escoge tu rama principal (`main`).
   - En *Framework Preset*: despliega la persiana y presiona en **"None"**.
   - En *Build Command*: de nuevo, déjalo enteramente **vacío** puesto que no hace falta compilar VanillaDocs.
   - En *Build output directory*: este es importante, déjalo **vacío** o si Cloudflare falla requiriendo un texto, escribe `/` y guarda.
5. Clicka finalmente en el inferior que dice **Save and Deploy**.

¡Hecho! En cuestión de 20 segundos tu red de distribución de contenidos en el contorno mundial replicará el sitio y te dotará de un nombre de dominio corporativo final con latencias de carga estática ultrarrápidas, finalizado habitualmente en un formato tipo `https://tu-proyecto.pages.dev`.
