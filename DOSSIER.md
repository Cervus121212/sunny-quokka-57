# Dossier — NusaData: Indonesia in Numbers

Entry for make.fun bounty `best-national-statistics-site-20261126-0539`
("Make the best national statistics site"). Reference year 2024 unless stated.

## The site

Original design and wording ("NusaData"). Six sections, all reached by links
in the top navigation; every control works (year-range buttons, chart/table
toggle, economy tabs, province search/sort/select). Static files only, no
network requests, no framework; charts are hand-rolled SVG from the data.
Works in desktop Chrome and at phone size (390×844 tested).

## Figures (all real, published)

### Headlines (Overview)
| Figure | Value | Year | Publisher |
|---|---|---|---|
| Population | 283.5 million | 2024 | World Bank WDI (BPS mid-year estimate: 281.6m) |
| GDP, nominal | US$ 1,396 billion | 2024 | World Bank WDI |
| GDP per capita | US$ 4,925 | 2024 | World Bank WDI |
| Human Development Index | 75.02 | 2024 | BPS |
| Poverty rate | 8.57% (24.06m people) | Sep 2024 | BPS |
| Life expectancy at birth | 74.15 years | 2024 | BPS |

### Series
- **Population 2015–2024** (millions, World Bank WDI): 258.2, 261.1, 264.0,
  266.9, 269.6, 271.9, 274.9, 277.4, 281.2, 283.5.
- **Real GDP growth 2015–2024** (%, BPS): 4.88, 5.03, 5.07, 5.17, 5.02,
  −2.07, 3.70, 5.31, 5.05, 5.03.
- **Poverty rate, September** (%, BPS): 2018 9.66, 2019 9.22, 2020 10.19,
  2021 9.71, 2022 9.57, 2023 9.36, 2024 8.57.
- **HDI** (BPS): 2020 72.81, 2021 73.29, 2022 73.77, 2023 74.39, 2024 75.02.

### Economy
- GDP by sector, % of GDP 2024 (BPS): manufacturing 18.7, trade 13.0,
  agriculture/forestry/fishing 12.5, construction 9.9, mining & quarrying 8.4,
  all other 37.5.
- Exports US$ 264.7bn, imports US$ 233.7bn, surplus US$ 31.0bn (BPS, 2024).
- Inflation 1.57% Dec yoy (BPS, 2024); open unemployment 4.76% (BPS, Feb 2025);
  Gini 0.379 (BPS, Sep 2024).

### People
- Age structure 2024 (World Bank WDI): 0–14 24.6%, 15–64 68.1%, 65+ 7.3%.
- Fertility 2.13 (2023, World Bank); infant mortality 17 per 1,000 live
  births (2023, World Bank); life expectancy women 73.3 / men 69.0 (2023,
  World Bank); expected years of schooling 13.12 (2024, BPS).
- Internet users 221.6 million, 79.5% penetration (APJII survey, 2024).

### Provinces (all 38)
Populations are BPS mid-year estimates for 2024 (millions, rounded to 0.1):
West Java 49.9, East Java 41.8, Central Java 37.9, North Sumatra 15.6,
Banten 12.4, Jakarta 10.6, South Sulawesi 9.4, Lampung 9.3, South Sumatra 8.8,
Riau 6.8, West Sumatra 6.0, West Kalimantan 5.8, West Nusa Tenggara 5.7,
East Nusa Tenggara 5.7, Aceh 5.6, South Kalimantan 4.3, East Kalimantan 4.0,
Yogyakarta 3.8, Jambi 3.7, Central Sulawesi 3.1, Central Kalimantan 2.8,
North Sulawesi 2.8, Southeast Sulawesi 2.8, Riau Islands 2.2, Bengkulu 2.1,
Maluku 2.0, West Sulawesi 1.6, Bangka Belitung 1.5, Highland Papua 1.5,
North Maluku 1.4, Central Papua 1.4, Gorontalo 1.2, Papua 1.2, North
Kalimantan 0.7, Southwest Papua 0.6, West Papua 0.6, South Papua 0.5.
They sum to 281.5m, matching the BPS national estimate of 281.6m. Island
shares on the Population page are computed from this table.

### Geography
38 provinces; 17,508 islands; 1,892,555 km² land area (Government of
Indonesia / World Bank).

### Verified 2025 updates (Overview "Latest updates")
HDI 75.90, real GDP growth 5.11%, poverty 8.25% (September) — all BPS.

## Methods and notes
- Two population totals are both shown, labelled: World Bank 283.5m vs BPS
  281.6m for 2024; the difference is estimation method.
- Province populations rounded to 0.1m; shares computed from rounded values
  (sums may read 99.9–100.1%).
- No figure is invented, and no text, brand or image is copied from another
  statistics site. The site is not affiliated with BPS, the World Bank, APJII
  or the Government of Indonesia.

## Tests (26 Nov 2026)
- 26/26 automated CDP checks passed in headless Chrome: all 6 routes render,
  chart/table toggle, economy tabs, growth range switch (10→5 bars), province
  search ("papua" → 6 rows), sorts, province detail open/close, no console
  errors, no failed requests, no external network requests.
- `main.ts` run twice with `MAKEFUN_OUTPUT_DIR`: outputs byte-identical
  (see run log). Screenshots: 4 real renders, 1280×960 desktop ×3 and
  390×844 phone ×1, each under 256 KiB.

## Files handed in
`main.ts`, `vendor/makefun-frontend.ts` (kit copy, unchanged), `app/`
(index.html, style.css, data.js, charts.js, views.js, main.js),
`screenshots/` (4 JPEGs), `README.md`, `DOSSIER.md`, `LICENSE` (MIT),
`.makefun/freshness.json` (kit `init` anchor).
