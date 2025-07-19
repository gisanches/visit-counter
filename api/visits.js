import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || ''

  if (/github|bot/i.test(userAgent)) {
    return res.status(200).end()
  }

  const { data, error } = await supabase
    .from('visits')
    .select('count')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Erro ao ler visitas:', error)
    return res.status(500).send('Erro ao ler visitas')
  }

  const newCount = (data?.count || 0) + 1

  const { error: updateError } = await supabase
    .from('visits')
    .update({ count: newCount })
    .eq('id', 1)

  if (updateError) {
    console.error('Erro ao atualizar visitas:', updateError)
    return res.status(500).send('Erro ao atualizar visitas')
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="28" role="img" aria-label="Visits: ${newCount}">
  <linearGradient id="g" x2="0" y2="100%">
    <stop offset="0" stop-color="#8a63d2" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <rect rx="3" width="150" height="28" fill="#555"/>
  <rect rx="3" x="70" width="80" height="28" fill="#8a63d2"/>
  <text x="10" y="18" fill="#fff" font-family="Verdana" font-size="11">Visits</text>
  <text x="80" y="18" fill="#fff" font-family="Verdana" font-size="11">${newCount}</text>
</svg>
  `

  res.setHeader('Content-Type', 'image/svg+xml')
  res.status(200).send(svg.trim())
}