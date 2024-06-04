const { createClient } = require("@supabase/supabase-js");

// Configuración de Supabase
const supabaseUrl = "https://ugqlsbkfbcticrdkmgao.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseKeyAdmin = process.env.SUPABASE_KEY_A;

const supabaseAdmin = createClient(supabaseUrl, supabaseKeyAdmin);

module.exports = supabase;
module.exports = supabaseAdmin;
