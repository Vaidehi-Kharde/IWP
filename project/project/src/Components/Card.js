import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatchCart, useCart } from '../Components/ContextReducer';

// Declare the global variable
export let currDestination = '';

export default function Card(props) {
  const handleClick = () => {
    currDestination = props.destinationName; // Set the global variable
  };

  return (
    <Link 
      to="/destination" 
      onClick={handleClick} // Call handleClick when the link is clicked
      style={styles.linkWrapper}
    >
      <div style={styles.card}>
        <h2 style={styles.title}>{props.destinationName}</h2>
        <img 
          src={props.destinationURL} 
          alt={props.destinationName}
          style={styles.image}
        />
        <p style={styles.linkText}>Visit Website</p>
        
      </div>
    </Link>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff",
    margin: "10px",
  },
  cardHovered: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
  },
  title: {
    fontSize: "20px",
    margin: "0 0 12px",
    fontWeight: "600",
    color: "#333",
  },
  image: {
    height: "140px",
    width: "180px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "12px",
  },
  linkWrapper: {
    textDecoration: "none",
    color: "inherit",
  },
  linkText: {
    color: "#007BFF",
    marginTop: "12px",
    display: "inline-block",
    fontSize: "14px",
  },
  addToCartButton: {
    background: "#28a745", // Green background
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "12px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    cursor: "pointer",
  },
  addToCartButtonHovered: {
    backgroundColor: "#218838", // Darker green on hover
    transform: "scale(1.05)"
  }
};
