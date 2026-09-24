# Zoyanaaz Maldar — Portfolio

A production-ready, recruiter-friendly personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and React Router. Positioned for Software Engineer / Frontend / Backend / Python / AI-ML fresher roles.

## Project structure

```
src/
├── components/        # Reusable UI (Navbar, ProjectCard, ExternalLink, Lightbox, etc.)
├── sections/           # Page sections (Hero, About, Skills, Projects, Contact, etc.)
├── pages/
│   ├── Home.jsx         # The single-page portfolio (all sections)
│   └── NotFound.jsx     # 404 page
├── data/
│   └── portfolioData.js   # ⭐ ALL editable content lives here
├── hooks/
│   ├── useTheme.js          # Dark/light mode logic
│   └── useActiveSection.js  # Active navbar link while scrolling
├── utils/
│   ├── validators.js          # Email/phone placeholder detection
│   ├── analytics.js           # No-op event tracker, ready for a real provider
│   └── sendContactMessage.js  # Contact form submit handler (EmailJS/Formspree-ready)
├── styles/index.css
├── App.jsx      # Route definitions
└── main.jsx     # App entry, wraps App in BrowserRouter
public/
├── resume.pdf        # Replace with your real resume
├── favicon.svg        # "ZM" monogram
├── og-image.png        # Social share preview image
├── _redirects          # Netlify SPA routing config
vercel.json              # Vercel SPA routing config
```

## 1. Install

Requires Node.js 18+.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```