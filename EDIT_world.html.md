# One manual edit required: world.html

Everything else in this zip is a pure add — new files/folders only.
`world.html` is the ONE existing file that needs 3 small additions so
the gallery actually renders on that page. Nothing else changes.

Open `world.html` in the GitHub web editor and make these 3 edits:

---

### Edit 1 — add the gallery stylesheet
Find this line near the top:
```html
<link rel="stylesheet" href="assets/css/style.css">
```
Add right after it:
```html
<link rel="stylesheet" href="assets/css/gallery.css">
```

---

### Edit 2 — add a gallery container
Find this block:
```html
  <main>
    <div id="content"><div class="skeleton">Loading…</div></div>
  </main>
```
Change it to:
```html
  <main>
    <div id="content"><div class="skeleton">Loading…</div></div>
    <hr class="rule">
    <div class="page-eyebrow">Photos</div>
    <h2 class="page-title" style="font-size: 28px;">Photo Gallery</h2>
    <div id="gallery"><div class="skeleton">Loading photos…</div></div>
  </main>
```

---

### Edit 3 — load the gallery script
Find this line near the bottom:
```html
  <script src="assets/js/common.js"></script>
```
Add right after it (before the existing `<script>...</script>` block that
loads world.json):
```html
  <script src="assets/js/gallery.js"></script>
```

---

That's it — save/commit. The existing country/city text list stays
exactly as it is; the photo grid appears below it.
