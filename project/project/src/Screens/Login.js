import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatchCart } from '../Components/ContextReducer'; 
import { useCart } from '../Components/ContextReducer'; 
import Navbar from '../Components/Navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatchCart(); 
  const data = useCart(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials, please try again.");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authtoken);
      localStorage.setItem("userName", json.name);
      console.log(localStorage.getItem("userName"));
      await fetchCartData(json.authtoken); // Await fetchCartData to complete
      navigate('/');
    }
  };

  const fetchCartData = async (token) => {
    const response = await fetch("http://localhost:3001/api/cart", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const cartData = await response.json();
      cartData.order_data.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    } else {
      console.error('Failed to fetch cart data');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center" style={styles.pageContainer}>
        <div className="card p-4 shadow-sm" style={styles.card}>
          <h2 className="text-center mb-4" style={styles.heading}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                value={credentials.email} 
                onChange={onChange} 
                placeholder="Enter your email" 
                required 
                style={styles.input}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                name="password" 
                value={credentials.password} 
                onChange={onChange} 
                placeholder="Enter your password" 
                required 
                style={styles.input}
              />
            </div>
            <div className="mb-3 form-check">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="showPassword" 
                checked={showPassword} 
                onChange={() => setShowPassword(!showPassword)} 
              />
              <label className="form-check-label" htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-2" style={styles.submitButton}>Login</button>
            <Link to="/createuser" className="btn btn-outline-secondary w-100 mt-3" style={styles.registerButton}>
              New User? Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    height: '100vh',
    background: 'linear-gradient(to right, #6A11CB, #2575FC)',
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
  input: {
    borderRadius: '6px',
  },
  submitButton: {
    backgroundColor: '#6A11CB',
    borderColor: '#6A11CB',
  },
  registerButton: {
    color: '#4A4A4A',
  },
};
