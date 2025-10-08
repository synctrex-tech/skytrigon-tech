import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiMail, FiShield } from 'react-icons/fi';
import ActionButton from '../components/ui/ActionButton.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const modes = {
  signIn: 'signIn',
  signUp: 'signUp'
};

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } = useAuth();
  const [mode, setMode] = useState(modes.signIn);
  const [formState, setFormState] = useState({ email: '', password: '', fullName: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const redirectPath = location.state?.from?.pathname ?? '/profile';

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  const pageHeading = useMemo(() => {
    if (mode === modes.signIn) {
      return {
        eyebrow: 'Welcome back',
        title: 'Access your Skytrigon account',
        description: 'Sign in to manage your workspace, track insights, and collaborate with your team.'
      };
    }
    return {
      eyebrow: 'Get started',
      title: 'Create your Skytrigon account',
      description: 'Unlock personalized dashboards, smart automation, and connected experiences.'
    };
  }, [mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      if (mode === modes.signIn) {
        await signInWithEmail(formState.email, formState.password);
      } else {
        await signUpWithEmail({
          email: formState.email,
          password: formState.password,
          fullName: formState.fullName
        });
      }
      setStatus({ type: 'success', message: 'Authentication successful. Redirecting…' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message ?? 'Unable to authenticate. Please try again.' });
    }
  };

  const handleGoogleAuth = async () => {
    setStatus({ type: 'loading', message: '' });
    try {
      await signInWithGoogle();
      setStatus({ type: 'success', message: 'Redirecting…' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message ?? 'Unable to sign in with Google.' });
    }
  };

  return (
    <div className="auth-view">
      <SectionHeading
        align="center"
        eyebrow={pageHeading.eyebrow}
        title={pageHeading.title}
        description={pageHeading.description}
      />

      <div className="auth-card">
        <div className="auth-toggle">
          <button type="button" className={mode === modes.signIn ? 'auth-toggle-active' : ''} onClick={() => setMode(modes.signIn)}>
            <FiLogIn aria-hidden /> Sign in
          </button>
          <button type="button" className={mode === modes.signUp ? 'auth-toggle-active' : ''} onClick={() => setMode(modes.signUp)}>
            <FiUserPlus aria-hidden /> Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleEmailAuth}>
          {mode === modes.signUp ? (
            <>
              <label htmlFor="auth-fullName">Full name</label>
              <input
                id="auth-fullName"
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
                placeholder="Jordan Parker"
                required
              />
            </>
          ) : null}

          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            required
          />

          <ActionButton type="submit" variant="primary" size="lg" leftIcon={<FiMail aria-hidden />}>
            {mode === modes.signIn ? 'Sign in with email' : 'Create account'}
          </ActionButton>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <ActionButton variant="outline" size="lg" onClick={handleGoogleAuth} leftIcon={<FiShield aria-hidden />}>
          Continue with Google
        </ActionButton>

        {status.type === 'error' ? <p role="alert" className="auth-error">{status.message}</p> : null}
        {status.type === 'success' ? <p className="auth-success">{status.message}</p> : null}
        {status.type === 'loading' ? <p className="auth-loading">Completing request…</p> : null}

        {profile?.role === 'admin' ? (
          <p className="auth-admin-notice">You are signed in with admin privileges.</p>
        ) : null}

        {user ? (
          <ActionButton variant="ghost" onClick={signOut}>
            Sign out
          </ActionButton>
        ) : null}
      </div>
    </div>
  );
}
