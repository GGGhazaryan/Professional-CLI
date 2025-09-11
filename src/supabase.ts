import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obygznlfiygtjebfzgdm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieWd6bmxmaXlndGplYmZ6Z2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDkzMTYsImV4cCI6MjA3MzAyNTMxNn0.wQ5a_gr76FNdwdOGep1VD-7rjNDPJl3OttjNCz9p2O0";

export const supabase = createClient(supabaseUrl, supabaseKey);
