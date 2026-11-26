// NusaData charts: small hand-rolled SVG charts drawn from the real data.
// No chart library is vendored — the whole site stays a few kilobytes, so the
// first load is tiny. Every chart has labelled axes with round ("nice") ticks,
// a <title> tooltip on each point, and an accessible text summary.

const NS = 'http://www.w3.org/2000/svg';
const AXIS = '#64748b';
const GRID = '#e2e8f0';
const INK = '#0f172a';

// Round the top of an axis up to a "nice" number (1, 2, 5 or 10 × 10^n).
export function niceMax(v) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return m * p;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(label)}" xmlns="${NS}">`;
}

// Line chart with labelled axes. `series` is [{year, value}], `unit` the y unit,
// `color` the line colour, `fmtValue` formats a point for its tooltip.
export function lineChart(series, { width = 640, height = 300, unit = '', color = '#0e7490', fmtValue = (v) => String(v), ariaLabel = '' } = {}) {
  const padL = 52, padR = 14, padT = 14, padB = 34;
  const iw = width - padL - padR, ih = height - padT - padB;
  const vals = series.map((d) => d.value);
  const min = Math.min(0, ...vals);
  const max = niceMax(Math.max(...vals));
  const x = (i) => padL + (iw * i) / (series.length - 1);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const ticks = 5;
  let g = '';
  for (let t = 0; t < ticks; t++) {
    const v = min + ((max - min) * t) / (ticks - 1);
    const yy = y(v);
    g += `<line x1="${padL}" y1="${yy}" x2="${width - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${AXIS}">${fmtValue(v)}</text>`;
  }
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const area = `${padL},${y(min)} ${points} ${x(series.length - 1).toFixed(1)},${y(min)}`;
  let out = svgOpen(width, height, ariaLabel || `Line chart, ${series[0].year} to ${series[series.length - 1].year}`);
  out += g;
  out += `<polygon points="${area}" fill="${color}" opacity="0.10"/>`;
  out += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((d, i) => {
    out += `<circle cx="${x(i)}" cy="${y(d.value)}" r="4" fill="#fff" stroke="${color}" stroke-width="2"><title>${d.year}: ${fmtValue(d.value)}${unit ? ' ' + unit : ''}</title></circle>`;
    if (i % 2 === 0 || i === series.length - 1) {
      out += `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${AXIS}">${d.year}</text>`;
    }
  });
  out += `<text x="${width - padR}" y="${padT - 2}" text-anchor="end" font-size="11" fill="${AXIS}">${esc(unit)}</text>`;
  out += '</svg>';
  return out;
}

// Vertical bar chart. `data` is [{label, value}]; bars start at zero.
export function barChart(data, { width = 640, height = 300, unit = '', color = '#0e7490', fmtValue = (v) => String(v), ariaLabel = '' } = {}) {
  const padL = 52, padR = 14, padT = 14, padB = 34;
  const iw = width - padL - padR, ih = height - padT - padB;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const bw = iw / data.length;
  const ticks = 5;
  let g = '';
  for (let t = 0; t < ticks; t++) {
    const v = (max * t) / (ticks - 1);
    const yy = padT + ih - (ih * t) / (ticks - 1);
    g += `<line x1="${padL}" y1="${yy}" x2="${width - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${AXIS}">${fmtValue(v)}</text>`;
  }
  let out = svgOpen(width, height, ariaLabel || 'Bar chart');
  out += g;
  data.forEach((d, i) => {
    const bh = (d.value / max) * ih;
    const bx = padL + i * bw + bw * 0.18;
    const bw2 = bw * 0.64;
    const by = padT + ih - bh;
    const neg = d.value < 0;
    out += `<rect x="${bx.toFixed(1)}" y="${(neg ? padT + ih : by).toFixed(1)}" width="${bw2.toFixed(1)}" height="${Math.abs(bh).toFixed(1)}" rx="3" fill="${neg ? '#b91c1c' : color}"><title>${esc(d.label)}: ${fmtValue(d.value)}${unit ? ' ' + unit : ''}</title></rect>`;
    // A negative bar hangs below the zero line, so its value sits just above
    // the line in red, where it stays readable; positives sit above the bar.
    const ly = neg ? padT + ih - 6 : by - 6;
    out += `<text x="${(bx + bw2 / 2).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${neg ? '#b91c1c' : INK}">${fmtValue(d.value)}</text>`;
    out += `<text x="${(bx + bw2 / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${AXIS}">${esc(d.label)}</text>`;
  });
  out += `<text x="${width - padR}" y="${padT - 2}" text-anchor="end" font-size="11" fill="${AXIS}">${esc(unit)}</text>`;
  out += '</svg>';
  return out;
}

// Horizontal ranking bars, best for long category names.
export function hbarChart(data, { width = 720, rowH = 34, unit = '', color = '#0e7490', fmtValue = (v) => String(v), ariaLabel = '' } = {}) {
  const padL = 190, padR = 100, padT = 8, padB = 8;
  const height = padT + padB + data.length * rowH;
  const iw = width - padL - padR;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  let out = svgOpen(width, height, ariaLabel || 'Horizontal bar chart');
  data.forEach((d, i) => {
    const y = padT + i * rowH + rowH / 2;
    const w = Math.max(1, (d.value / max) * iw);
    out += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="${INK}">${esc(d.label)}</text>`;
    out += `<rect x="${padL}" y="${y - 9}" width="${w.toFixed(1)}" height="18" rx="3" fill="${color}"><title>${esc(d.label)}: ${fmtValue(d.value)}${unit ? ' ' + unit : ''}</title></rect>`;
    out += `<text x="${padL + w + 8}" y="${y + 4}" font-size="12" font-weight="600" fill="${INK}">${fmtValue(d.value)}${unit ? ' ' + unit : ''}</text>`;
  });
  out += '</svg>';
  return out;
}

// Donut chart with a centre total and a legend list beside it.
export function donutChart(data, { width = 300, height = 300, fmtValue = (v) => String(v), ariaLabel = '' } = {}) {
  const cx = width / 2, cy = height / 2, r = 105, inner = 68;
  const total = data.reduce((s, d) => s + d.value, 0);
  const palette = ['#0e7490', '#0891b2', '#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#64748b'];
  let out = svgOpen(width, height, ariaLabel || 'Donut chart');
  let a0 = -Math.PI / 2;
  data.forEach((d, i) => {
    const frac = d.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${palette[i % palette.length]}"><title>${esc(d.label)}: ${fmtValue(d.value)}</title></path>`;
    a0 = a1;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${fmtValue(total)}</text>`;
  out += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${AXIS}">total</text>`;
  out += '</svg>';
  return out;
}

// Plain data table from rows, with a caption for screen readers.
export function dataTable(headers, rows, caption) {
  const th = headers.map((h) => `<th scope="col">${esc(h)}</th>`).join('');
  const tr = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  return `<table><caption>${esc(caption)}</caption><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}
