# nvnsthapa.github.io

Personal academic website for **Navin Thapa**, PhD researcher in Seismology at the Center for Earthquake Research and Information (CERI), University of Memphis.

## About

I study earthquake physics — from controlled rock-friction experiments in the lab to induced seismicity in geothermal systems and volcanic environments. My current research focuses on:

- Fault gouge composition and repeating earthquakes  
- Pore pressure effects on b-value (frequency-magnitude distribution)  
- Laboratory earthquakes and acoustic emission monitoring  
- Automated seismic detection and classification pipelines

## Site Structure

| Page | URL | Description |
|---|---|---|
| **Home** | `/` | Intro, research focus, selected publications, highlights, news |
| **Projects** | `/projects/projects.html` | Research project portfolio |
| **Publications** | `/publications/publications.html` | Peer-reviewed articles, datasets, conferences |
| **Blog** | `/blogs/blogs.html` | Field notes and research essays |
| **Activities** | `/more/more.html` | Fieldwork, workshops, instrumentation |

## Tech Stack

- Plain **HTML5 / CSS3 / JavaScript**
- **Bootstrap 4** (via MDB) for layout and components
- **jQuery** for DOM utilities
- **Leaflet.js** for the interactive fieldwork map
- **Dimensions.ai** badges for citation counts
- **MathJax 3** for math rendering on publication pages
- Hosted on **GitHub Pages**

## Local Development

No build step required — just serve the files with any static server:

```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: VS Code Live Server extension (click "Go Live")

# Option 3: npx serve
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Adding Content

### New Update (Home page)
Copy one `UPDATE ENTRY` block in [`index.html`](index.html) and paste it above the first entry.

### New Publication
Copy one `PUBLICATION ITEM` block in [`publications/publications.html`](publications/publications.html) and fill in title, authors, venue, and DOI.

### New Blog Post
1. Copy [`blogs/journey-as-geophysicist.html`](blogs/journey-as-geophysicist.html) as a template
2. Add a `BLOG CARD` entry in [`blogs/blogs.html`](blogs/blogs.html)

### New Project
1. Add a page inside `/projects/project_bvalue/`
2. Add a `PROJECT CARD` block in [`projects/projects.html`](projects/projects.html)

### New Activity
Add an `ACTIVITY EVENT` block in [`more/more.html`](more/more.html).

## Google Analytics 4

The site uses GA4. To activate, replace `G-XXXXXXXXXX` with your real Measurement ID in **all five pages** (index.html, projects, publications, blogs, more). Get your ID at [analytics.google.com](https://analytics.google.com) → Admin → Data Streams → Web.

## ORCID

Update the ORCID URL (`https://orcid.org/0000-0002-1234-5678`) with your real ORCID iD across all pages.

## License

[MIT License](https://opensource.org/license/mit/)

## Contact

- Website: [nvnsthapa.github.io](https://nvnsthapa.github.io)  
- Email: nthapa@memphis.edu  
- LinkedIn: [Navin Thapa](https://www.linkedin.com/in/nvnsthapa/)  
- Google Scholar: [Profile](https://scholar.google.com/citations?user=G-T459UAAAAJ&hl=en)
