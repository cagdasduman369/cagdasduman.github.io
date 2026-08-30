/* ============================================================
   common.js — loads content/site.json and builds header/footer,
   plus small shared helpers used by every page.
   ============================================================ */

async function loadJSON(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load ' + path);
  return res.json();
}

function el(tag, attrs = {}, html = '') {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  });
  if (html) node.innerHTML = html;
  return node;
}

async function buildChrome(activeHref) {
  const site = await loadJSON('content/site.json');

  // classification bar
  const classbar = document.getElementById('classbar');
  if (classbar) {
    classbar.innerHTML =
      `<span>${site.classification}</span><span><span class="dot">●</span> live</span>`;
  }

  // header / nav
  const head = document.getElementById('site-head');
  if (head) {
    const navLinks = site.nav.map(item => {
      const isActive = item.href === activeHref ? ' active' : '';
      return `<a href="${item.href}" class="${isActive.trim()}">${item.label}</a>`;
    }).join('');

    head.innerHTML = `
      <div class="nav-wrap">
        <a href="index.html" class="brand">${site.siteName}<span class="dot">.</span></a>
        <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="primaryNav">Menu</button>
        <nav class="primary" id="primaryNav">${navLinks}</nav>
      </div>
    `;

    const toggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    toggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // footer
  const foot = document.getElementById('site-foot');
  if (foot) {
    foot.innerHTML = `<div>${site.footerNote}</div>`;
  }

  return site;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
