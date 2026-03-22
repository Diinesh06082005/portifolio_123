# Glass Portfolio

A production-ready personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and EmailJS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the sample environment file and add your EmailJS values:

```bash
copy .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

4. Create a production build:

```bash
npm run build
```

## EmailJS configuration

Add the following values to `.env`:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

The contact form reads those values at runtime. If they are missing, the UI will show a clear setup message instead of failing silently.

## Customizing content

All editable portfolio content lives in:

- `src/data/portfolioData.js`

Update the name, bio, projects, certifications, social links, and contact details there.

## Animation system

- Framer Motion powers the intro loader, section reveals, modal transitions, hover states, and background motion.
- Sections use viewport-triggered variants so content animates once as it enters view.
- The project modal and mobile navigation use `AnimatePresence` for clean open and close transitions.
- The background orbs run on long, looping transforms to keep the page feeling alive without becoming distracting.

## Design notes

- Dark mode is enabled by default and persisted in local storage.
- The glassmorphism effect combines layered gradients, translucent panels, strong borders, and backdrop blur.
- The custom cursor and progress bar add subtle interactivity without competing with the core content.
