import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_KEY = 'skytrigon_auth_session';
const STUB_SESSION_KEY = 'skytrigon_stub_session';
const STUB_USERS_KEY = 'skytrigon_stub_users';
const STUB_PROFILES_KEY = 'skytrigon_stub_profiles';

function safeParse(value, fallback) {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Failed to parse stored value', error);
    return fallback;
  }
}

function persistValue(key, value) {
  if (typeof window === 'undefined') {
    return;
  }
  if (value === undefined) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function ensureLocalLists() {
  if (typeof window === 'undefined') {
    return { users: [], profiles: [] };
  }
  const users = safeParse(window.localStorage.getItem(STUB_USERS_KEY), []);
  const profiles = safeParse(window.localStorage.getItem(STUB_PROFILES_KEY), []);
  return { users, profiles };
}

function writeLocalLists(users, profiles) {
  persistValue(STUB_USERS_KEY, users);
  persistValue(STUB_PROFILES_KEY, profiles);
}

function createStubId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
}

function createSession(user) {
  if (!user) {
    return null;
  }
  return {
    user,
    expires_in: 3600,
    token_type: 'stub'
  };
}

function createStubAuth() {
  let { users, profiles } = ensureLocalLists();
  let currentSession = null;
  const listeners = new Set();

  if (typeof window !== 'undefined') {
    const storedSession = safeParse(window.localStorage.getItem(STUB_SESSION_KEY), null);
    if (storedSession?.user) {
      currentSession = createSession(storedSession.user);
    }
  }

  function broadcast(event, session) {
    listeners.forEach((listener) => listener(event, session ?? null));
  }

  function setSession(nextSession) {
    currentSession = nextSession;
    if (typeof window !== 'undefined') {
      persistValue(STUB_SESSION_KEY, nextSession);
    }
    broadcast(nextSession ? 'SIGNED_IN' : 'SIGNED_OUT', nextSession);
  }

  async function signInWithPassword({ email, password }) {
    const user = users.find((entry) => entry.email === email && entry.password === password);
    if (!user) {
      return { data: null, error: new Error('Invalid email or password') };
    }
    const session = createSession(user);
    setSession(session);
    return { data: { user }, error: null };
  }

  async function signUp({ email, password, options }) {
    if (users.some((entry) => entry.email === email)) {
      return { data: null, error: new Error('Email already registered') };
    }
    const fullName = options?.data?.full_name ?? '';
    const newUser = {
      id: createStubId('user'),
      email,
      password,
      user_metadata: { full_name: fullName, avatar_url: '' }
    };
    users = [...users, newUser];
    profiles = [...profiles, { id: newUser.id, full_name: fullName, avatar_url: '', role: 'user', updated_at: new Date().toISOString() }];
    writeLocalLists(users, profiles);
    const session = createSession(newUser);
    setSession(session);
    return { data: { user: newUser }, error: null };
  }

  async function signInWithOAuth({ provider }) {
    const providerEmail = `${provider}_user@skytrigon.local`;
    let user = users.find((entry) => entry.email === providerEmail);
    if (!user) {
      user = {
        id: createStubId(provider),
        email: providerEmail,
        password: null,
        user_metadata: { full_name: `${provider.charAt(0).toUpperCase()}${provider.slice(1)} User`, avatar_url: '' }
      };
      users = [...users, user];
      profiles = [...profiles, { id: user.id, full_name: user.user_metadata.full_name, avatar_url: '', role: 'user', updated_at: new Date().toISOString() }];
      writeLocalLists(users, profiles);
    }
    const session = createSession(user);
    setSession(session);
    return { data: { user }, error: null };
  }

  async function signOut() {
    setSession(null);
    return { error: null };
  }

  function onAuthStateChange(callback) {
    listeners.add(callback);
    if (currentSession) {
      callback('SIGNED_IN', currentSession);
    } else {
      callback('SIGNED_OUT', null);
    }
    return {
      data: {
        subscription: {
          unsubscribe() {
            listeners.delete(callback);
          }
        }
      }
    };
  }

  async function getSession() {
    return { data: { session: currentSession } };
  }

  return {
    getSession,
    onAuthStateChange,
    signInWithPassword,
    signUp,
    signInWithOAuth,
    signOut,
    __isStub: true
  };
}

function createStubQueryClient() {
  let { profiles } = ensureLocalLists();

  function readTable(table) {
    if (table === 'profiles') {
      ({ profiles } = ensureLocalLists());
      return profiles;
    }
    return [];
  }

  function writeTable(table, rows) {
    if (table === 'profiles') {
      let { users } = ensureLocalLists();
      writeLocalLists(users, rows);
      profiles = rows;
    }
  }

  function from(table) {
    const builder = {
      _table: table,
      _filterColumn: null,
      _filterValue: null,
      _pendingRow: null,
      upsert(row) {
        const rows = readTable(table).slice();
        const index = row.id ? rows.findIndex((entry) => entry.id === row.id) : -1;
        const nextRow = index >= 0 ? { ...rows[index], ...row } : { ...row };
        if (index >= 0) {
          rows[index] = nextRow;
        } else {
          rows.push(nextRow);
        }
        writeTable(table, rows);
        builder._pendingRow = nextRow;
        return builder;
      },
      select() {
        return builder;
      },
      eq(column, value) {
        builder._filterColumn = column;
        builder._filterValue = value;
        return builder;
      },
      async single() {
        if (builder._pendingRow) {
          return { data: builder._pendingRow, error: null };
        }
        const rows = readTable(table);
        const match = builder._filterColumn
          ? rows.find((entry) => entry[builder._filterColumn] === builder._filterValue)
          : rows[0] ?? null;
        if (match) {
          return { data: match, error: null };
        }
        return { data: null, error: { code: 'PGRST116' } };
      }
    };
    return builder;
  }

  return { from };
}

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not configured. Running in local demo mode with an in-memory stub client.');
  const auth = createStubAuth();
  const queryClient = createStubQueryClient();
  supabase = { auth, from: queryClient.from, __isStub: true };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: SESSION_KEY
    }
  });
}

export default supabase;
