import { supabase } from '../lib/supabase.js'

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data, error } = await supabase
    .from('visits')
    .select('count')
    .eq('id', 1);

  if (error || !data || !data[0]) {
    return res.status(500).json({ 
      schemaVersion: 1,
      label: "visits",
      message: "error",
      color: "red"
    });
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    schemaVersion: 1,
    label: "visits",
    message: String(data[0].count),
    color: "8a63d2"
  });
}