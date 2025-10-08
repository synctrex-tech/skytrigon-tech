import { Link } from 'react-router-dom';
import { FiMinusCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ActionButton from '../components/ui/ActionButton.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totals } = useCart();

  return (
    <div className="cart-view">
      <SectionHeading
        align="center"
        eyebrow="Cart"
        title="Your selected solutions"
        description="Confirm modules for your next release wave. Add more products from the store or proceed to consultation."
      />

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <ActionButton as={Link} to="/store" variant="primary">
            Browse products
          </ActionButton>
        </div>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="cart-item">
                <div className="cart-item-overview">
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                  <span className="cart-item-category">{product.category}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-quantity">
                    <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease quantity">
                      <FiMinusCircle aria-hidden />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity">
                      <FiPlusCircle aria-hidden />
                    </button>
                  </div>
                  <div className="cart-item-price">
                    ${(product.price * quantity).toLocaleString()}
                  </div>
                  <button type="button" className="cart-remove" onClick={() => removeItem(product.id)} aria-label="Remove item">
                    <FiTrash2 aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{totals.count}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>${totals.total.toLocaleString()}</dd>
              </div>
            </dl>
            <p>We will tailor a deployment roadmap during your strategy session.</p>
            <div className="cart-summary-actions">
              <ActionButton variant="outline" onClick={clearCart}>
                Clear cart
              </ActionButton>
              <ActionButton as={Link} to="/contact" variant="primary">
                Book consultation
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
