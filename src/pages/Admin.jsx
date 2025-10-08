import { useMemo, useState } from 'react';
import { FiCheckSquare, FiToggleLeft, FiToggleRight, FiEdit3 } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ActionButton from '../components/ui/ActionButton.jsx';
import products from '../data/products.js';
import {
  servicesCatalog,
  solutionPillars,
  innovationTimeline
} from '../data/homeContent.js';
import { useAuth } from '../context/AuthContext.jsx';

const managedSections = ['Hero', 'Solution pillars', 'Services', 'Customer stories', 'Innovation timeline', 'Partners'];

export default function Admin() {
  const { profile } = useAuth();
  const [sectionStates, setSectionStates] = useState(() =>
    managedSections.reduce((accumulator, section) => ({ ...accumulator, [section]: true }), {})
  );
  const [featuredProducts, setFeaturedProducts] = useState(() => products.slice(0, 3).map((product) => product.id));

  const homeOverview = useMemo(
    () => [
      { label: 'Solution pillars', count: solutionPillars.length },
      { label: 'Services catalog', count: servicesCatalog.length },
      { label: 'Timeline milestones', count: innovationTimeline.length }
    ],
    []
  );

  const toggleSection = (section) => {
    setSectionStates((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFeatured = (productId) => {
    setFeaturedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="admin-view">
      <SectionHeading
        eyebrow="Admin hub"
        title="Manage your digital front door"
        description="Activate sections, curate featured solutions, and orchestrate the narrative your audience sees."
      />

      <div className="admin-grid">
        <section className="admin-card" aria-labelledby="admin-sections-heading">
          <h3 id="admin-sections-heading">Homepage sections</h3>
          <ul className="admin-toggle-list">
            {managedSections.map((section) => {
              const isActive = sectionStates[section];
              return (
                <li key={section}>
                  <div>
                    <strong>{section}</strong>
                    <span>{isActive ? 'Visible' : 'Hidden'}</span>
                  </div>
                  <button type="button" onClick={() => toggleSection(section)} aria-label={`Toggle ${section}`} className="admin-toggle-button">
                    {isActive ? <FiToggleRight aria-hidden /> : <FiToggleLeft aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="admin-card" aria-labelledby="admin-featured-heading">
          <h3 id="admin-featured-heading">Featured products</h3>
          <ul className="admin-featured-list">
            {products.map((product) => {
              const isFeatured = featuredProducts.includes(product.id);
              return (
                <li key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                  </div>
                  <button
                    type="button"
                    className={isFeatured ? 'admin-featured-active' : ''}
                    onClick={() => toggleFeatured(product.id)}
                  >
                    <FiCheckSquare aria-hidden />
                    {isFeatured ? 'Featured' : 'Mark featured'}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="admin-card" aria-labelledby="admin-quick-actions-heading">
          <h3 id="admin-quick-actions-heading">Quick actions</h3>
          <div className="admin-actions">
            <ActionButton variant="outline" leftIcon={<FiEdit3 aria-hidden />}>Edit contact spotlight</ActionButton>
            <ActionButton variant="outline">Schedule content review</ActionButton>
            <ActionButton variant="primary">Publish updates</ActionButton>
          </div>
          <div className="admin-summary">
            <dl>
              {homeOverview.map((entry) => (
                <div key={entry.label}>
                  <dt>{entry.label}</dt>
                  <dd>{entry.count}</dd>
                </div>
              ))}
            </dl>
            <p className="admin-note">
              Signed in as {profile?.full_name || 'Admin'}. You can adjust visibility before publishing live updates.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
