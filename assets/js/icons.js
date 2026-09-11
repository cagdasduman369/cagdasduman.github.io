/* ============================================================
   icons.js — a small library of inline SVG icons for platform
   logos (ResearchGate, Academia.edu, YouTube, LinkedIn, etc.)
   Kept intentionally simple/monochrome to match the site's ink
   color, so logos don't clash with the brand palette.
   Usage: ICONS['researchgate'] returns an SVG string, or
   ICONS.get('name') falls back to a neutral dot icon.
   ============================================================ */

const ICONS = {
  researchgate: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#12131A"/><path d="M7 17V8.6h1.9c1.9 0 3 .9 3 2.6 0 1.3-.7 2.1-1.8 2.4l2.1 3.4h-1.6l-1.9-3.2H8.4V17H7zm1.4-4.4h.4c1 0 1.6-.4 1.6-1.3 0-.9-.6-1.3-1.6-1.3h-.4v2.6z" fill="#fff"/><path d="M15.3 17.2c-1.9 0-3-1.1-3-2.9h1.3c0 1 .6 1.7 1.7 1.7.9 0 1.5-.4 1.5-1.1 0-.7-.5-1-1.5-1.3l-.6-.2c-1.3-.4-2.1-1-2.1-2.2 0-1.4 1.2-2.3 2.7-2.3 1.7 0 2.7 1 2.8 2.6h-1.3c0-.9-.5-1.4-1.5-1.4-.8 0-1.4.4-1.4 1 0 .6.5.9 1.4 1.1l.6.2c1.4.4 2.2 1 2.2 2.3 0 1.5-1.2 2.5-2.8 2.5z" fill="#fff"/></svg>`,

  academia: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#12131A"/><path d="M12 5L4 9.2l8 4.2 6.5-3.4V15h1.2V9.2L12 5z" fill="#fff"/><path d="M7.5 11.6V15c0 1.4 2 2.6 4.5 2.6s4.5-1.2 4.5-2.6v-3.4L12 13.4l-4.5-1.8z" fill="#fff"/></svg>`,

  scholar: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#12131A"/><path d="M12 6L4.5 9.8 12 13.6l6-3.1v4.3h1.2V9.8L12 6z" fill="#fff"/><path d="M7 11.5v3.1c0 1.5 2.3 2.7 5 2.7s5-1.2 5-2.7v-3.1l-5 2.6-5-2.6z" fill="#fff"/></svg>`,

  orcid: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#A6CE39"/><path d="M8.6 7.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM7.9 9.9h1.4v6.8H7.9V9.9zm2.6 0h2.6c2.5 0 3.6 1.8 3.6 3.4 0 1.8-1.4 3.4-3.6 3.4h-2.6V9.9zm1.4 1.2v4.4h1.1c1.7 0 2.4-1.3 2.4-2.2 0-1.2-.8-2.2-2.5-2.2h-1z" fill="#12131A"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M7.3 9.9H5V18h2.3V9.9zM6.1 6c-.8 0-1.3.5-1.3 1.2 0 .7.5 1.2 1.3 1.2.8 0 1.3-.5 1.3-1.2 0-.7-.5-1.2-1.3-1.2zM19 12.9c0-2.1-1.1-3.2-2.7-3.2-1.2 0-1.8.7-2.1 1.2V9.9H12v8.1h2.3v-4.5c0-.4 0-.9.6-1.3.3-.3.7-.4 1-.4.9 0 1.3.6 1.3 1.7v4.5H19v-4.6z" fill="#fff"/></svg>`,

  youtube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff"/></svg>`,

  bluesky: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#0A7CFF"/><path d="M12 9.8c-.7-1.5-2.6-3.5-4.4-3.5-1.4 0-2.4.9-2.4 2.3 0 1.7 1.4 2.1 2.3 2.4-.9.2-2.7.6-2.7 2.5 0 1.5 1.2 2.5 2.7 2.5 1.9 0 3.7-1.6 4.5-3-.8 1.4-.6 3 .6 3 1.3 0 1.6-1.4.9-2.4.9 1 2 2.4 3.3 2.4 1.5 0 2.7-1 2.7-2.5 0-1.9-1.8-2.3-2.7-2.5.9-.3 2.3-.7 2.3-2.4 0-1.4-1-2.3-2.4-2.3-1.8 0-3.7 2-4.4 3.5-.2.3-.5.3-.7 0z" fill="#fff"/></svg>`,

  goodreads: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#372213"/><circle cx="12" cy="12" r="5.5" fill="#fff"/><circle cx="12" cy="12" r="4" fill="none" stroke="#372213" stroke-width="1"/><rect x="11.5" y="6.5" width="1" height="4" fill="#372213"/></svg>`,

  quora: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#B92B27"/><text x="12" y="16.5" font-family="Georgia, serif" font-size="13" fill="#fff" text-anchor="middle">Q</text></svg>`,

  soundcloud: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#FF5500"/><path d="M5 14v2.5h1V14H5zm2-1.5v4h1v-4H7zm2-.5v4.5h1V12H9zm2-1v5.5h1V11h-1zm2 .5v5h1v-5.6c0-.5-.4-.9-.9-.6-.1 0-.1.1-.1.2v1zm2-1.6c-.3 0-.6.1-.8.3v6.3h3.4c1.1 0 2-.9 2-2s-.9-2-2-2c-.2 0-.4 0-.6.1-.1-1.5-1.3-2.7-2-2.7z" fill="#fff"/></svg>`,

  world: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#8C1D18" stroke-width="1.5"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="#8C1D18" stroke-width="1.2"/></svg>`,

  dot: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="#8C1D18"/></svg>`
};

function getIcon(name) {
  const key = String(name || '').toLowerCase().replace(/[^a-z]/g, '');
  return ICONS[key] || ICONS.dot;
}
