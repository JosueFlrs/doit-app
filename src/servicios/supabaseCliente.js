// Credenciales de Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpxtqqsmjautiieiodks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHRxcXNtamF1dGlpZWlvZGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTQxNzIsImV4cCI6MjA4ODY3MDE3Mn0.R6VTKdiuDVKcKbaRdfY_J_VO_u3riMT-c4LccZTOkBs';

export const supabase = createClient(supabaseUrl, supabaseKey);