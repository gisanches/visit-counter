import { supabase } from '../lib/supabase.js'

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data: current, error: getError } = await supabase
    .from('visits')
    .select('count')
    .eq('id', 1)
    .single();

  if (getError) {
    return res.status(500).json({ error: getError.message });
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    schemaVersion: 1,
    label: "visits",
    message: current.count.toString(),
    color: "8a63d2"
  });
}
