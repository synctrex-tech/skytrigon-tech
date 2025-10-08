import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Store from './pages/Store.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Auth from './pages/Auth.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:productId" element={<ProductDetails />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="auth" element={<Auth />} />
        <Route path="cart" element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute requireAdmin />}> 
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
