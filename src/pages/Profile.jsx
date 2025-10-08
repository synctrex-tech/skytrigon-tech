import { useEffect, useState } from 'react';
import { FiSave, FiUser, FiBriefcase, FiMapPin } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ActionButton from '../components/ui/ActionButton.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, profile, profileLoading, updateProfile, refreshProfile } = useAuth();
  const [formState, setFormState] = useState({ full_name: '', company: '', title: '', location: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    if (profile) {
      setFormState({
        full_name: profile.full_name ?? '',
        company: profile.company ?? '',
        title: profile.title ?? '',
        location: profile.location ?? ''
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: '' });
    try {
      await updateProfile({ ...formState, updated_at: new Date().toISOString() });
      setStatus({ type: 'success', message: 'Profile updated successfully.' });
      await refreshProfile();
    } catch (error) {
      setStatus({ type: 'error', message: error.message ?? 'Failed to update profile.' });
    }
  };

  if (!user) {
    return (
      <div className="profile-view">
        <SectionHeading
          align="center"
          eyebrow="Profile"
          title="Please sign in"
          description="You must be signed in to view and edit your profile."
        />
      </div>
    );
  }

  return (
    <div className="profile-view">
      <SectionHeading
        eyebrow="Profile"
        title="Your Skytrigon identity"
        description="Keep your workspace details up to date so collaborators can connect quickly."
      />

      {profileLoading ? (
        <div className="profile-loading">
          <LoadingSpinner label="Loading profile" />
        </div>
      ) : (
        <div className="profile-card">
          <div className="profile-summary">
            <div className="profile-avatar" aria-hidden>
              <FiUser />
            </div>
            <div>
              <h3>{profile?.full_name || user.email}</h3>
              <p>{profile?.role ? profile.role.toUpperCase() : 'Member'}</p>
              <span className="profile-email">{user.email}</span>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <label htmlFor="profile-full-name">Full name</label>
            <input
              id="profile-full-name"
              name="full_name"
              value={formState.full_name}
              onChange={handleChange}
              required
            />

            <label htmlFor="profile-title">Title</label>
            <div className="profile-input-with-icon">
              <FiBriefcase aria-hidden />
              <input
                id="profile-title"
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Head of Product"
              />
            </div>

            <label htmlFor="profile-company">Company</label>
            <input
              id="profile-company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              placeholder="Skytrigon Partners"
            />

            <label htmlFor="profile-location">Location</label>
            <div className="profile-input-with-icon">
              <FiMapPin aria-hidden />
              <input
                id="profile-location"
                name="location"
                value={formState.location}
                onChange={handleChange}
                placeholder="San Francisco, CA"
              />
            </div>

            <ActionButton type="submit" variant="primary" leftIcon={<FiSave aria-hidden />}>Save profile</ActionButton>
          </form>

          {status.type === 'error' ? <p className="profile-status-error">{status.message}</p> : null}
          {status.type === 'success' ? <p className="profile-status-success">{status.message}</p> : null}
          {status.type === 'loading' ? <p className="profile-status-loading">Updating profile…</p> : null}
        </div>
      )}
    </div>
  );
}
