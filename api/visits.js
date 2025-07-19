import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('visits.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const ua = req.headers['user-agent'] || '';

  if (/bot|crawl|github/i.test(ua)) {
    return res.status(200).end();
  }

  data.count += 1;
  fs.writeFileSync(filePath, JSON.stringify(data));

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20" role="img" aria-label="Visits: ${data.count}">
    <linearGradient id="b" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="a">
      <rect width="150" height="20" rx="3" fill="#fff"/>
    </mask>
    <g mask="url(#a)">
      <rect width="70" height="20" fill="#555"/>
      <rect x="70" width="80" height="20" fill="#a26cc8"/>
      <rect width="150" height="20" fill="url(#b)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
      <text x="35" y="15" fill="#010101" fill-opacity=".3">Visits</text>
      <text x="35" y="14">Visits</text>
      <text x="110" y="15" fill="#010101" fill-opacity=".3">${data.count}</text>
      <text x="110" y="14">${data.count}</text>
    </g>
  </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg.trim());
}
