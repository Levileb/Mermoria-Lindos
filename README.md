# Photography Studio

A modern React + Vite + Tailwind portfolio with animated sections and a collage-style gallery.

## Tech
- React 18, Vite 5, Tailwind CSS, Framer Motion
- Hash-based navigation for the Gallery; in-page scroll for sections

## Requirements
- Node.js 18 or newer

## Quick start
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

Build and preview:
```bash
npm run build
npm run preview
```

## Local images
Images are loaded from `public/images`.

Place your photos in `public/images` using these filenames (or update the arrays in the files listed):

- Hero collage (`src/components/Hero.jsx`)
  - `hero1.jpg` … `hero10.jpg`
  - The hero shows 7–10 images depending on screen size; add at least 7 files.

- About marquee (`src/components/About.jsx`)
  - `about1.jpg` … `about8.jpg`

- Services thumbnails (`src/components/Services.jsx`)
  - `services-weddings-1.jpg`, `services-weddings-2.jpg`
  - `services-graduation-1.jpg`, `services-graduation-2.jpg`
  - `services-birthday-1.jpg`, `services-birthday-2.jpg`
  - `services-other-1.jpg`, `services-other-2.jpg`

- Gallery images (`src/components/Gallery.jsx`)
  - Weddings: `gallery-weddings-1.jpg` … `gallery-weddings-5.jpg`
  - Graduation: `gallery-graduation-1.jpg` … `gallery-graduation-4.jpg`
  - Birthday: `gallery-birthday-1.jpg` … `gallery-birthday-4.jpg`
  - Other: `gallery-other-1.jpg` … `gallery-other-4.jpg`

You can use any filenames—just update the arrays in those components.

## Navigation
- Home/Hero, About, Services, Contact are single-page sections (smooth scroll)
- Gallery is opened via hash routing: `#gallery?service=weddings|graduation|birthday|other`

## Contact (EmailJS)
The form in `src/components/Contact.jsx` uses EmailJS placeholders:
```js
emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
```
Two options:
- Quick: Replace the placeholders directly in `Contact.jsx`.
- Env-based (recommended): Create a `.env` from `.env.example` and change the code to use `import.meta.env`.

Example (env-based):
```js
emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  form,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview built app

## Notes
- Tailwind is configured in `tailwind.config.cjs`.
- Animations use Framer Motion; adjust timings in component files if desired.
- `.gitignore` excludes `node_modules` and `.env`. Keep secrets out of Git.
