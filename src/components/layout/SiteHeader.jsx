import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiUser, FiLogIn, FiLogOut, FiGrid } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import ActionButton from '../ui/ActionButton.jsx';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Store', to: '/store' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' }
];

function NavigationLink({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link-item${isActive ? ' nav-link-active' : ''}`
      }
      onClick={onNavigate}
      end={to === '/'}
    >
      {label}
    </NavLink>
  );
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { totals } = useCart();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-link" aria-label="Skytrigon Tech Home">
          <FiGrid aria-hidden />
          <span>Skytrigon Tech</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
        </button>
        <nav className={`primary-nav${isMenuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.to} className="nav-list-item">
                <NavigationLink to={item.to} label={item.label} onNavigate={() => setIsMenuOpen(false)} />
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <Link to="/cart" className="cart-link" aria-label="View cart">
              <FiShoppingBag aria-hidden />
              {totals.count > 0 && <span className="cart-count">{totals.count}</span>}
            </Link>
            {user ? (
              <div className="auth-controls">
                <Link to="/profile" className="profile-link">
                  <FiUser aria-hidden />
                  <span className="profile-name">{profile?.full_name || 'Account'}</span>
                </Link>
                {profile?.role === 'admin' && (
                  <Link to="/admin" className="admin-link">
                    Admin
                  </Link>
                )}
                <ActionButton variant="ghost" size="sm" onClick={handleSignOut} leftIcon={<FiLogOut aria-hidden />}>
                  Sign out
                </ActionButton>
              </div>
            ) : (
              <ActionButton
                as={Link}
                to="/auth"
                variant="primary"
                size="sm"
                leftIcon={<FiLogIn aria-hidden />}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </ActionButton>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
