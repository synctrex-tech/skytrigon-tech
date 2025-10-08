import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiShoppingCart, FiTag } from 'react-icons/fi';
import products from '../data/products.js';
import ActionButton from '../components/ui/ActionButton.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Store() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesQuery = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  return (
    <div className="store-view">
      <SectionHeading
        align="center"
        eyebrow="Product showcase"
        title="Build your stack with Skytrigon modules"
        description="Explore composable solutions tailored for product, operations, and growth teams."
      />

      <div className="store-toolbar" aria-label="Product filters">
        <div className="category-filter">
          <FiFilter aria-hidden />
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} aria-label="Filter by category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="search-filter">
          <input
            type="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-card-header">
              <span className="product-category">
                <FiTag aria-hidden />
                {product.category}
              </span>
              <h3>{product.name}</h3>
              <p>{product.shortDescription}</p>
            </div>
            <div className="product-card-body">
              <ul className="product-highlights">
                {product.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="product-price">${product.price.toLocaleString()}</div>
            </div>
            <div className="product-card-actions">
              <ActionButton
                variant="outline"
                onClick={() => navigate(`/store/${product.id}`)}
              >
                View details
              </ActionButton>
              <ActionButton
                variant="primary"
                leftIcon={<FiShoppingCart aria-hidden />}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </ActionButton>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
