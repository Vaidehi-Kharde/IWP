import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/createuser", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      navigate('/');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    
    <div>
      <div>
        <Navbar>
          
        </Navbar>
      </div>
      <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: 'linear-gradient(to right, #6A11CB, #2575FC)',
        width:"100%",
      }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Enter your address"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">Sign Up</button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary">Log in</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}