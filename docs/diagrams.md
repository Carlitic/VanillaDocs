# Diagramas con Mermaid.js

VanillaDocs tiene soporte nativo para **Mermaid.js**, lo que te permite crear diagramas visuales directamente en tus archivos Markdown sin necesitar herramientas externas ni imágenes.

Simplemente escribe un bloque de código usando ` ```mermaid ` como lenguaje y el sistema lo renderizará automáticamente.

---

## Diagrama de Flujo (Flowchart)

Ideal para representar procesos, decisiones o flujos de datos.

```mermaid
flowchart TD
    A([🚀 Usuario abre la app]) --> B[Carga index.html]
    B --> C{¿Existe nav.yml?}
    C -- Sí --> D[Parsear YAML]
    C -- No --> E[⚠️ Mostrar error]
    D --> F[Construir Sidebar]
    F --> G[Cargar index.md]
    G --> H[Renderizar Markdown]
    H --> I{¿Hay bloques Mermaid?}
    I -- Sí --> J[Renderizar diagramas]
    I -- No --> K
    J --> K[✅ Página lista]

    style A fill:#2563eb,color:#fff,stroke:none
    style K fill:#16a34a,color:#fff,stroke:none
    style E fill:#dc2626,color:#fff,stroke:none
```

---

## Diagrama de Secuencia

Perfecto para documentar APIs, autenticación o interacciones entre servicios.

```mermaid
sequenceDiagram
    actor Usuario
    participant App as VanillaDocs App
    participant Cache as Caché Local
    participant API as Servidor de Archivos

    Usuario->>App: Hace clic en una sección
    App->>Cache: ¿Está en caché?
    alt Contenido en caché
        Cache-->>App: ✅ Retorna contenido cacheado
    else No en caché
        App->>API: GET /docs/pagina.md
        API-->>App: 200 OK + contenido Markdown
        App->>Cache: Guarda en caché
    end
    App->>Usuario: Renderiza la página
```

---

## Diagrama de Clases

Útil para documentar arquitectura de software o modelos de datos.

```mermaid
classDiagram
    class DocsViewer {
        +String currentPath
        +String theme
        +Object contentCache
        +init()
        +loadContent(path)
        +toggleTheme()
        +highlightCode()
    }

    class NavigationManager {
        +Object navConfig
        +loadNavigation()
        +buildSidebar()
        +navigateTo(path)
    }

    class SearchEngine {
        +Array searchIndex
        +buildIndex()
        +handleSearch(query)
        +showResults()
    }

    DocsViewer --> NavigationManager : usa
    DocsViewer --> SearchEngine : usa
```

---

## Diagrama de Estado (State Diagram)

Representa el ciclo de vida de un objeto o proceso.

```mermaid
stateDiagram-v2
    [*] --> Cargando
    Cargando --> Listo : Archivos cargados
    Cargando --> Error : Fallo en la red

    Listo --> Navegando : Usuario hace clic
    Navegando --> Cargando : Cargando nueva página
    Navegando --> Buscando : Usuario escribe en búsqueda

    Buscando --> Listo : ESC o clic fuera
    Buscando --> Navegando : Selecciona resultado

    Error --> Cargando : Reintentar
    Error --> [*] : Abandonar

    Listo --> [*]
```

---

## Diagrama de Gantt (Planificación de Proyecto)

Ideal para roadmaps o cronogramas de desarrollo.

```mermaid
gantt
    title Roadmap de VanillaDocs
    dateFormat YYYY-MM-DD
    section Núcleo
        Visor Markdown       :done,    core1, 2024-01-01, 2024-01-15
        Sistema de Temas     :done,    core2, 2024-01-10, 2024-01-20
        Barra de Búsqueda    :done,    core3, 2024-01-18, 2024-02-01
    section Plugins
        Diagramas Mermaid    :done,    plug1, 2024-02-01, 2024-02-10
        Visor PDF            :done,    plug2, 2024-02-08, 2024-02-20
        Code Tabs            :done,    plug3, 2024-02-18, 2024-03-01
    section Integraciones
        Deploy Vercel        :done,    dep1, 2024-03-01, 2024-03-05
        Deploy Cloudflare    :done,    dep2, 2024-03-03, 2024-03-08
        Deploy GitHub Pages  :active,  dep3, 2024-03-06, 2024-03-12
    section Futuro
        Modo Multidioma      :         fut1, 2024-04-01, 2024-04-20
        Plugin de Comentarios:         fut2, 2024-04-15, 2024-05-01
```

---

## Diagrama de Pastel (Pie Chart)

Para mostrar distribuciones o estadísticas de forma visual.

```mermaid
pie title Tecnologías usadas en VanillaDocs
    "Vanilla JavaScript" : 55
    "CSS3" : 25
    "HTML5" : 10
    "Librerías CDN" : 10
```

---

## Cómo Usarlo

Inserta cualquiera de estos diagramas en tus archivos `.md` envueltos en un bloque de código `mermaid`:

````markdown
```mermaid
flowchart LR
    A[Mi nodo] --> B[Otro nodo]
```
````

::: tip
Visita [mermaid.js.org](https://mermaid.js.org/) para explorar todos los tipos de diagramas disponibles y su sintaxis completa.
:::

::: info
Los diagramas se renderizan en el cliente usando **Mermaid.js** directamente desde el navegador. No necesitas ningún servidor ni proceso de compilación.
:::
