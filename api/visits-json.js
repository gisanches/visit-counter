import { supabase } from '../lib/supabase.js'

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data, error } = await supabase
    .from('visits')
    .select('count')
    .eq('id', 1);

  return res.status(200).json({ data, error });
}