# JurnaLink Awards 2026

A journalism competition microsite for Jalin and Kompas TV, built with HTML, CSS, and JavaScript. No framework or build step is required.

## Getting Started

Open `index.html` directly in a browser or use the Live Server extension in VS Code. No dependency installation is needed. The Albert Sans font loads from Google Fonts and requires an internet connection.

## Project Structure

- `index.html` — page content, categories, prizes, judges, submission form, timeline, and terms and conditions.
- `assets/css/styles.css` — styles and responsive layout.
- `assets/img/` — logos, illustrations, and supporting images.
- `assets/js/navigation.js` — navigation and header behavior.
- `assets/js/reveal.js` — content fade-in effects on page load and scroll.
- `assets/js/submission.js` — submission form handling.
- `design ai/` — source design files.

## Hero Settings

- Desktop (1024px wide and above): `hero-character.png`, with a 48px title.
- Mobile (below 1024px): `hero-character-m.png`, with a 40px title.
- Both character images use absolutely positioned `<img>` elements and switch without a transition.
- On mobile, z-index keeps the text above the character. Adjust its vertical spacing using `margin-top` on `.hero-copy` inside the mobile media query.
- Reveal animations use opacity without X/Y translation.

## Form and Deployment

The form is not connected to a backend and does not send any data. Configure the endpoint and submission handling in `assets/js/submission.js` before accepting registrations.

To deploy, upload `index.html` and the `assets/` folder to a static hosting service, preserving the folder structure.
