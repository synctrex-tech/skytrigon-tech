import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function makeNoopSubscription() {
  return { unsubscribe() {} };
}

function makeStubClient() {
  const auth = {
    async getSession() {
      return { data: { session: null } };
    },
    onAuthStateChange(callback) {
      // return an object shaped like supabase's subscription container
      const subscription = {
        unsubscribe() {}
      };
      // no-op; but keep signature
      return { data: { subscription } };
    },
    async signInWithPassword() {
      return { data: null, error: new Error('Supabase not configured') };
    },
    async signUp() {
      return { data: null, error: new Error('Supabase not configured') };
    },
    async signInWithOAuth() {
      return { data: null, error: new Error('Supabase not configured') };
    },
    async signOut() {
      return { error: null };
    }
  };

  function from() {
    // provide chainable query builder with safe defaults
    const chain = {
      upsert: async () => ({ data: null, error: null }),
      select: () => chain,
      eq: () => chain,
      single: async () => ({ data: null, error: { code: 'PGRST116' } })
    };
    return chain;
  }

  return { auth, from };
}

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not configured. The app will run in local mode with a stubbed Supabase client. To enable full features connect a Supabase project and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  supabase = makeStubClient();
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: 'skytrigon_auth_session'
    }
  });
}

export default supabase;
