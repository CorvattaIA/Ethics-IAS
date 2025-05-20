import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://sllwodcmvjtejwpnpsib.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbHdvZGNtdmp0ZWp3cG5wc2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTM3NDgsImV4cCI6MjA2Mjk4OTc0OH0.RokpLlIN_vtGWuQju8WmQiZJzZ5iZfZ4MiLigqOYmss';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);