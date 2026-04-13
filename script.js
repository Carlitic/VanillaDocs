// VanillaDocs - Visor de Documentación Minimalista

(function() {
    'use strict';
    
    var DocsViewer = {
        currentPath: 'index.md',
        navConfig: null,
        theme: 'light',
        searchIndex: null,
        contentCache: {},
        
        searchSVG: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
        
        init: function() {
            this.setupEventListeners();
            this.updateThemeButton();
            this.loadNavigation();
            this.loadContent(this.currentPath);
            this.setupKeyboardShortcuts();
            this.setupScrollspy();
        },
        
        updateThemeButton: function() {
            var themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) {
                themeBtn.textContent = this.theme === 'dark' ? '🌙' : '☀️';
            }
        },
        

        
        setupEventListeners: function() {
            var self = this;
            
            // Toggle menú móvil
            var menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    var sidebar = document.querySelector('.sidebar');
                    menuToggle.classList.toggle('active');
                    sidebar.classList.toggle('active');
                });
            }
            

            
            // Logo click
            var logoLink = document.querySelector('.logo-link');
            if (logoLink) {
                logoLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (window.docsViewer) {
                        window.docsViewer.loadContent('index.md');
                    }
                });
            }
            
            // Logo image error
            var logoImg = document.querySelector('.logo-img');
            if (logoImg) {
                logoImg.addEventListener('error', function() {
                    this.style.display = 'none';
                });
            }
            
            // Export PDF
            var pdfBtn = document.getElementById('export-pdf-btn');
            if (pdfBtn) {
                pdfBtn.addEventListener('click', function() {
                    window.print();
                });
            }
            
            // Theme toggle
            var themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) {
                themeBtn.addEventListener('click', function() {
                    self.toggleTheme();
                });
            }
            
            // Navegación principal del documento principal (rutas absolutas locales)
            document.addEventListener('click', function(e) {
                var docLink = e.target.closest('.documentation a');
                if (docLink) {
                    var href = docLink.getAttribute('href');
                    if (href && !href.startsWith('http') && href.endsWith('.md')) {
                        e.preventDefault();
                        var cleanPath = href.replace(/^\.\//, '').replace(/^docs\//, '');
                        self.navigateTo(cleanPath);
                        return;
                    }
                }
                
                if (e.target.matches('.nav-list a')) {
                    e.preventDefault();
                    var path = e.target.dataset.path;
                    if (path) {
                        self.navigateTo(path);
                    }
                }
                
                if (e.target.closest('.nav-prev-next a')) {
                    e.preventDefault();
                    var card = e.target.closest('.nav-prev-next a');
                    var path = card.dataset.path;
                    if (path) {
                        self.navigateTo(path);
                    }
                }
                
                // PDF Viewer - descargar
                if (e.target.closest('.pdf-download-btn')) {
                    e.preventDefault();
                    var btn = e.target.closest('.pdf-download-btn');
                    var pdfUrl = btn.dataset.pdf;
                    if (pdfUrl) {
                        var link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = pdfUrl.split('/').pop();
                        link.click();
                    }
                }
                
                // Lightbox - cerrar al hacer clic en overlay
                if (e.target.classList.contains('lightbox-overlay')) {
                    self.closeLightbox();
                }
            });
            
            // Cerrar búsqueda con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    var searchResults = document.getElementById('search-results');
                    if (searchResults && searchResults.style.display !== 'none') {
                        searchResults.style.display = 'none';
                        document.getElementById('search-input').value = '';
                    }
                    self.closeLightbox();
                }
            });
            
            // Búsqueda con debounce
            var searchTimeout = null;
            var searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(function() {
                        self.handleSearch(e.target.value);
                    }, 300);
                });

                searchInput.addEventListener('focus', function() {
                    self.showSearchResults();
                });
            }
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(e) {
                var sidebar = document.querySelector('.sidebar');
                var menuToggle = document.querySelector('.menu-toggle');
                
                if (sidebar && sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    menuToggle && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
            
            // Regenerar TOC en resize
            var tocDebounce = null;
            window.addEventListener('resize', function() {
                clearTimeout(tocDebounce);
                tocDebounce = setTimeout(function() {
                    self.generateTOC();
                }, 150);
            });
        },

        setupKeyboardShortcuts: function() {
            var self = this;
            
            document.addEventListener('keydown', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return;
                }
                
                if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    var searchInput = document.getElementById('search-input');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
                


                if (e.key === 'j') {
                    var activeLink = document.querySelector('.nav-list a.active');
                    var nextLink = activeLink ? activeLink.parentElement.nextElementSibling : document.querySelector('.nav-list li:first-child a');
                    if (nextLink) {
                        nextLink.click();
                    }
                }
                
                if (e.key === 'k') {
                    var activeLink = document.querySelector('.nav-list a.active');
                    var prevLink = activeLink ? activeLink.parentElement.previousElementSibling : document.querySelector('.nav-list li:last-child a');
                    if (prevLink) {
                        prevLink.click();
                    }
                }
            });
        },

        setupScrollspy: function() {
            var self = this;
            var tocLinks = document.querySelectorAll('.toc-sidebar #toc-nav a');
            
            if (tocLinks.length === 0) return;
            
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute('id');
                        if (id) {
                            tocLinks.forEach(function(link) {
                                link.classList.remove('active');
                                if (link.getAttribute('href') === '#' + id) {
                                    link.classList.add('active');
                                }
                            });
                        }
                    }
                });
            }, {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            });
            
            setTimeout(function() {
                var headings = document.querySelectorAll('#documentation-content h2, #documentation-content h3');
                headings.forEach(function(heading) {
                    if (heading.id) {
                        observer.observe(heading);
                    }
                });
            }, 500);
        },
        
        loadNavigation: function() {
            var self = this;
            
            fetch('./docs/config.yml')
                .then(function(response) {
                    if (!response.ok) throw new Error('Config not found');
                    return response.text();
                })
                .then(function(yamlText) {
                    self.navConfig = window.jsyaml.load(yamlText);
                    self.renderNavigation();
                    self.buildSearchIndex();
                })
                .catch(function(error) {
                    console.warn('No se pudo cargar config.yml:', error);
                    self.renderFallbackNavigation();
                });
        },

        buildSearchIndex: function() {
            var self = this;
            this.searchIndex = [];
            
            if (!this.navConfig || !this.navConfig.nav) return;
            
            this.navConfig.nav.forEach(function(item) {
                var path = item.path;
                
                if (!self.contentCache[path]) {
                    fetch('./docs/' + path)
                        .then(function(response) {
                            if (!response.ok) throw new Error('Not found');
                            return response.text();
                        })
                        .then(function(content) {
                            self.contentCache[path] = content;
                            self.searchIndex.push({
                                path: path,
                                title: item.title,
                                content: content.substring(0, 500)
                            });
                        })
                        .catch(function() {});
                } else {
                    self.searchIndex.push({
                        path: path,
                        title: item.title,
                        content: self.contentCache[path].substring(0, 500)
                    });
                }
            });
        },
        
        renderNavigation: function() {
            var navList = document.getElementById('nav-list');
            if (!navList || !this.navConfig) return;
            
            var html = '';
            this.navConfig.nav.forEach(function(item) {
                var activeClass = this.currentPath === item.path ? 'active' : '';
                html += '<li><a href="#" data-path="' + item.path + '" class="' + activeClass + '">' + item.title + '</a></li>';
            }.bind(this));
            
            navList.innerHTML = html;
        },
        
        renderFallbackNavigation: function() {
            var navList = document.getElementById('nav-list');
            if (navList) {
                navList.innerHTML = '<li><a href="#" data-path="index.md" class="active">Inicio</a></li>' +
                    '<li><a href="#" data-path="getting-started.md">Empezando</a></li>' +
                    '<li><a href="#" data-path="api.md">API</a></li>';
            }
        },

        showSearchResults: function() {
            var resultsContainer = document.getElementById('search-results');
            if (!resultsContainer) {
                resultsContainer = document.createElement('div');
                resultsContainer.id = 'search-results';
                resultsContainer.className = 'search-results';
                var searchDiv = document.querySelector('.search');
                if (searchDiv) {
                    searchDiv.appendChild(resultsContainer);
                }
            }
        },

        handleSearch: function(query) {
            var self = this;
            var searchTerm = query.toLowerCase().trim();
            var resultsContainer = document.getElementById('search-results');
            
            if (!resultsContainer) {
                this.showSearchResults();
                resultsContainer = document.getElementById('search-results');
            }
            
            if (!searchTerm) {
                resultsContainer.style.display = 'none';
                return;
            }
            
            var results = [];
            
            var navItems = document.querySelectorAll('.nav-list li');
            navItems.forEach(function(item) {
                var link = item.querySelector('a');
                var text = link.textContent.toLowerCase();
                
                if (text.includes(searchTerm)) {
                    results.push({
                        type: 'nav',
                        title: link.textContent,
                        path: link.dataset.path
                    });
                }
            });
            
            if (this.searchIndex) {
                this.searchIndex.forEach(function(item) {
                    if (item.title.toLowerCase().includes(searchTerm) || 
                        item.content.toLowerCase().includes(searchTerm)) {
                        var exists = results.some(function(r) { return r.path === item.path; });
                        if (!exists) {
                            results.push({
                                type: 'content',
                                title: item.title,
                                path: item.path
                            });
                        }
                    }
                });
            }
            
            if (results.length > 0) {
                var html = '<ul>';
                results.forEach(function(result) {
                    html += '<li><a href="#" data-path="' + result.path + '">' + 
                        '<span class="result-icon">' + (result.type === 'nav' ? '📑' : '📄') + '</span>' +
                        '<span class="result-title">' + result.title + '</span></a></li>';
                });
                html += '</ul>';
                resultsContainer.innerHTML = html;
                resultsContainer.style.display = 'block';
                
                resultsContainer.querySelectorAll('a').forEach(function(link) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        var path = this.dataset.path;
                        self.navigateTo(path);
                        resultsContainer.style.display = 'none';
                        document.getElementById('search-input').value = '';
                    });
                });
            } else {
                resultsContainer.innerHTML = '<p class="no-results">No se encontraron resultados</p>';
                resultsContainer.style.display = 'block';
            }
        },

        preprocessMarkdown: function(markdown) {
            var self = this;
            
            markdown = markdown.replace(/^[ \t]*```pdf\s*\n([\s\S]*?)^[ \t]*```/gm, function(match, filename) {
                var pdfFile = filename.trim();
                return '\n\n' + self.createPdfViewerHtml(pdfFile) + '\n\n';
            });
            
            markdown = markdown.replace(/^[ \t]*:::\s*(note|warning|tip|danger|info)\s*\n([\s\S]*?)\n^[ \t]*:::/gm, function(match, type, content) {
                return '\n\n' + self.createCalloutHtml(type, content.trim()) + '\n\n';
            });
            
            return markdown;
        },

        createPdfViewerHtml: function(filename) {
            var ext = filename.split('.').pop().toLowerCase();
            var isPdf = ext === 'pdf';
            var pdfUrl = filename;
            
            if (!filename.match(/^(http|https|\/|\.\/)/)) {
                pdfUrl = './docs/pdfs/' + filename;
            }
            
            var displayName = filename.split('/').pop().replace(/\.(pdf|html)$/i, '');
            
            return '<div class="pdf-viewer">' +
                '<div class="pdf-header">' +
                '<span class="pdf-icon">📄</span>' +
                '<span class="pdf-title">' + displayName + '</span>' +
                '<a href="' + pdfUrl + '" download="' + filename.split('/').pop() + '" class="pdf-download-btn" data-pdf="' + pdfUrl + '">⬇ Descargar</a>' +
                '</div>' +
                '<iframe src="' + pdfUrl + '" class="pdf-iframe" frameborder="0"></iframe>' +
                '</div>';
        },

        createCalloutHtml: function(type, content) {
            var icons = {
                note: '📝',
                warning: '⚠️',
                tip: '💡',
                danger: '🚨',
                info: 'ℹ️'
            };
            
            var titles = {
                note: 'Nota',
                warning: 'Advertencia',
                tip: 'Consejo',
                danger: 'Peligro',
                info: 'Información'
            };
            
            return '<div class="callout callout-' + type + '">' +
                '<div class="callout-header">' +
                '<span class="callout-icon">' + (icons[type] || '📄') + '</span>' +
                '<span class="callout-title">' + (titles[type] || type) + '</span>' +
                '</div>' +
                '<div class="callout-content">' + this.parseInlineContent(content) + '</div>' +
                '</div>';
        },

        parseInlineContent: function(text) {
            if (window.marked) {
                return window.marked.parseInline(text);
            }
            return text;
        },
        
        loadContent: function(path) {
            var self = this;
            var validPath = this.validatePath(path);
            this.currentPath = validPath;
            
            var contentElement = document.getElementById('documentation-content');
            if (!contentElement) return;
            
            contentElement.innerHTML = '<div class="loading">Cargando...</div>';
            
            fetch('./docs/' + validPath)
                .then(function(response) {
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    return response.text();
                })
                .then(function(markdown) {
                    if (!window.marked) {
                        throw new Error('marked.js no disponible');
                    }
                    
                    var processedMarkdown = self.preprocessMarkdown(markdown);
                    var html = window.marked.parse(processedMarkdown);
                    
                    // Animación de fade out
                    contentElement.style.opacity = '0';
                    contentElement.style.transition = 'opacity 0.2s ease';
                    
                    setTimeout(function() {
                        contentElement.innerHTML = html;
                        contentElement.style.opacity = '1';
                        
                        self.updateActiveNav();
                        self.updateHistory(validPath);
                        self.scrollToTop();
                        self.highlightCode();
                        self.setupCodeBlocks();
                        
                        // Delay para asegurar que el DOM está renderizado
                        setTimeout(function() {
                            self.generateTOC();
                            self.injectPrevNext();
                            // self.injectBreadcrumbs(); // Deshabilitado
                            self.setupImageLightbox();
                            self.renderMermaidDiagrams();
                            self.setupCodeBlocks();
                            self.setupScrollspy();
                        }, 50);
                    }, 100);
                })
                .catch(function(error) {
                    console.error('Error cargando contenido:', error);
                    contentElement.innerHTML = '<div class="error"><h2>Error al cargar</h2><p>' + error.message + '</p></div>';
                });
        },

        setupCodeBlocks: function() {
            var self = this;
            var codeBlocks = document.querySelectorAll('.documentation pre');
            
            codeBlocks.forEach(function(pre) {
                // Evitar procesar bloques ya procesados
                if (pre.parentElement.classList.contains('code-block-wrapper')) return;
                
                // Activar line-numbers para Prism
                pre.classList.add('line-numbers');
                
                var code = pre.querySelector('code');
                if (!code) return;
                
                // Obtener lenguaje del código
                var classes = code.className || '';
                var langMatch = classes.match(/language-(\w+)/);
                var lang = langMatch ? langMatch[1].toUpperCase() : 'CODE';
                
                // Crear wrapper para el bloque de código
                var wrapper = document.createElement('div');
                wrapper.className = 'code-block-wrapper';
                
                // Crear barra superior con lenguaje y botón copiar
                var headerBar = document.createElement('div');
                headerBar.className = 'code-header-bar';
                
                var langLabel = document.createElement('span');
                langLabel.className = 'code-language';
                langLabel.textContent = lang;
                
                var copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = 'Copiar';
                copyBtn.setAttribute('aria-label', 'Copiar código');
                
                // Evento para copiar código
                copyBtn.addEventListener('click', function() {
                    var text = code.textContent;
                    
                    var onSuccess = function() {
                        copyBtn.textContent = '¡Copiado!';
                        copyBtn.classList.add('copied');
                        setTimeout(function() {
                            copyBtn.textContent = 'Copiar';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    };

                    var onError = function(err) {
                        console.error('Error al copiar:', err);
                        copyBtn.textContent = 'Error';
                        setTimeout(function() {
                            copyBtn.textContent = 'Copiar';
                        }, 2000);
                    };

                    if (navigator.clipboard && window.isSecureContext) {
                        navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
                    } else {
                        try {
                            var textArea = document.createElement("textarea");
                            textArea.value = text;
                            textArea.style.position = "fixed";
                            textArea.style.left = "-9999px";
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            var successful = document.execCommand('copy');
                            document.body.removeChild(textArea);
                            if (successful) {
                                onSuccess();
                            } else {
                                onError(new Error("Fallback de copiado falló"));
                            }
                        } catch (err) {
                            onError(err);
                        }
                    }
                });
                
                headerBar.appendChild(langLabel);
                headerBar.appendChild(copyBtn);
                
                // Insertar wrapper antes del pre y mover elementos
                pre.parentNode.insertBefore(wrapper, pre);
                wrapper.appendChild(headerBar);
                wrapper.appendChild(pre);
            });
        },

        renderMermaidDiagrams: function() {
            var self = this;
            var mermaidBlocks = document.querySelectorAll('.documentation pre code.language-mermaid');
            
            if (mermaidBlocks.length === 0) return;
            
            if (!window.mermaid) {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
                script.onload = function() {
                    self.initMermaid();
                };
                document.head.appendChild(script);
            } else {
                this.initMermaid();
            }
        },

        initMermaid: function() {
            if (window.mermaid) {
                window.mermaid.initialize({
                    startOnLoad: false,
                    theme: this.theme === 'dark' ? 'dark' : 'default',
                    securityLevel: 'loose'
                });
                
                var mermaidBlocks = document.querySelectorAll('.documentation pre code.language-mermaid');
                mermaidBlocks.forEach(function(block, index) {
                    var pre = block.parentElement;
                    var graphDefinition = block.textContent;
                    
                    var container = document.createElement('div');
                    container.className = 'mermaid-diagram';
                    container.id = 'mermaid-' + index;
                    
                    pre.parentNode.insertBefore(container, pre);
                    pre.style.display = 'none';
                    
                    window.mermaid.render('mermaid-' + index, graphDefinition).then(function(result) {
                        container.innerHTML = result.svg;
                    }).catch(function(error) {
                        console.error('Error renderizando Mermaid:', error);
                        pre.style.display = 'block';
                    });
                });
            }
        },

        setupImageLightbox: function() {
            var self = this;
            var images = document.querySelectorAll('.documentation img');
            
            images.forEach(function(img) {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', function() {
                    self.openLightbox(this.src, this.alt);
                });
            });
        },

        openLightbox: function(src, alt) {
            var overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = '<div class="lightbox-content">' +
                '<button class="lightbox-close" aria-label="Cerrar">&times;</button>' +
                '<img src="' + src + '" alt="' + (alt || '') + '">' +
                '</div>';
            
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.querySelector('.lightbox-close').addEventListener('click', function() {
                self.closeLightbox();
            });
        },

        closeLightbox: function() {
            var overlay = document.querySelector('.lightbox-overlay');
            if (overlay) {
                overlay.remove();
                document.body.style.overflow = '';
            }
        },

        injectBreadcrumbs: function() {
            var content = document.getElementById('documentation-content');
            if (!content || !this.navConfig) return;
            
            var existing = content.querySelector('.breadcrumbs');
            if (existing) existing.remove();
            
            var currentIndex = this.navConfig.nav.findIndex(function(item) {
                return item.path === this.currentPath;
            }.bind(this));
            
            if (currentIndex === -1) return;
            
            var breadcrumbs = '<nav class="breadcrumbs" aria-label="Breadcrumb">' +
                '<ol><li><a href="#index">Inicio</a></li>';
            
            if (currentIndex > 0) {
                for (var i = 0; i < currentIndex; i++) {
                    breadcrumbs += '<li><a href="#" data-path="' + this.navConfig.nav[i].path + '">' + 
                        this.navConfig.nav[i].title + '</a></li>';
                }
            }
            
            breadcrumbs += '<li><span>' + this.navConfig.nav[currentIndex].title + '</span></li></ol></nav>';
            
            content.insertAdjacentHTML('afterbegin', breadcrumbs);
            
            content.querySelectorAll('.breadcrumbs a').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var path = this.dataset.path;
                    if (path) DocsViewer.navigateTo(path);
                });
            });
        },
        
        validatePath: function(path) {
            var cleanPath = path.replace(/\/\.\.\//g, '').replace(/\.\./g, '');
            
            if (!cleanPath.endsWith('.md')) {
                cleanPath += '.md';
            }
            
            if (!cleanPath.match(/^[a-zA-Z0-9_\-\.]+\.md$/)) {
                return 'index.md';
            }
            
            return cleanPath;
        },
        
        scrollToTop: function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        updateActiveNav: function() {
            var links = document.querySelectorAll('.nav-list a');
            links.forEach(function(link) {
                link.classList.remove('active');
                if (link.dataset.path === this.currentPath) {
                    link.classList.add('active');
                }
            }.bind(this));
        },
        
        updateHistory: function(path) {
            var title = this.getPageTitle(path);
            var hash = path === 'index.md' ? '' : '#' + path.replace('.md', '');
            
            window.history.replaceState(
                { path: path }, 
                title, 
                window.location.pathname + hash
            );
            document.title = title + ' - VanillaDocs';
        },
        
        getPageTitle: function(path) {
            if (!this.navConfig) return path.replace('.md', '');
            
            var item = this.navConfig.nav.find(function(i) {
                return i.path === path;
            });
            return item ? item.title : path.replace('.md', '');
        },
        
        navigateTo: function(path) {
            this.loadContent(path);
            
            if (window.innerWidth <= 768) {
                var sidebar = document.querySelector('.sidebar');
                var menuToggle = document.querySelector('.menu-toggle');
                if (sidebar) sidebar.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        },
        
        toggleTheme: function() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            
            if (this.theme === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            
            var themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) {
                themeBtn.textContent = this.theme === 'dark' ? '🌙' : '☀️';
            }
        },
        
        
        highlightCode: function() {
            var preBlocks = document.querySelectorAll('.documentation pre');
            preBlocks.forEach(function(pre) {
                if (!pre.classList.contains('line-numbers') && !pre.querySelector('code.language-mermaid')) {
                    pre.classList.add('line-numbers');
                }
                var code = pre.querySelector('code');
                if (code && code.className) {
                    var langMatch = code.className.match(/language-\w+/);
                    if (langMatch) {
                        pre.classList.add(langMatch[0]);
                    }
                }
            });

            if (window.Prism) {
                window.Prism.highlightAll();
            }
        },
        
        injectCopyButtons: function() {
            var self = this;
            var preBlocks = document.querySelectorAll('.documentation pre:not(:has(+ .code-tabs-wrapper))');
            
            preBlocks.forEach(function(pre) {
                if (pre.querySelector('.copy-btn')) return;
                
                var code = pre.querySelector('code');
                if (!code) return;
                
                var classes = code.className || '';
                var langMatch = classes.match(/language-(\w+)/);
                var lang = langMatch ? langMatch[1].toUpperCase() : 'CODE';
                
                var wrapper = document.createElement('div');
                wrapper.className = 'code-tabs-mini';
                
                var tabsBar = document.createElement('div');
                tabsBar.className = 'code-tabs-bar';
                tabsBar.style.display = 'flex';
                tabsBar.style.alignItems = 'center';
                
                var tab = document.createElement('button');
                tab.className = 'code-tab active';
                tab.textContent = lang;
                
                var copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = 'Copiar';
                copyBtn.setAttribute('aria-label', 'Copiar código');
                
                tabsBar.appendChild(tab);
                tabsBar.appendChild(copyBtn);
                
                copyBtn.addEventListener('click', function() {
                    var text = code.textContent;
                    
                    navigator.clipboard.writeText(text).then(function() {
                        copyBtn.textContent = '¡Copiado!';
                        copyBtn.classList.add('copied');
                        
                        setTimeout(function() {
                            copyBtn.textContent = 'Copiar';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    }).catch(function(err) {
                        console.error('Error al copiar:', err);
                        copyBtn.textContent = 'Error';
                    });
                });
                
                pre.parentNode.insertBefore(wrapper, pre);
                wrapper.appendChild(tabsBar);
                wrapper.appendChild(pre);
            });
        },
        
        generateTOC: function() {
            var content = document.getElementById('documentation-content');
            var tocSidebar = document.getElementById('toc-container');
            if (!content) return;
            
            // Buscar headings en el contenido
            var headings = content.querySelectorAll('#documentation-content h2, #documentation-content h3');
            
            var tocSidebarNav = document.getElementById('toc-nav');
            
            // Si no hay headings, mostrar mensaje o dejar vacío
            if (headings.length === 0) {
                if (tocSidebar) {
                    // Mostrar el TOC pero vacío o con mensaje
                    tocSidebar.style.display = 'block';
                    if (tocSidebarNav) {
                        tocSidebarNav.innerHTML = '<li class="toc-empty">Sin secciones</li>';
                    }
                }
                return;
            }
            
            if (tocSidebar) tocSidebar.style.display = 'block';
            
            if (tocSidebarNav) {
                tocSidebarNav.innerHTML = '';
            }
            
            var inlineTocId = 'toc-inline-generated';
            var existingInline = document.getElementById(inlineTocId);
            if (existingInline) {
                existingInline.remove();
            }
            
            var firstH2 = content.querySelector('h2');
            
            var slugify = function(text) {
                return text.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
            };
            
            var tocItems = [];
            headings.forEach(function(heading, index) {
                var id = heading.id || slugify(heading.textContent);
                if (!heading.id) {
                    heading.id = id;
                }
                
                var level = heading.tagName.toLowerCase();
                tocItems.push({ level: level, id: id, text: heading.textContent });
            });
            
            if (tocSidebarNav) {
                tocItems.forEach(function(item) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    
                    a.href = '#' + item.id;
                    a.textContent = item.text;
                    a.className = 'toc-' + item.level;
                    
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        var target = document.getElementById(item.id);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                    
                    li.appendChild(a);
                    tocSidebarNav.appendChild(li);
                });
            }
            
            var isMobile = window.matchMedia('(max-width: 1023px)').matches;
            
            if (firstH2 && isMobile) {
                var inlineContainer = document.createElement('div');
                inlineContainer.id = inlineTocId;
                inlineContainer.className = 'toc-inline';
                
                var title = document.createElement('div');
                title.className = 'toc-title';
                title.textContent = 'Contenido';
                inlineContainer.appendChild(title);
                
                var nav = document.createElement('nav');
                nav.id = 'toc-nav-inline';
                
                tocItems.forEach(function(item) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    
                    a.href = '#' + item.id;
                    a.textContent = item.text;
                    a.className = 'toc-' + item.level;
                    
                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        var target = document.getElementById(item.id);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                    
                    li.appendChild(a);
                    nav.appendChild(li);
                });
                
                inlineContainer.appendChild(nav);
                firstH2.parentNode.insertBefore(inlineContainer, firstH2);
            }
        },
        
        injectPrevNext: function() {
            var content = document.getElementById('documentation-content');
            if (!content || !this.navConfig) return;
            
            var existing = content.querySelector('.nav-prev-next');
            if (existing) {
                existing.remove();
            }
            
            var nav = this.navConfig.nav;
            var currentIndex = nav.findIndex(function(item) {
                return item.path === this.currentPath;
            }.bind(this));
            
            if (currentIndex === -1) return;
            
            var prev = currentIndex > 0 ? nav[currentIndex - 1] : null;
            var next = currentIndex < nav.length - 1 ? nav[currentIndex + 1] : null;
            
            var navHTML = '<div class="nav-prev-next">';
            
            if (prev) {
                navHTML += '<a href="#" class="nav-card prev" data-path="' + prev.path + '">' +
                    '<span class="nav-arrow">←</span>' +
                    '<span class="nav-label">Anterior</span>' +
                    '</a>';
            } else {
                navHTML += '<div></div>';
            }
            
            if (next) {
                navHTML += '<a href="#" class="nav-card next" data-path="' + next.path + '">' +
                    '<span class="nav-label">Siguiente</span>' +
                    '<span class="nav-arrow">→</span>' +
                    '</a>';
            } else {
                navHTML += '<div></div>';
            }
            
            navHTML += '</div>';
            
            content.insertAdjacentHTML('beforeend', navHTML);
        }
    };
    
    function initApp() {
        if (window.appInitialized) return;
        window.appInitialized = true;
        
        DocsViewer.init();
        window.docsViewer = DocsViewer;
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(function(reg) {
                    console.log('Service Worker registrado:', reg.scope);
                })
                .catch(function(err) {
                    console.log('Service Worker error:', err);
                });
        }
        
        var hash = window.location.hash.slice(1);
        if (hash) {
            DocsViewer.loadContent(hash + '.md');
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        if (window.marked && window.jsyaml) {
            initApp();
        } else {
            window.addEventListener('CDNDepsLoaded', initApp);
        }
    });
    
    window.addEventListener('hashchange', function() {
        var hash = window.location.hash.slice(1);
        if (hash && window.docsViewer) {
            window.docsViewer.loadContent(hash + '.md');
        }
    });
})();