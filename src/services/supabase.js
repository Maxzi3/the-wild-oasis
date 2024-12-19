import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tdyektibffxlddobipit.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeWVrdGliZmZ4bGRkb2JpcGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTA1NjIsImV4cCI6MjA1MDE4NjU2Mn0.wg-nKtO9XbTri6ZfB5C3OskTvy7cVPbqB4VuVLYSay8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
