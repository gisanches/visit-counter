import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  const ua = req.headers['user-agent'] || '';
  if (/bot|crawler|spider|crawling/i.test(ua)) {
    return res.status(200).send('');
  }

  const { data, error } = await supabase
    .from('visits')
    .update({ count: 1 })
    .eq('id', 1)
    .increment('count', 1)
    .select();

  if (error) {
    return res.status(500).json({ error });
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="130" height="28">
    <rect width="130" height="28" fill="#2d2d2d" rx="6"/>
    <text x="16" y="18" fill="#fff" font-size="13" font-family="Verdana">Visits: ${data[0].count}</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  return res.status(200).send(svg.trim());
}