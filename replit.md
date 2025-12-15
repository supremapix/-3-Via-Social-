# 3ª Via Social

## Overview
This is a React/Vite/TypeScript landing page application for "3ª Via Social" - a Brazilian platform for public management and leadership training. The app provides information about courses, methodology, and includes features like a management panel, methodology dashboard with AI tools, and interactive diagnostics.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v7
- **SEO**: React Helmet Async
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Charts**: Chart.js, Plotly.js (loaded dynamically)
- **API**: Google Generative AI (@google/genai)

## Project Structure
```
/
├── components/
│   ├── LandingPage.tsx      # Main landing page with hero, courses, contact
│   ├── ManagementPanel.tsx  # Technical management panel component
│   ├── MethodologyPage.tsx  # 15-section methodology dashboard with AI tools
│   ├── Header.tsx           # Shared navigation header component
│   ├── Footer.tsx           # Shared footer component
│   └── EnhancedSEO.tsx      # SEO component with meta tags and structured data
├── public/
│   ├── sitemap.xml          # XML sitemap for search engines
│   ├── robots.txt           # Robots configuration
│   └── _redirects           # Netlify SPA redirects
├── App.tsx                   # Root app with React Router
├── index.tsx                 # App entry point with HelmetProvider
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Routes (URLs)
- `/` - Home page (LandingPage)
- `/metodologia` - Methodology dashboard with charts and AI tools
- `/painel-gestao` - Technical management panel

## Development
- **Port**: 5000
- **Command**: `npm run dev`
- The Vite dev server is configured to allow all hosts for Replit proxy compatibility.

## Environment Variables
- `GEMINI_API_KEY`: Required for Google Generative AI integration (used in MethodologyPage and ManagementPanel)

## Build & Deployment
- **Build**: `npm run build`
- **Output**: `dist/` directory
- **Deployment**: Static site deployment or Netlify (with _redirects file)

## SEO Features
- EnhancedSEO component with:
  - Dynamic title and meta description per page
  - Canonical URLs for each route
  - Open Graph meta tags
  - Twitter Card meta tags
  - Structured data (JSON-LD) for Organization, WebPage, BreadcrumbList
  - Resource hints (preconnect, dns-prefetch)
- sitemap.xml with all routes
- robots.txt with sitemap reference

## Features
- Responsive landing page
- Interactive "Management Thermometer" quiz
- 12-module course curriculum display
- WhatsApp contact integration
- Technical management panel with AI assistance
- Transparency portal
- Shared Header and Footer across all pages
- **Methodology Page** (15 sections):
  - 6 data visualization sections with Chart.js and Plotly.js
  - 9 AI-powered interactive tools

## Recent Changes (Dec 15, 2025)
- Implemented React Router for proper URL-based navigation
- Created shared Header and Footer components
- Added EnhancedSEO component with comprehensive meta tags
- Each page now has its own canonical URL and SEO configuration
- Added sitemap.xml, robots.txt, and _redirects for Netlify
