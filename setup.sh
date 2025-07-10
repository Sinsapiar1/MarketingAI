#!/bin/bash

# Crear estructura de carpetas y archivos para Affiliate Marketing App

echo "🚀 Creando estructura de Affiliate Marketing App..."

# Crear directorio principal
mkdir -p affiliate-marketing-app
cd affiliate-marketing-app

# Crear archivos HTML en la raíz
touch index.html auth.html dashboard.html admin.html 404.html

# Crear archivos de documentación
touch README.md CHANGELOG.md LICENSE .gitignore netlify.toml vercel.json

# Crear estructura CSS
mkdir -p css/components css/themes
touch css/main.css css/auth.css css/dashboard.css css/admin.css
touch css/components/{buttons,cards,forms,modals,tables,charts}.css
touch css/themes/{light,dark}.css

# Crear estructura JavaScript
mkdir -p js/api js/modules js/components js/utils
touch js/{config,app,auth,router,i18n,theme}.js
touch js/api/{firebase,ai-service,analytics}.js
touch js/modules/{product-detector,content-generator,offer-validator,avatar-generator,funnel-architect,profit-calculator,admin-panel}.js
touch js/components/{dashboard-stats,user-profile,notifications,charts}.js
touch js/utils/{storage,validators,formatters,helpers}.js

# Crear estructura de assets
mkdir -p assets/images/icons assets/images/illustrations assets/fonts assets/data
touch assets/images/logo.svg
touch assets/data/{products-templates,prompts-library}.json

# Crear archivos de idiomas
mkdir -p locales
touch locales/{en,es,pt,fr}.json

# Crear contenido inicial para .gitignore
cat > .gitignore << 'EOL'
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Firebase
.firebase/
firebase-debug.log

# Build
dist/
build/

# Misc
*.bak
*.tmp
*.temp
EOL

# Crear configuración básica de Netlify
cat > netlify.toml << 'EOL'
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
EOL

# Crear configuración básica de Vercel
cat > vercel.json << 'EOL'
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOL

# Crear README inicial
cat > README.md << 'EOL'
# 🚀 Affiliate Marketing AI Platform

Una plataforma completa de marketing de afiliados potenciada por IA.

## 🛠️ Instalación

1. Clona este repositorio
2. Configura Firebase (ver documentación)
3. Añade tu API key de IA
4. Despliega en GitHub Pages, Netlify o Vercel

## 📋 Características

- Detector de productos con IA
- Generador de contenido viral
- Validador de ofertas
- Y mucho más...

## 📄 Licencia

MIT License
EOL

# Crear CHANGELOG inicial
cat > CHANGELOG.md << 'EOL'
# Changelog

## [1.0.0] - 2025-01-10

### Added
- Estructura inicial del proyecto
- Sistema de autenticación con Firebase
- Módulos principales de la aplicación
- Soporte multilenguaje
- Modo claro/oscuro
EOL

echo "✅ Estructura creada exitosamente!"
echo "📁 Navega al directorio: cd affiliate-marketing-app"
echo "🚀 Siguiente paso: Configura Firebase y comienza a desarrollar!"