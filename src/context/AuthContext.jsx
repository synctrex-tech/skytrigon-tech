import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import supabase from '../services/supabaseClient.js';

const AuthContext = createContext(null);

async function upsertProfile(userId, payload) {
  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...payload, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        const defaultProfile = {
          full_name: authUser.user_metadata?.full_name ?? '',
          avatar_url: authUser.user_metadata?.avatar_url ?? '',
          role: 'user'
        };
        const upserted = await upsertProfile(authUser.id, defaultProfile);
        setProfile(upserted);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error loading profile', err);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadProfile(user);
  }, [user, loadProfile]);

  const signInWithEmail = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    return data;
  }, []);

  const signUpWithEmail = useCallback(async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName ?? ''
        }
      }
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      await upsertProfile(data.user.id, {
        full_name: fullName ?? '',
        role: 'user'
      });
      await loadProfile(data.user);
    }

    return data;
  }, [loadProfile]);

  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      throw error;
    }

    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) {
      return null;
    }
    return loadProfile(user);
  }, [user, loadProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    const updated = await upsertProfile(user.id, updates);
    setProfile(updated);
    return updated;
  }, [user]);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      profileLoading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      updateProfile,
      refreshProfile
    }),
    [session, user, profile, loading, profileLoading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, updateProfile, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
