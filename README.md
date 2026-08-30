# cagdasduman.info

Personal academic website for Dr. Çağdaş Duman. Plain HTML/CSS/JS,
no build step, hosted free on GitHub Pages, served on the custom
domain **cagdasduman.info** (bought on GoDaddy).

---

## 1. How the site is built

- Every page (`index.html`, `journey.html`, `publications.html`, `courses.html`,
  `media.html`, `world.html`, `contact.html`) is a thin HTML shell.
- All the actual **text and links live in `content/*.json`** — one JSON file
  per page, plus `content/site.json` for the navigation menu and footer.
- `assets/js/common.js` reads the JSON at page-load and fills in the HTML.
- `assets/css/style.css` holds all styling (white background, serif/mono
  type, the red "redaction" accent).

This means: **to update text on the site, you edit a JSON file — never HTML.**

---

## 2. Updating content (the easy way, on GitHub.com)

You do **not** need Notion, a CMS, or to install anything. GitHub's own
web editor is enough:

1. Go to your repo on github.com and open the `content/` folder.
2. Click the file you want to change (e.g. `content/media.json` to add a
   new interview, `content/courses.json` to add a course).
3. Click the pencil icon ("Edit this file") in the top right.
4. Edit the text between the quotes. **Only change the values (the text
   after the colon, inside quotes) — never remove a comma, colon, or
   curly brace.** Example — to add a new interview, copy an existing
   block inside `"items": [ ... ]` and change its `tag`, `title`,
   `description`, and `url`.
5. Scroll down, add a short commit message like "Add new interview,"
   and click **Commit changes directly to the `main` branch**.
6. Wait about 30–60 seconds. GitHub Actions automatically rebuilds and
   redeploys the site (see the **Actions** tab on GitHub to watch progress).
7. Refresh the live site — your change is live.

That's the whole workflow. No local setup, no Notion sync, no build
step to run. If a JSON file is edited incorrectly (e.g. a missing comma)
the page will show "Loading…" and stay blank — if that happens, click
"History" on the file in GitHub and revert to the previous version.

**Tip:** Use a free tool like https://jsonlint.com to paste and check
your edited JSON before committing, if you're not fully sure about the
syntax.

### What lives in which file

| File | Controls |
|---|---|
| `content/site.json` | Site name, top nav labels/order, footer text |
| `content/home.json` | Homepage headline, redacted phrase, subtitle, profile links |
| `content/journey.json` | "My Journey" paragraphs |
| `content/publications.json` | ResearchGate / Academia.edu cards |
| `content/media.json` | Featured interviews + YouTube channel link |
| `content/courses.json` | List of Udemy courses |
| `content/world.json` | Countries & cities visited |
| `content/contact.json` | Email + social links |

To add/remove a page from the nav menu entirely, edit the `nav` array in
`content/site.json`.

---

## 3. One-time GitHub setup

1. **Create the repo**
   - On github.com, click **New repository**.
   - Name it anything, e.g. `cagdasduman-site` (the name doesn't have to
     match the domain).
   - Set it to **Public** (required for free GitHub Pages on a personal
     account, unless you have GitHub Pro/Team).
   - Don't initialize with a README (we already have one).

2. **Upload these files**
   - Easiest: on the new repo's page, click **uploading an existing file**,
     drag the entire contents of this folder in, and commit.
   - Or via git command line:
     ```
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```

3. **Turn on GitHub Pages**
   - In the repo, go to **Settings → Pages**.
   - Under **Build and deployment → Source**, choose **GitHub Actions**.
     (The workflow file at `.github/workflows/deploy.yml` is already
     included and will run automatically on every push to `main`.)
   - Wait for the first run to finish under the **Actions** tab — you'll
     get a green checkmark and a `github.io` URL that already works.

---

## 4. Connecting the GoDaddy domain (cagdasduman.info)

You're pointing a domain you bought on GoDaddy at a site hosted on
GitHub. Two things need to happen: **DNS records at GoDaddy**, and
**telling GitHub the custom domain**.

### A. In this repo (already done for you)
- The file `CNAME` at the root of the repo contains exactly:
  ```
  cagdasduman.info
  ```
  This tells GitHub Pages which domain to serve on. (GitHub also lets
  you set this in Settings → Pages → Custom domain, which will
  regenerate this file automatically if it's ever missing.)

### B. In GoDaddy's DNS settings
Log into GoDaddy → **My Products** → find `cagdasduman.info` → **DNS** /
**Manage DNS**. Add/edit these records:

**For the root domain (`cagdasduman.info`) — four A records:**

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For the `www` subdomain (so `www.cagdasduman.info` also works):**

| Type | Name | Value |
|---|---|---|
| CNAME | www | `<your-github-username>.github.io` |

Delete/replace any existing GoDaddy "parked domain" A records or
forwarding records that conflict with the above (GoDaddy often adds a
default parking-page A record — remove it).

### C. Back in GitHub
- Go to **Settings → Pages** in your repo.
- Under **Custom domain**, type `cagdasduman.info` and click **Save**
  (this writes the `CNAME` file if it isn't already there).
- Wait for DNS to propagate — usually 10 minutes to a few hours,
  occasionally up to 24–48 hours.
- Once GitHub shows a green "DNS check successful," check the box for
  **Enforce HTTPS**. This gives you a free SSL certificate so the site
  loads as `https://cagdasduman.info`.

### D. Decide on `www` vs. bare domain
Pick one as the "canonical" version (recommend the bare domain,
`cagdasduman.info`, since that's what's in the `CNAME` file). GitHub
Pages will automatically redirect `www.cagdasduman.info` to it once
both DNS records above are in place.

---

## 5. Local preview (optional)

No build tools are required — it's plain static files. To preview
locally before pushing:

```
cd cagdasduman-site
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

---

## 6. Folder structure

```
/
├── index.html            Home
├── journey.html          My Journey
├── publications.html     Publications & Papers
├── courses.html          Online Courses
├── media.html            Media
├── world.html            Around the World
├── contact.html          Contact
├── CNAME                 Custom domain for GitHub Pages
├── content/               ← edit these JSON files to change site text
│   ├── site.json
│   ├── home.json
│   ├── journey.json
│   ├── publications.json
│   ├── media.json
│   ├── courses.json
│   ├── world.json
│   └── contact.json
├── assets/
│   ├── css/style.css
│   └── js/common.js
└── .github/workflows/deploy.yml   Auto-deploy on every push
```
