import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function MainLayout({ children }) {
  const content = children ?? <Outlet />;

  return (
    <div className="main-layout">
      <SiteHeader />
      <main className="layout-main">{content}</main>
      <SiteFooter />
    </div>
  );
}
