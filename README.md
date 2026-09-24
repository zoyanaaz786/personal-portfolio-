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

## 4. Replace your personal information

Everything editable — name, contact details, social links, skills, projects, certifications, education, resume path — lives in **one file**:

```
src/data/portfolioData.js
```

### Email, phone, GitHub, LinkedIn

```js
export const contactInfo = {
  email: 'you@example.com',
  phone: '+91 90000 00000',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile'
}
```

These four values drive **every** GitHub/LinkedIn/email/phone control on the site (navbar, hero, footer, contact section) — there's nothing to update in multiple places.

**How the "no broken link" behavior works:** every LinkedIn, GitHub, project, and certificate link on the site is rendered through `src/components/ExternalLink.jsx`, which checks that the URL is a real `https://` address before making it clickable. If a value is still a placeholder (e.g. `[YOUR GITHUB URL]`) or missing, the control automatically renders disabled with a label like "Add GitHub URL" or "Coming Soon" instead of a dead `#` link. As soon as you replace the placeholder with a real URL in `portfolioData.js`, the link activates — no other code changes needed.

### Certificates

In `certifications`, replace each `url: '[CERTIFICATE URL]'` with the real, publicly viewable link (Credly badge, Drive share link, issuer verification page, or a local PDF path like `/certificates/python.pdf`).

### Resume

Drop your real resume PDF into `public/`, keeping the filename `resume.pdf`, **or** rename it and update:

```js
export const resumePath = '/your-new-filename.pdf'
```

Both **View Resume** (opens in a new tab) and **Download Resume** (saves as `Zoyanaaz_Maldar_Resume.pdf`) read from this one value, and appear in three places: the navbar, the hero, and the dedicated "My Resume" section. If the file genuinely can't be found, that section shows "Resume not uploaded yet" instead of a broken button.

### Education — CGPA, 12th, 10th

Edit the `education.timeline` array — each entry has `level`, `institution`, `duration`, `location`, `scoreLabel`, and `score`. Replace the bracketed placeholders with your real values.

### Project GitHub / Live Demo links

Each project has its own `github` and `liveDemo` fields. Leave them as placeholders and the buttons will show "Coming Soon" automatically — no need to hide anything manually.

### Project screenshots (optional)

Each project has a `screenshots: []` array. Add image paths (e.g. `/screenshots/rank2career-1.png`, placed in `public/screenshots/`) to enable the click-to-enlarge gallery in the project details modal. Leave it empty and the gallery section simply doesn't render — no broken thumbnails.

## 5. Connect the contact form

The form has full validation, loading state ("Sending..."), and success/error states already built — but **no email service is connected by default**, so submitting shows an honest "not connected yet" message rather than faking success. To make it actually send messages, open `src/utils/sendContactMessage.js` and replace the placeholder function with one of the two ready-made snippets in that file's comments:

- **EmailJS** — `npm install @emailjs/browser`, then use your service/template/public key.
- **Formspree** — no extra package needed, just POST to your form endpoint.

Keep any real API key in an environment variable (create a `.env` file, e.g. `VITE_EMAILJS_PUBLIC_KEY=...`) — never commit it directly. Vite exposes these as `import.meta.env.VITE_*`.

## 6. Dark / Light mode

Handled by `src/hooks/useTheme.js`. Respects system preference on first visit, persists the choice in `localStorage`, and applies instantly with no flash.

## 7. Routing & the 404 page

The site uses `react-router-dom`. `/` renders the full portfolio (`src/pages/Home.jsx`); any other path renders `src/pages/NotFound.jsx` with a "Back to Home" button. Because this is client-side routing, your host needs to be told to serve `index.html` for every path (otherwise refreshing a deep link 404s at the server level before React Router loads) — the two config files below handle this automatically:

- `vercel.json` — Vercel rewrite rule (already included)
- `public/_redirects` — Netlify redirect rule (already included)

## 8. Deployment

### Vercel
1. Push this project to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — `vercel.json` is already set up for client-side routing.

### Netlify
1. Push to GitHub.
2. New site from Git → select the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. `public/_redirects` is already set up for client-side routing.

### GitHub Pages
1. `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Set `base: '/your-repo-name/'` in `vite.config.js`.
4. `npm run build && npm run deploy`
5. GitHub Pages doesn't support SPA rewrites the same way — for a project this size, Vercel or Netlify is simpler.

### Custom domain
Both Vercel and Netlify let you add a custom domain from their dashboard after the first deploy (Project/Site Settings → Domains). Update `og:url` and the canonical link in `index.html` to your final domain afterward.

## 9. Analytics (optional, off by default)

`src/utils/analytics.js` exports `trackEvent(name, payload)`, already called at the key moments the brief asked for: `resume_viewed`, `resume_downloaded`, `project_opened`, `github_clicked`, `linkedin_clicked`, `certificate_viewed`, `contact_submitted`. By default it only logs to the console in dev mode — no tracking script is loaded. To wire up a real provider, edit the one function in that file.

## 10. What's already handled for you

- **Light/dark theme** with system detection + persistence
- **Active-section navbar highlighting** + scroll progress bar + back-to-top button
- **Skills search & category filtering**
- **Project filtering** (All / Web / Python / Backend / AI-ML / Other) with a featured project layout
- **Project details modal** with problem/solution/features/tech stack/contribution, and an optional screenshot lightbox (keyboard arrows + Escape supported)
- **Certificates** with safe "View Certificate" links
- **Contact form** with validation, character limits, loading/success/error states
- **Copy Email** button with a temporary "Email copied!" confirmation
- **404 page** for any unknown route
- **Reduced-motion support**, semantic headings, focus states, ARIA labels throughout
- **SEO**: title, meta description, Open Graph + Twitter card metadata, a generated `og-image.png`, canonical URL placeholder, `favicon.svg` ("ZM" monogram)

## 11. Pre-launch checklist

- [ ] Replace all `[YOUR ...]` / `[PLACEHOLDER]` values in `src/data/portfolioData.js` (email, phone, GitHub, LinkedIn, certificates, education scores)
- [ ] Replace `public/resume.pdf` with your real resume
- [ ] Add real project GitHub/live-demo links (or leave as-is — they'll show "Coming Soon")
- [ ] Connect a real email service in `src/utils/sendContactMessage.js` if you want submissions delivered
- [ ] Replace `[YOUR DEPLOYED SITE URL]` in `index.html` once you have a live domain
- [ ] Run `npm run build` and confirm no errors
- [ ] Test dark and light mode
- [ ] Test on mobile widths (320px–425px) and desktop
- [ ] Visit a random URL on your deployed site (e.g. `/foo`) to confirm the 404 page renders instead of a host-level error
