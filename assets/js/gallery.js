/* ============================================================
   gallery.js — renders content/world-photos.json as a lazy-loaded
   photo grid with a click-to-enlarge lightbox, grouped by country.
   Also powers the rotating "photo strip" teaser near the top of
   the Around the World page.
   Depends on: loadJSON() and escapeHtml() from common.js.
   ============================================================ */

let __galleryManifest = null;

async function getGalleryManifest() {
  if (__galleryManifest) return __galleryManifest;
  try {
    __galleryManifest = await loadJSON('content/world-photos.json');
  } catch (e) {
    __galleryManifest = { countries: [] };
  }
  return __galleryManifest;
}

function slugify(str) {
  return String(str).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* ---------- main photo grid (id="gallery") ---------- */
async function renderGallery() {
  const container = document.getElementById('gallery');
  if (!container) return;

  const manifest = await getGalleryManifest();
  const countries = manifest.countries || [];

  if (countries.length === 0) {
    container.innerHTML = '<p class="skeleton">Photos coming soon — check back shortly.</p>';
    return;
  }

  const flatPhotos = [];

  container.innerHTML = countries.map(c => {
    const photos = c.photos || [];
    photos.forEach(p => {
      flatPhotos.push({
        src: `assets/images/world/${c.folder}/${p.file}`,
        caption: p.caption || '',
        country: c.country
      });
    });

    return `
      <div class="gallery-country" id="gallery-${slugify(c.country)}">
        <h4>${escapeHtml(c.country)} — ${photos.length} photo${photos.length === 1 ? '' : 's'}</h4>
        <div class="gallery-grid" data-country="${escapeHtml(c.country)}">
          ${photos.map((p, i) => `
            <button class="gallery-thumb" data-country="${escapeHtml(c.country)}" data-index="${i}" aria-label="${escapeHtml(p.caption || c.country)}">
              <img data-src="assets/images/world/${c.folder}/${p.file}" alt="${escapeHtml(p.caption || c.country)}" loading="lazy">
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  if (flatPhotos.length === 0) {
    container.innerHTML = '<p class="skeleton">Photos coming soon — check back shortly.</p>';
    return;
  }

  const lazyImgs = container.querySelectorAll('img[data-src]');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener('load', () => img.classList.add('loaded'));
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });
  lazyImgs.forEach(img => io.observe(img));

  setupLightbox(container, flatPhotos);

  // if URL has a #gallery-<country> hash, scroll to it (used by clickable
  // country/city names higher up the page)
  if (location.hash && location.hash.startsWith('#gallery-')) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }
}

function setupLightbox(container, flatPhotos) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <img id="lbImg" src="" alt="">
      <div class="lightbox-caption" id="lbCaption"></div>
      <div class="lightbox-meta" id="lbMeta"></div>
    </div>
    <button class="lightbox-close" aria-label="Close">✕</button>
    <button class="lightbox-prev" aria-label="Previous photo">‹</button>
    <button class="lightbox-next" aria-label="Next photo">›</button>
  `;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('#lbImg');
  const lbCaption = overlay.querySelector('#lbCaption');
  const lbMeta = overlay.querySelector('#lbMeta');
  let currentIndex = 0;

  function findFlatIndex(country, localIndex) {
    let count = -1;
    for (let i = 0; i < flatPhotos.length; i++) {
      if (flatPhotos[i].country === country) {
        count++;
        if (count === localIndex) return i;
      }
    }
    return 0;
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox() {
    const photo = flatPhotos[currentIndex];
    if (!photo) return;
    lbImg.src = photo.src;
    lbImg.alt = photo.caption || photo.country;
    lbCaption.textContent = photo.caption || '';
    lbMeta.textContent = `${photo.country} — ${currentIndex + 1} / ${flatPhotos.length}`;
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % flatPhotos.length;
    renderLightbox();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + flatPhotos.length) % flatPhotos.length;
    renderLightbox();
  }

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-thumb');
    if (!btn) return;
    const country = btn.dataset.country;
    const localIndex = parseInt(btn.dataset.index, 10);
    openLightbox(findFlatIndex(country, localIndex));
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  overlay.querySelector('.lightbox-next').addEventListener('click', nextPhoto);
  overlay.querySelector('.lightbox-prev').addEventListener('click', prevPhoto);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });
}

/* ---------- rotating photo strip teaser (id="photo-strip") ---------- */
async function renderPhotoStrip(slotCount = 4, intervalMs = 3000) {
  const strip = document.getElementById('photo-strip');
  if (!strip) return;

  const manifest = await getGalleryManifest();
  const all = [];
  (manifest.countries || []).forEach(c => {
    (c.photos || []).forEach(p => {
      all.push({
        src: `assets/images/world/${c.folder}/${p.file}`,
        caption: p.caption || c.country,
        country: c.country
      });
    });
  });

  if (all.length === 0) {
    strip.outerHTML = '<div class="photo-strip-empty" id="photo-strip">Photo gallery coming soon — check back shortly.</div>';
    return;
  }

  // shuffle
  const pool = all.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const slots = Math.min(slotCount, Math.max(1, pool.length));
  strip.innerHTML = Array.from({ length: slots }).map((_, i) =>
    `<div class="strip-slot" id="strip-slot-${i}"></div>`
  ).join('');

  let cursor = slots;
  const slotEls = Array.from({ length: slots }).map((_, i) => document.getElementById(`strip-slot-${i}`));

  function setSlot(slotEl, photo) {
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    img.addEventListener('load', () => img.classList.add('visible'));
    slotEl.innerHTML = '';
    slotEl.appendChild(img);
  }

  slotEls.forEach((slotEl, i) => setSlot(slotEl, pool[i % pool.length]));

  if (pool.length <= slots) return; // nothing new to rotate in

  setInterval(() => {
    const slotIdx = Math.floor(Math.random() * slots);
    const photo = pool[cursor % pool.length];
    cursor++;
    const slotEl = slotEls[slotIdx];
    if (slotEl) setSlot(slotEl, photo);
  }, intervalMs);
}

/* auto-run on pages that include the relevant containers */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gallery')) renderGallery();
    if (document.getElementById('photo-strip')) renderPhotoStrip();
  });
})();
