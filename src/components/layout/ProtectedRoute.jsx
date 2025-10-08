import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';

export default function ProtectedRoute({ requireAdmin = false, redirectTo = '/auth' }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="route-loading">
        <LoadingSpinner label="Verifying access" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
