import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiAward, FiCheckCircle, FiImage } from 'react-icons/fi';
import products from '../data/products.js';
import ActionButton from '../components/ui/ActionButton.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = useMemo(() => products.find((item) => item.id === productId), [productId]);

  if (!product) {
    return (
      <div className="product-details-view">
        <div className="product-not-found">
          <SectionHeading
            align="center"
            eyebrow="Unavailable"
            title="We could not find that solution"
            description="It may have been moved or archived. Explore the store to discover other offerings."
          />
          <ActionButton variant="primary" onClick={() => navigate('/store')}>
            Back to store
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-view">
      <div className="product-details-header">
        <ActionButton variant="ghost" onClick={() => navigate(-1)} leftIcon={<FiArrowLeft aria-hidden />}>
          Back
        </ActionButton>
        <div className="product-summary">
          <SectionHeading
            eyebrow={product.category}
            title={product.name}
            description={product.description}
          />
          <div className="product-meta">
            <div className="product-price-display">${product.price.toLocaleString()}</div>
            <div className="product-badges">
              {product.badges.map((badge) => (
                <span key={badge} className="product-badge">
                  <FiAward aria-hidden />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ActionButton variant="primary" size="lg" onClick={() => addItem(product, 1)}>
          Add to cart
        </ActionButton>
      </div>

      <div className="product-details-content">
        <section aria-labelledby="product-highlights-heading" className="product-section">
          <h3 id="product-highlights-heading">Highlights</h3>
          <ul className="product-detail-list">
            {product.highlights.map((highlight) => (
              <li key={highlight}>
                <FiCheckCircle aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="product-specs-heading" className="product-section">
          <h3 id="product-specs-heading">Specifications</h3>
          <dl className="product-specs-grid">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="product-spec-item">
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="product-gallery-heading" className="product-section">
          <h3 id="product-gallery-heading">Experience snapshots</h3>
          <div className="product-image-grid">
            {product.images.map((image) => (
              <div key={image} className="product-image-card">
                <FiImage aria-hidden />
                <span>{image.split('/').pop()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
