import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <SiteHeader />
      <main className="layout-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
