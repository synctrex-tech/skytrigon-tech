import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', icon: <FiTwitter aria-hidden /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <FiLinkedin aria-hidden /> },
  { label: 'Facebook', href: 'https://facebook.com', icon: <FiFacebook aria-hidden /> },
  { label: 'Instagram', href: 'https://instagram.com', icon: <FiInstagram aria-hidden /> }
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Skytrigon Tech</span>
          <p className="footer-description">
            Innovative digital experiences crafted for modern businesses.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-nav">
              <li><Link to="/auth">Account</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-social">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Skytrigon Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}
