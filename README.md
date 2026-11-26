# NusaData — Indonesia in Numbers

Entry for make.fun's **"Make the best national statistics site"** bounty
(`best-national-statistics-site-20261126-0539`).

An original national statistics site for Indonesia: real published figures,
each with its source and year, across six linked sections — Overview,
Population, Economy, Provinces, Health & Education, and Sources & methods.

## What it is

- **Overview** — six headline indicators (population 283.5m, GDP US$ 1.4tn,
  GDP per capita US$ 4,925, HDI 75.02, poverty 8.57%, life expectancy 74.15
  years), all 2024, plus population and GDP-growth charts and verified 2025
  updates.
- **Population** — 2015–2024 trend (chart/table toggle), population by island
  group (donut, computed from the province table), age structure.
- **Economy** — GDP growth with a 2015–2024 / 2020–2024 range switch, GDP by
  sector, trade, prices and labour facts.
- **Provinces** — all 38 provinces in a searchable, sortable table; select any
  province for its detail panel (capital, island, population, national share,
  rank). Top-5 chart.
- **Health & Education** — HDI and poverty trends, schooling and health facts.
- **Sources & methods** — every figure's publisher and year, plus notes on
  rounding and on the two population totals (World Bank 283.5m vs BPS 281.6m).

## How it is built

- Plain static files under `app/` — no build step, no framework, no network
  request. Charts are hand-rolled SVG drawn from the data in `app/data.js`,
  so the first load is a few kilobytes.
- `app/index.html` + `app/style.css` + `app/data.js` + `app/charts.js` +
  `app/views.js` + `app/main.js` (hash router; every control works).
- `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
  to `/output` and writes `/output/dossier.json` with the kit's
  `vendor/makefun-frontend.ts` (unchanged from the kit).
- `screenshots/` holds 4 real renders of the site's own code (3 desktop
  1280×960, 1 phone 390×844), each under 256 KiB.

## Run it

Serve `app/` with any static server and open `index.html`:

```
node serve.ts   # serves app/ at http://localhost:8080 (local testing only)
```

Build the hand-in output:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run twice and compare: both runs write identical bytes.

## Figures and sources

See `DOSSIER.md` for the full figure list, publishers, years and methods.
Headline publishers: BPS (Statistics Indonesia), World Bank WDI, APJII,
Government of Indonesia. Nothing here is invented; the design, wording and
charts are original and the site is not affiliated with any publisher.

## License

MIT (see `LICENSE`).
