import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wwmmedqaoimkmoozeicg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bW1lZHFhb2lta21vb3plaWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNTc1OTQsImV4cCI6MjA5NDczMzU5NH0.KnH4l60s2IveXnsfb4pg7Qqr7JM9T90laX5JiRl4vYs";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
