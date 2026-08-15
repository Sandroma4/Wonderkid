import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearLeaderboard() {
  const { data, error } = await supabase.from('leaderboard').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
    console.error('Error clearing leaderboard:', error);
  } else {
    console.log('Leaderboard cleared successfully:', data);
  }
}

clearLeaderboard();
