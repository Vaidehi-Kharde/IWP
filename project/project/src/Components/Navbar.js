import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';
import { Badge } from 'react-bootstrap';

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const userName = localStorage.getItem("userName"); // Retrieve user's name from local storage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName"); // Clear user's name on logout
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={styles.navbar}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/" style={styles.navbarBrand}>Travellers Destination</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              <li>
                <Link className="nav-link active fs-5" aria-current="page" to="/about">About us</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {localStorage.getItem("authToken") ? (
                <>
                  <span className="text-white mx-2">Hello, {localStorage.getItem("userName") || 'User'}!</span>
                  <button 
                    className="btn mx-2" 
                    style={styles.cartButton}
                    onClick={() => setCartView(true)}>
                    My Cart <Badge pill bg="light" style={styles.cartBadge}>{data.length}</Badge>
                  </button>
                  {cartView && (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  )}
                  <button 
                    className="btn mx-2" 
                    style={styles.logoutButton}
                    onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-success mx-1" to="/login">Login</Link>
                  <Link className="btn btn-outline-success mx-1" to="/createuser">Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    padding: '10px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navbarBrand: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#003366',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
  },
  cartBadge: {
    backgroundColor: '#ffcc00',
    color: '#003366',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
  },
};
