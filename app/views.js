// NusaData views: one hash-routed page per section. Every page is reached by
// a link in the top nav, and every control on a page works: year-range buttons,
// chart/table toggles, province search and sorting, economy tabs, and the
// province detail panel. Nothing here fetches from the network.
import {
  COUNTRY, HEADLINES, POPULATION_SERIES, GDP_GROWTH_SERIES, POVERTY_SERIES,
  HDI_SERIES, AGE_STRUCTURE, GDP_SECTORS, ECONOMY_FACTS, PROVINCES,
  TOTAL_PROVINCE_POP, ISLAND_SHARES, SOURCES, fmt,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart, dataTable } from './charts.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sourceLine(source, year) {
  return `<p class="source">Source: ${esc(source)}${year ? `, ${year}` : ''}</p>`;
}

function kpiCard(h) {
  return `<article class="kpi"><p class="kpi-label">${esc(h.label)}</p>` +
    `<p class="kpi-value">${fmt(h.value, h.decimals)} <span class="kpi-unit">${esc(h.unit)}</span></p>` +
    `<p class="kpi-year">${h.year}</p><p class="kpi-note">${esc(h.note)}</p>` +
    `<p class="source">${esc(h.source)}</p></article>`;
}

function figure(html, caption, id) {
  return `<figure id="${id}">${html}<figcaption>${esc(caption)}</figcaption></figure>`;
}

// ---- Overview -------------------------------------------------------------
function viewOverview() {
  const pop = lineChart(POPULATION_SERIES, {
    unit: 'million people', color: '#0e7490',
    fmtValue: (v) => fmt(v, 1),
    ariaLabel: 'Population of Indonesia, 2015 to 2024, rising from 258.2 to 283.5 million',
  });
  const growth = barChart(GDP_GROWTH_SERIES.map((d) => ({ label: String(d.year), value: d.value })), {
    unit: '% per year', color: '#059669', fmtValue: (v) => fmt(v, 2),
    ariaLabel: 'Real GDP growth, 2015 to 2024, between minus 2.07 and 5.31 percent',
  });
  return `
  <section class="hero">
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The people, the economy and the provinces of the world&rsquo;s fourth most
    populous country — real figures, each with its source and year.</p>
    <p class="hero-meta">${COUNTRY.provinces} provinces &middot; ${fmt(COUNTRY.islands, 0)} islands &middot;
    ${fmt(COUNTRY.landAreaKm2, 0)} km&sup2; of land &middot; Capital ${esc(COUNTRY.capital)}</p>
  </section>
  <section class="kpis" aria-label="Headline indicators">${HEADLINES.map(kpiCard).join('')}</section>
  <section class="updates" aria-label="Latest updates">
    <h2>Latest updates</h2>
    <ul>
      <li><strong>2025:</strong> Human Development Index 75.90, up from 75.02 in 2024 (BPS).</li>
      <li><strong>2025:</strong> Real GDP grew 5.11%, up from 5.03% in 2024 (BPS).</li>
      <li><strong>September 2025:</strong> Poverty rate 8.25%, down from 8.57% a year earlier (BPS).</li>
    </ul>
  </section>
  <div class="chart-grid">
    <section class="card">
      <h2>Population, 2015–2024</h2>
      ${figure(pop, 'Population in millions. Indonesia passed 280 million people in 2023.', 'fig-pop')}
      ${sourceLine(SOURCES.wbPop, 2024)}
    </section>
    <section class="card">
      <h2>Real GDP growth, 2015–2024</h2>
      ${figure(growth, 'Annual change in real GDP. The 2020 dip is the COVID-19 contraction; growth has held near 5% since.', 'fig-growth')}
      ${sourceLine(SOURCES.bpsGrowth, 2024)}
    </section>
  </div>
  <section class="card">
    <h2>At a glance</h2>
    <p>Indonesia is the world&rsquo;s largest archipelago and its fourth most populous country.
    More than half of its people live on Java, an island about the size of England, while the
    eastern provinces of Papua are among the least densely settled places on earth. The economy
    — US$ 1.4 trillion in 2024 — is the largest in Southeast Asia, built on manufacturing,
    trade and agriculture. This site gathers the figures a visitor needs, province by province,
    with the source of every number on the <a href="#/sources">Sources</a> page.</p>
    <p><a class="btn" href="#/population">Explore the population &rarr;</a>
    <a class="btn" href="#/economy">Explore the economy &rarr;</a>
    <a class="btn" href="#/provinces">Browse all 38 provinces &rarr;</a></p>
  </section>`;
}

// ---- Population -----------------------------------------------------------
let popView = 'chart'; // 'chart' | 'table'
function viewPopulation() {
  const age = hbarChart(AGE_STRUCTURE.map((d) => ({ label: d.group, value: d.value })), {
    unit: '%', color: '#0e7490', fmtValue: (v) => fmt(v, 1),
    ariaLabel: 'Age structure: 24.6 percent aged 0 to 14, 68.1 percent aged 15 to 64, 7.3 percent 65 and over',
  });
  const donut = donutChart(ISLAND_SHARES.map((d) => ({ label: d.island, value: d.pop })), {
    fmtValue: (v) => `${fmt(v, 1)}m`,
    ariaLabel: 'Population by island group: Java 55.6 percent, Sumatra 21.9 percent, Sulawesi 7.4 percent, Kalimantan 6.3 percent',
  });
  const legend = ISLAND_SHARES.map((d, i) =>
    `<li><span class="swatch" style="background:${['#0e7490', '#0891b2', '#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#64748b'][i % 8]}"></span>${esc(d.island)} — ${fmt(d.pop, 1)}m (${fmt(d.share, 1)}%)</li>`).join('');
  const table = dataTable(['Year', 'Population (million)', 'Change'],
    POPULATION_SERIES.map((d, i) => {
      const prev = i ? POPULATION_SERIES[i - 1].value : null;
      const ch = prev === null ? '—' : `+${fmt(d.value - prev, 1)}m`;
      return [String(d.year), fmt(d.value, 1), ch];
    }), 'Population of Indonesia by year, 2015 to 2024');
  const chartHtml = lineChart(POPULATION_SERIES, {
    unit: 'million people', color: '#0e7490', fmtValue: (v) => fmt(v, 1),
    ariaLabel: 'Population of Indonesia, 2015 to 2024, rising from 258.2 to 283.5 million',
  });
  return `
  <h1>Population</h1>
  <p class="lede">283.5 million people in 2024 (World Bank) — the world&rsquo;s 4th largest population.
  The BPS mid-year estimate for the same year is 281.6 million; the two differ because their
  estimation methods differ.</p>
  <section class="card">
    <h2>Population trend</h2>
    <div class="controls" role="group" aria-label="Population display">
      <button type="button" data-popview="chart" class="${popView === 'chart' ? 'active' : ''}">Chart</button>
      <button type="button" data-popview="table" class="${popView === 'table' ? 'active' : ''}">Table</button>
    </div>
    <div id="pop-display">${popView === 'chart'
      ? figure(chartHtml, 'Population in millions, 2015–2024.', 'fig-pop-trend')
      : `<div class="table-wrap">${table}</div>`}</div>
    ${sourceLine(SOURCES.wbPop, 2024)}
  </section>
  <div class="chart-grid">
    <section class="card">
      <h2>Where people live</h2>
      ${figure(donut, 'Share of the population by island group, computed from the 38-province table.', 'fig-islands')}
      <ul class="legend">${legend}</ul>
      ${sourceLine('Computed from BPS province estimates', 2024)}
    </section>
    <section class="card">
      <h2>Age structure</h2>
      ${figure(age, 'Share of the population by age group. Two in three Indonesians are of working age.', 'fig-age')}
      <p>Median age is about 30 years. Fertility is 2.13 births per woman (2023), close to
      replacement level, so growth is slowing: +0.8% a year in 2024.</p>
      ${sourceLine(SOURCES.wbHealth, 2024)}
    </section>
  </div>`;
}

// ---- Economy --------------------------------------------------------------
let econTab = 'growth'; // 'growth' | 'sectors' | 'trade'
let growthFrom = 2015;
function viewEconomy() {
  const series = GDP_GROWTH_SERIES.filter((d) => d.year >= growthFrom);
  const growth = barChart(series.map((d) => ({ label: String(d.year), value: d.value })), {
    unit: '% per year', color: '#059669', fmtValue: (v) => fmt(v, 2),
    ariaLabel: `Real GDP growth from ${growthFrom} to 2024`,
  });
  const sectors = hbarChart(GDP_SECTORS.map((d) => ({ label: d.sector, value: d.value })), {
    unit: '% of GDP', color: '#2563eb', fmtValue: (v) => fmt(v, 1),
    ariaLabel: 'GDP by sector: manufacturing 18.7 percent, trade 13.0, agriculture 12.5, construction 9.9, mining 8.4, all other sectors 37.5',
  });
  const facts = ECONOMY_FACTS.slice(0, 7).map((f) =>
    `<li><strong>${esc(f.label)}:</strong> ${esc(f.value)} <span class="source-inline">(${esc(f.source)})</span></li>`).join('');
  const tabBtn = (id, label) => `<button type="button" data-econtab="${id}" class="${econTab === id ? 'active' : ''}">${label}</button>`;
  let body = '';
  if (econTab === 'growth') {
    body = `<h2>Real GDP growth</h2>
    <div class="controls" role="group" aria-label="Growth chart range">
      <button type="button" data-growthfrom="2015" class="${growthFrom === 2015 ? 'active' : ''}">2015–2024</button>
      <button type="button" data-growthfrom="2020" class="${growthFrom === 2020 ? 'active' : ''}">2020–2024</button>
    </div>
    ${figure(growth, 'Annual change in real GDP, percent. Growth held near 5% in every year except the 2020 contraction.', 'fig-gdp-growth')}
    ${sourceLine(SOURCES.bpsGrowth, 2024)}
    <p>GDP in current prices reached Rp 22,139 trillion in 2024 (BPS) — about US$ 1.4 trillion.
    Growth of 5.03% in 2024 followed 5.05% in 2023 and 5.31% in 2022.</p>`;
  } else if (econTab === 'sectors') {
    body = `<h2>What the economy makes</h2>
    ${figure(sectors, 'Share of GDP by sector, 2024. Manufacturing is the largest single sector.', 'fig-sectors')}
    ${sourceLine(SOURCES.bpsGrowth, 2024)}
    <p>Manufacturing — food, textiles, electronics, vehicles — is the backbone at 18.7% of GDP,
    ahead of trade (13.0%) and agriculture, forestry and fishing (12.5%).</p>`;
  } else {
    body = `<h2>Trade, prices and work</h2>
    <ul class="facts">${facts}</ul>
    <p>Exports of US$ 264.7 billion in 2024 — coal, palm oil, nickel products and garments among
    the largest — left a US$ 31.0 billion surplus over imports of US$ 233.7 billion.</p>
    ${sourceLine(SOURCES.bpsTrade, 2024)}`;
  }
  return `
  <h1>Economy</h1>
  <p class="lede">A US$ 1.4 trillion economy in 2024 (World Bank), the largest in Southeast Asia,
  growing 5.03% in real terms. GDP per capita: US$ 4,925.</p>
  <section class="card">
    <div class="controls" role="tablist" aria-label="Economy sections">
      ${tabBtn('growth', 'Growth')}${tabBtn('sectors', 'Sectors')}${tabBtn('trade', 'Trade & prices')}
    </div>
    ${body}
  </section>`;
}

// ---- Provinces ------------------------------------------------------------
let provQuery = '';
let provSort = 'pop'; // 'pop' | 'name' | 'island'
let provSelected = null;
function provinceRows() {
  const q = provQuery.trim().toLowerCase();
  let rows = PROVINCES.filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) =>
    provSort === 'name' ? a.name.localeCompare(b.name)
      : provSort === 'island' ? a.island.localeCompare(b.island) || b.pop - a.pop
        : b.pop - a.pop);
  return rows;
}
function viewProvinces() {
  const rows = provinceRows();
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  const topChart = hbarChart(top5.map((p) => ({ label: p.name, value: p.pop })), {
    unit: 'm people', color: '#0e7490', fmtValue: (v) => fmt(v, 1),
    ariaLabel: 'Five most populous provinces: West Java 49.9, East Java 41.8, Central Java 37.9, North Sumatra 15.6, Banten 12.4 million',
  });
  const sel = provSelected ? PROVINCES.find((p) => p.name === provSelected) : null;
  const detail = sel ? `<aside class="detail" aria-label="Province detail">
      <h2>${esc(sel.name)}</h2>
      <dl>
        <dt>Capital</dt><dd>${esc(sel.capital)}</dd>
        <dt>Island</dt><dd>${esc(sel.island)}</dd>
        <dt>Population (2024)</dt><dd>${fmt(sel.pop, 1)} million</dd>
        <dt>Share of Indonesia</dt><dd>${fmt((sel.pop / TOTAL_PROVINCE_POP) * 100, 1)}%</dd>
        <dt>Rank by population</dt><dd>#${[...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((p) => p.name === sel.name) + 1} of 38</dd>
      </dl>
      <button type="button" data-clear-province="1">Close</button>
    </aside>` : '';
  const table = dataTable(['#', 'Province', 'Capital', 'Island', 'Population (m)', 'Share'],
    rows.map((p) => {
      const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === p.name) + 1;
      return [String(rank), `<button type="button" class="linklike" data-province="${esc(p.name)}">${esc(p.name)}</button>`,
        esc(p.capital), esc(p.island), fmt(p.pop, 1), `${fmt((p.pop / TOTAL_PROVINCE_POP) * 100, 1)}%`];
    }), 'All 38 provinces of Indonesia with 2024 population');
  return `
  <h1>Provinces</h1>
  <p class="lede">All 38 provinces, from West Java (49.9 million people) to South Papua (0.5 million).
  Populations are BPS mid-year estimates for 2024; together they sum to ${fmt(TOTAL_PROVINCE_POP, 1)} million,
  matching the national estimate of 281.6 million. Select a province for its detail.</p>
  <section class="card">
    <h2>Five largest provinces</h2>
    ${figure(topChart, 'The five most populous provinces, in millions of people, 2024.', 'fig-top5')}
    ${sourceLine(SOURCES.bpsPop, 2024)}
  </section>
  ${detail}
  <section class="card">
    <h2>All provinces</h2>
    <div class="controls">
      <label>Search <input type="search" id="prov-search" placeholder="Province, capital or island…" value="${esc(provQuery)}" aria-label="Search provinces"></label>
      <span role="group" aria-label="Sort provinces">
        <button type="button" data-provsort="pop" class="${provSort === 'pop' ? 'active' : ''}">By population</button>
        <button type="button" data-provsort="name" class="${provSort === 'name' ? 'active' : ''}">By name</button>
        <button type="button" data-provsort="island" class="${provSort === 'island' ? 'active' : ''}">By island</button>
      </span>
    </div>
    <p id="prov-count" aria-live="polite">${rows.length} of 38 provinces shown.</p>
    <div class="table-wrap">${table}</div>
    ${sourceLine(SOURCES.bpsPop, 2024)}
  </section>`;
}

// ---- People: health & education -------------------------------------------
function viewPeople() {
  const hdi = lineChart(HDI_SERIES, {
    unit: 'HDI points', color: '#7c3aed', fmtValue: (v) => fmt(v, 2),
    ariaLabel: 'Human Development Index, 2020 to 2024, rising from 72.81 to 75.02',
  });
  const pov = lineChart(POVERTY_SERIES, {
    unit: '% of population', color: '#b91c1c', fmtValue: (v) => fmt(v, 2),
    ariaLabel: 'Poverty rate, September 2018 to 2024, falling from 9.66 to 8.57 percent',
  });
  const facts = ECONOMY_FACTS.slice(7).map((f) =>
    `<li><strong>${esc(f.label)}:</strong> ${esc(f.value)} <span class="source-inline">(${esc(f.source)})</span></li>`).join('');
  return `
  <h1>People: health &amp; education</h1>
  <p class="lede">Life expectancy 74.15 years and a Human Development Index of 75.02 in 2024 (BPS).
  Poverty has fallen in six of the last seven Septembers.</p>
  <div class="chart-grid">
    <section class="card">
      <h2>Human Development Index</h2>
      ${figure(hdi, 'HDI, 2020–2024. The index combines long life, schooling and a decent standard of living.', 'fig-hdi')}
      ${sourceLine(SOURCES.bpsHdi, 2024)}
      <p>All three HDI dimensions rose in 2024. The 2025 update puts the index at 75.90.</p>
    </section>
    <section class="card">
      <h2>Poverty rate</h2>
      ${figure(pov, 'Poverty rate in September each year, percent of population.', 'fig-poverty')}
      ${sourceLine(SOURCES.bpsPoverty, 2024)}
      <p>8.57% in September 2024 — 24.06 million people — down from 10.19% in September 2020.</p>
    </section>
  </div>
  <section class="card">
    <h2>Health &amp; schooling in figures</h2>
    <ul class="facts">${facts}</ul>
    ${sourceLine('BPS and World Bank, as labelled per figure', 2024)}
  </section>`;
}

// ---- Sources --------------------------------------------------------------
function viewSources() {
  const rows = [
    ['Population (national series)', 'World Bank, World Development Indicators', '2024', 'Annual population, age structure, fertility, life expectancy by sex, infant mortality'],
    ['Population (provinces)', 'BPS (Statistics Indonesia), mid-year estimates', '2024', 'Population of all 38 provinces, capitals, island groups'],
    ['GDP & growth', 'BPS national accounts; World Bank WDI', '2024', 'Real GDP growth 2015–2024, GDP in US$, GDP per capita'],
    ['GDP by sector', 'BPS national accounts', '2024', 'Sector shares of GDP'],
    ['Poverty', 'BPS poverty statistics (September)', '2018–2024', 'Poverty rate and number of poor people'],
    ['Human development', 'BPS Human Development Index release', '2020–2024', 'HDI, life expectancy, expected years of schooling'],
    ['Labour', 'BPS Sakernas labour force survey', 'Feb 2025', 'Open unemployment rate'],
    ['Prices', 'BPS consumer price index', '2024', 'Annual inflation'],
    ['Trade', 'BPS foreign trade statistics', '2024', 'Exports, imports, trade balance'],
    ['Internet use', 'APJII survey', '2024', 'Internet users and penetration'],
    ['Geography', 'Government of Indonesia (BIG / KKP)', '—', 'Island count, land area, number of provinces'],
  ];
  return `
  <h1>Sources &amp; methods</h1>
  <p class="lede">Every figure on this site comes from a published source. Nothing here is
  estimated by this site, and no figure is copied from another statistics site&rsquo;s
  text or brand: the wording, design and charts are original.</p>
  <section class="card">
    <h2>Where each figure comes from</h2>
    <div class="table-wrap">${dataTable(['Figures', 'Publisher', 'Year', 'Covers'], rows.map((r) => r.map(esc)), 'Sources of every figure on this site')}</div>
  </section>
  <section class="card">
    <h2>Methods &amp; notes</h2>
    <ul class="facts">
      <li><strong>Two population totals.</strong> The World Bank puts 2024 population at 283.5 million; the BPS mid-year estimate is 281.6 million. Both are shown, labelled — they differ by estimation method, not by error.</li>
      <li><strong>Rounding.</strong> Province populations are rounded to 0.1 million; shares are computed from the rounded values and may sum to 99.9–100.1%.</li>
      <li><strong>Island shares.</strong> Computed from the province table on this site, so they agree with the table exactly.</li>
      <li><strong>Reference year.</strong> 2024 is the reference year throughout; the Overview notes the verified 2025 updates (HDI 75.90, GDP growth 5.11%, poverty 8.25%).</li>
      <li><strong>Currency.</strong> Rupiah figures use the BPS published totals; US$ figures use World Bank/IMF conversions as published.</li>
    </ul>
  </section>
  <section class="card">
    <h2>About NusaData</h2>
    <p>NusaData is an independent, original reference site built for readers who want Indonesia&rsquo;s
    key statistics in one place, with the source of every number in view. It is not affiliated
    with BPS, the World Bank, or any government body; figures are cited to those publishers.</p>
  </section>`;
}

// ---- Router ---------------------------------------------------------------
const ROUTES = {
  '/': viewOverview,
  '/population': viewPopulation,
  '/economy': viewEconomy,
  '/provinces': viewProvinces,
  '/people': viewPeople,
  '/sources': viewSources,
};

export function currentRoute() {
  const h = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[h] ? h : '/';
}

export function render() {
  const route = currentRoute();
  document.getElementById('page').innerHTML = ROUTES[route]();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('current', a.getAttribute('href') === `#${route}`);
    if (a.getAttribute('href') === `#${route}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

// Delegated controls: one listener, every button/input on every page.
export function bindControls() {
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('button');
    if (!t) return;
    if (t.dataset.popview) { popView = t.dataset.popview; render(); }
    else if (t.dataset.econtab) { econTab = t.dataset.econtab; render(); }
    else if (t.dataset.growthfrom) { growthFrom = Number(t.dataset.growthfrom); render(); }
    else if (t.dataset.provsort) { provSort = t.dataset.provsort; render(); }
    else if (t.dataset.province) { provSelected = t.dataset.province; render(); }
    else if (t.dataset.clearProvince) { provSelected = null; render(); }
  });
  document.addEventListener('input', (ev) => {
    if (ev.target.id === 'prov-search') {
      provQuery = ev.target.value;
      const rows = provinceRows();
      const table = dataTable(['#', 'Province', 'Capital', 'Island', 'Population (m)', 'Share'],
        rows.map((p) => {
          const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === p.name) + 1;
          return [String(rank), `<button type="button" class="linklike" data-province="${esc(p.name)}">${esc(p.name)}</button>`,
            esc(p.capital), esc(p.island), fmt(p.pop, 1), `${fmt((p.pop / TOTAL_PROVINCE_POP) * 100, 1)}%`];
        }), 'All 38 provinces of Indonesia with 2024 population');
      const wrap = document.querySelector('#page .table-wrap');
      if (wrap) wrap.innerHTML = table;
      const count = document.getElementById('prov-count');
      if (count) count.textContent = `${rows.length} of 38 provinces shown.`;
    }
  });
  window.addEventListener('hashchange', render);
}
