import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajcvsxddxjtwyhqhbyge.supabase.co'
const supabaseAnonKey = 'ajcvsxddxjtwyhqhbyge'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)