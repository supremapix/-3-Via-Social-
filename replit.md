# 3ª Via Social

## Overview
This is a React/Vite/TypeScript landing page application for "3ª Via Social" - a Brazilian platform for public management and leadership training. The app provides information about courses, methodology, and includes features like a management panel and interactive diagnostics.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **API**: Google Generative AI (@google/genai)

## Project Structure
```
/
├── components/
│   ├── LandingPage.tsx    # Main landing page with hero, courses, contact
│   └── ManagementPanel.tsx # Technical management panel component
├── App.tsx                 # Root app component
├── index.tsx               # App entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Development
- **Port**: 5000
- **Command**: `npm run dev`
- The Vite dev server is configured to allow all hosts for Replit proxy compatibility.

## Environment Variables
- `GEMINI_API_KEY`: Required for Google Generative AI integration (used in ManagementPanel)

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
