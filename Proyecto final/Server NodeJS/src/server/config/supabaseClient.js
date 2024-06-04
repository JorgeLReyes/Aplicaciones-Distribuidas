import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.JS_SUPABASE_URL;
const supabaseKey = process.env.JS_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.JS_SUPABASE_KEY_A
);
