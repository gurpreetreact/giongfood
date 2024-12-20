import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'; 
import Modal from 'react-bootstrap/Modal';  // React-Bootstrap Modal

import Cart from '../screens/Carting';
import { useCart } from './ContextReducer';



function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
let data = useCart();



  const handleLogout = () => {
    // Remove the auth token
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myOrder">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
            </div>
          ) : (
            <div className="d-flex">
              <button
                className="btn bg-white text-success mx-2"
                onClick={() => { setCartView(true); }}
              >
                My Cart <Badge pill bg="danger">{data.length}</Badge>
              </button>

              {/* React Bootstrap Modal */}
              <Modal
                show={cartView}
                onHide={() => { setCartView(false); }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Cart />
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn bg-danger text-white" onClick={() => { setCartView(false); }}>Close</button>
                </Modal.Footer>
              </Modal>

              <button
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
