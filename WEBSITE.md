# Parvin Emami — personal website

A multi-page static site with no build step. It works on GitHub Pages as-is.

## Pages

| Top bar | Page | File |
|---|---|---|
| `pe●` logo | Home: bilingual name, portrait, live "gaze tracker" canvas, research cards, latest news, selected papers | `index.html` |
| Projects | Research projects, each linked to its papers | `projects.html` |
| Publications | Papers grouped by year, topic filters, search, copy-citation | `publications.html` |
| News | News as a "scanpath" timeline (bigger circle = bigger news) | `news.html` |
| More ▸ Teaching | Courses, supervision topics, students table | `teaching.html` |
| More ▸ Books | Interactive bookshelf | `books.html` |
| More ▸ Activities | Research visits, talks, languages, recognition, service, hobbies | `activities.html` |
| More ▸ CV | Timeline + PDF download | `cv.html` |

Light/dark mode toggle in the header (remembers your choice).

## Editing content: one file

**All text lives in `assets/js/data.js`.** You never need to edit the HTML.

- Add news: put a new `{ date, tag, text, weight }` at the **top** of `news`. `weight` 1–3 sets the circle size.
- Add a paper: add an entry to `publications`. `topics` creates the filter chips; `project` links it to a project id; `selected: true` shows it on the home page.
- Entries with `placeholder: true` show a dashed **PLACEHOLDER** badge. Replace the text and delete that line. Placeholders currently exist for: books, students, talks, reviewing/service, hobbies.

## Files you should add

- `assets/img/portrait.jpg`: your photo (portrait ~4:5). Until it exists, a drawn monogram is shown.
- `assets/parvin-emami-cv.pdf`: your CV. The download button appears automatically once the file exists.

## Structure

```
index.html, projects.html, …     page skeletons (shared header/footer are injected)
assets/css/site.css              all styles; colors are the variables at the top
assets/js/data.js                ALL CONTENT
assets/js/main.js                renders pages, nav, theme, gaze animation
assets/favicon.svg
```

To add a new page, copy any `.html`, set `<body data-page="yourpage">`, add a renderer in `main.js`, and add it to `MAIN_NAV` or `MORE_NAV` there.

## Preview

```
python3 -m http.server 8000
```
then open http://localhost:8000. Opening the files directly also works, but the CV-PDF check needs a server.

## Publish (GitHub Pages)

Create a public repo `prviin.github.io`, upload everything in this folder (including `.nojekyll`), then go to **Settings → Pages → Deploy from branch → main / (root)**. The site will be at `https://prviin.github.io/`.

## Notes

- The previous single-page version is kept in `parvin-emami-website.zip`.
- Fonts: Fraunces, Inter, JetBrains Mono, Vazirmatn (for Persian) from Google Fonts. The site falls back to system fonts offline.
- Respects `prefers-reduced-motion`: the gaze animation and reveals are disabled.
