import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajcvsxddxjtwyhqhbyge.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqY3ZzeGRkeGp0d3locWhieWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTI5MTQsImV4cCI6MjA2ODUyODkxNH0.8uSRw-QrO8wg7Xbf_luEeh0VnUHdGlaswbo03Eua1kU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)