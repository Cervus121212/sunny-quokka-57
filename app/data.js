// NusaData — Indonesia in Numbers.
// Every figure below is a real published figure. Each series names its publisher
// and year; the Sources page lists them all. Figures are rounded for display;
// the raw values here are the published ones. Two publishers disagree slightly
// on total population (World Bank 283.5m vs BPS mid-year estimate 281.6m for
// 2024) because their estimation methods differ — both are shown, labelled.

export const SOURCES = {
  bpsPop: 'BPS (Statistics Indonesia), mid-year population estimates',
  wbPop: 'World Bank, World Development Indicators (WDI)',
  bpsGrowth: 'BPS (Statistics Indonesia), national accounts',
  wbGdp: 'World Bank, World Development Indicators (WDI)',
  bpsPoverty: 'BPS (Statistics Indonesia), poverty statistics (September)',
  bpsHdi: 'BPS (Statistics Indonesia), Human Development Index release',
  bpsLabour: 'BPS (Statistics Indonesia), Sakernas labour force survey',
  bpsPrices: 'BPS (Statistics Indonesia), consumer price index',
  bpsTrade: 'BPS (Statistics Indonesia), foreign trade statistics',
  apjii: 'APJII (Indonesian Internet Service Providers Association), 2024 survey',
  wbHealth: 'World Bank, World Development Indicators (WDI)',
  govIslands: 'Government of Indonesia (Geospatial Information Agency / KKP)',
};

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'The archipelago in numbers',
  capital: 'Jakarta',
  provinces: 38,
  islands: 17508,
  landAreaKm2: 1892555,
  language: 'Indonesian',
  currency: 'Rupiah (IDR)',
  referenceYear: 2024,
};

// Headline indicators shown on the Overview page.
export const HEADLINES = [
  { key: 'population', label: 'Population', value: 283.5, unit: 'million', decimals: 1, year: 2024, source: SOURCES.wbPop, note: 'BPS mid-year estimate: 281.6m' },
  { key: 'gdp', label: 'GDP (nominal)', value: 1396, unit: 'US$ billion', decimals: 0, year: 2024, source: SOURCES.wbGdp, note: '16th largest economy in the world' },
  { key: 'gdpCapita', label: 'GDP per capita', value: 4925, unit: 'US$', decimals: 0, year: 2024, source: SOURCES.wbGdp, note: 'Upper-middle income' },
  { key: 'hdi', label: 'Human Development Index', value: 75.02, unit: 'points', decimals: 2, year: 2024, source: SOURCES.bpsHdi, note: 'High human development; 2025: 75.90' },
  { key: 'poverty', label: 'Poverty rate', value: 8.57, unit: '%', decimals: 2, year: 2024, source: SOURCES.bpsPoverty, note: '24.06 million people (September)' },
  { key: 'life', label: 'Life expectancy', value: 74.15, unit: 'years', decimals: 2, year: 2024, source: SOURCES.bpsHdi, note: 'At birth' },
];

// Population in millions, 2015–2024 (World Bank WDI).
export const POPULATION_SERIES = [
  { year: 2015, value: 258.2 }, { year: 2016, value: 261.1 },
  { year: 2017, value: 264.0 }, { year: 2018, value: 266.9 },
  { year: 2019, value: 269.6 }, { year: 2020, value: 271.9 },
  { year: 2021, value: 274.9 }, { year: 2022, value: 277.4 },
  { year: 2023, value: 281.2 }, { year: 2024, value: 283.5 },
];

// Real GDP growth, % per year, 2015–2024 (BPS national accounts).
export const GDP_GROWTH_SERIES = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// Poverty rate, % of population, September each year (BPS).
export const POVERTY_SERIES = [
  { year: 2018, value: 9.66 }, { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 }, { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 }, { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// Human Development Index, 2020–2024 (BPS).
export const HDI_SERIES = [
  { year: 2020, value: 72.81 }, { year: 2021, value: 73.29 },
  { year: 2022, value: 73.77 }, { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Age structure, % of population, 2024 (World Bank WDI).
export const AGE_STRUCTURE = [
  { group: '0–14 years', value: 24.6 },
  { group: '15–64 years', value: 68.1 },
  { group: '65+ years', value: 7.3 },
];

// GDP by sector, % of GDP, 2024 (BPS national accounts).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', value: 18.7 },
  { sector: 'Wholesale & retail trade', value: 13.0 },
  { sector: 'Agriculture, forestry & fishing', value: 12.5 },
  { sector: 'Construction', value: 9.9 },
  { sector: 'Mining & quarrying', value: 8.4 },
  { sector: 'All other sectors', value: 37.5 },
];

// Economy facts (BPS unless noted).
export const ECONOMY_FACTS = [
  { label: 'Exports 2024', value: 'US$ 264.7 bn', source: SOURCES.bpsTrade },
  { label: 'Imports 2024', value: 'US$ 233.7 bn', source: SOURCES.bpsTrade },
  { label: 'Trade surplus 2024', value: 'US$ 31.0 bn', source: SOURCES.bpsTrade },
  { label: 'Inflation 2024', value: '1.57% (Dec, yoy)', source: SOURCES.bpsPrices },
  { label: 'Open unemployment', value: '4.76% (Feb 2025)', source: SOURCES.bpsLabour },
  { label: 'Gini ratio', value: '0.379 (Sep 2024)', source: SOURCES.bpsPoverty },
  { label: 'Internet users 2024', value: '221.6 million (79.5%)', source: SOURCES.apjii },
  { label: 'Fertility rate', value: '2.13 births per woman (2023)', source: SOURCES.wbHealth },
  { label: 'Infant mortality', value: '17 per 1,000 live births (2023)', source: SOURCES.wbHealth },
  { label: 'Life expectancy, women', value: '73.3 years (2023)', source: SOURCES.wbHealth },
  { label: 'Life expectancy, men', value: '69.0 years (2023)', source: SOURCES.wbHealth },
  { label: 'Expected years of schooling', value: '13.12 years (2024)', source: SOURCES.bpsHdi },
];

// Provinces: population in millions, BPS mid-year estimate 2024 (rounded to
// 0.1m). Shares are computed from these values; they sum to ~281.5m, matching
// the BPS national estimate of 281.6m. Capitals and islands are as published.
export const PROVINCES = [
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5.6 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 15.6 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 6.0 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6.8 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatra', pop: 3.7 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8.8 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', pop: 2.1 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9.3 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatra', pop: 1.5 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', island: 'Sumatra', pop: 2.2 },
  { name: 'Jakarta', capital: 'Jakarta', island: 'Java', pop: 10.6 },
  { name: 'West Java', capital: 'Bandung', island: 'Java', pop: 49.9 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 37.9 },
  { name: 'Yogyakarta', capital: 'Yogyakarta', island: 'Java', pop: 3.8 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 41.8 },
  { name: 'Banten', capital: 'Serang', island: 'Java', pop: 12.4 },
  { name: 'Bali', capital: 'Denpasar', island: 'Bali', pop: 4.4 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', island: 'Lesser Sunda', pop: 5.7 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', island: 'Lesser Sunda', pop: 5.7 },
  { name: 'West Kalimantan', capital: 'Pontianak', island: 'Kalimantan', pop: 5.8 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.8 },
  { name: 'South Kalimantan', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.3 },
  { name: 'East Kalimantan', capital: 'Samarinda', island: 'Kalimantan', pop: 4.0 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.7 },
  { name: 'North Sulawesi', capital: 'Manado', island: 'Sulawesi', pop: 2.8 },
  { name: 'Central Sulawesi', capital: 'Palu', island: 'Sulawesi', pop: 3.1 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', pop: 9.4 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', island: 'Sulawesi', pop: 2.8 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.2 },
  { name: 'West Sulawesi', capital: 'Mamuju', island: 'Sulawesi', pop: 1.6 },
  { name: 'Maluku', capital: 'Ambon', island: 'Maluku', pop: 2.0 },
  { name: 'North Maluku', capital: 'Sofifi', island: 'Maluku', pop: 1.4 },
  { name: 'Southwest Papua', capital: 'Sorong', island: 'Papua', pop: 0.6 },
  { name: 'West Papua', capital: 'Manokwari', island: 'Papua', pop: 0.6 },
  { name: 'South Papua', capital: 'Merauke', island: 'Papua', pop: 0.5 },
  { name: 'Central Papua', capital: 'Nabire', island: 'Papua', pop: 1.4 },
  { name: 'Highland Papua', capital: 'Wamena', island: 'Papua', pop: 1.5 },
  { name: 'Papua', capital: 'Jayapura', island: 'Papua', pop: 1.2 },
];

export const TOTAL_PROVINCE_POP = PROVINCES.reduce((s, p) => s + p.pop, 0);

// Population share by island group, computed from the province table.
export const ISLAND_SHARES = (() => {
  const byIsland = new Map();
  for (const p of PROVINCES) byIsland.set(p.island, (byIsland.get(p.island) ?? 0) + p.pop);
  const order = ['Java', 'Sumatra', 'Sulawesi', 'Kalimantan', 'Lesser Sunda', 'Bali', 'Papua', 'Maluku'];
  return order
    .filter((i) => byIsland.has(i))
    .map((island) => ({ island, pop: byIsland.get(island), share: (byIsland.get(island) / TOTAL_PROVINCE_POP) * 100 }));
})();

export const fmt = (n, decimals = 1) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
