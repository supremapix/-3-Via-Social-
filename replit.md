# 3ª Via Social

## Overview
This is a React/Vite/TypeScript landing page application for "3ª Via Social" - a Brazilian platform for public management and leadership training. The app provides information about courses, methodology, and includes features like a management panel, methodology dashboard with AI tools, and interactive diagnostics.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
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
│   └── MethodologyPage.tsx  # 15-section methodology dashboard with AI tools
├── App.tsx                   # Root app component
├── index.tsx                 # App entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Development
- **Port**: 5000
- **Command**: `npm run dev`
- The Vite dev server is configured to allow all hosts for Replit proxy compatibility.

## Environment Variables
- `GEMINI_API_KEY`: Required for Google Generative AI integration (used in MethodologyPage and ManagementPanel)

## Build & Deployment
- **Build**: `npm run build`
- **Output**: `dist/` directory
- **Deployment**: Static site deployment

## Features
- Responsive landing page
- Interactive "Management Thermometer" quiz
- 12-module course curriculum display
- WhatsApp contact integration
- Technical management panel with AI assistance
- Transparency portal
- **Methodology Page** (15 sections):
  - 6 data visualization sections with Chart.js and Plotly.js
  - 9 AI-powered interactive tools (risk analysis, action plans, audits, ODS projects, leadership structures, law drafting, budget planning, crisis protocols, compliance checklists)

## Navigation
- **Home**: Main landing page
- **Metodologia**: New methodology dashboard with charts and AI tools
- **Painel de Gestão Técnica**: Management panel
- **Cursos**: Course section on landing page
