#!/bin/bash
echo "Iniciando servidor de documentación..."
echo "Acceso: http://localhost:3000/docs-viewer/"
echo ""
cd "$(dirname "$0")"
npx http-server -p 3000 -c-1 --cors