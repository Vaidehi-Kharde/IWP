import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'; 
import { currDestination } from '../Components/Card'; 
import { useDispatchCart, useCart } from '../Components/ContextReducer';
import Navbar from '../Components/Navbar';
import { Button, Modal, Card, Row, Col, Spinner } from 'react-bootstrap';

const Destination = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [destinationName, setDestinationName] = useState(currDestination || localStorage.getItem('currDestination') || '');

  const dispatch = useDispatchCart();
  const cart = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Save destination name to localStorage if not already there
    if (currDestination) {
      localStorage.setItem('currDestination', currDestination);
      setDestinationName(currDestination);
    }
  }, [currDestination]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/displayData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setPackages(data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = async (pkg) => {
    console.log ("adding to cart");
    const destination = {
      id: pkg._id,
      name: pkg.destination_name,
      url: pkg.destination_image,
      price: pkg.price,
      days: pkg.days,
    };
  
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User email not found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/cartData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: [destination], // Ensuring order_data is an array
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
  
      console.log("Cart Response:", response);
  
      if (response.status === 200) {
        const cartItemIds = new Set(cart.map((item) => item.id));
  
        if (!cartItemIds.has(destination.id)) {
          dispatch({ type: "ADD_TO_CART", destination });
          alert(`${destination.name} added to cart!`);
        } else {
          console.log(`${destination.name} is already in the cart!`);
        }
      } else {
        console.error("Failed to add to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
    }
  };
  
  const openModalWithPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setShowModal(false);
  };

  const matchingPackages = packages.filter(pkg => pkg.destination_name === destinationName);

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <Button variant="link" style={styles.backButton} onClick={() => navigate('/')}>
        <BiArrowBack size={24} /> Back to Home
      </Button>

      <h1 style={styles.heading}>{destinationName || "Destination not found"}</h1>

      {destinationName && (
        <>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : matchingPackages.length > 0 ? (
            <>
              <h2 style={styles.subheading}>Available Packages:</h2>

              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {matchingPackages.map(pkg => (
                  <Col key={pkg._id}>
                    <Card style={styles.packageCard} onClick={() => openModalWithPackage(pkg)}>
                      <Card.Img variant="top" src={pkg.destination_image} alt={pkg.destination_name} style={styles.image} />
                      <Card.Body>
                        <Card.Title>{pkg.destination_name}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong> ₹{pkg.price}<br />
                          <strong>Duration:</strong> {pkg.days} days
                        </Card.Text>
                        <Button 
                          variant="primary" 
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(pkg); }}
                          style={styles.addToCartButton}
                        >
                          Add To Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p style={styles.noPackageMessage}>No packages available for this destination.</p>
          )}
        </>
      )}

      {/* Modal for showing package details */}
      {selectedPackage && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPackage.destination_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedPackage.destination_image} alt="Package" style={{ width: '100%', marginBottom: '15px' }} />
            <p><strong>Price:</strong> ₹{selectedPackage.price}</p>
            <p><strong>Duration:</strong> {selectedPackage.days} days</p>
            <p>{selectedPackage.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
            <Button variant="primary" onClick={() => { handleAddToCart(selectedPackage); closeModal(); }}>Add to Cart</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Additional Options */}
      <div style={styles.additionalOptions}>
        <h3 style={styles.optionHeading}>Customize Your Trip:</h3>
        <p style={styles.optionText}>Pick your preferred start and end dates:</p>
      </div>
    </div>
  );
};

export default Destination;

const styles = {
  container: {
    padding: '20px',
  },
  backButton: {
    color: '#56',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  },
  subheading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: '20px',
    marginBottom: '20px',
  },
  packageCard: {
    cursor: 'pointer',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  image: {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  addToCartButton: {
    marginTop: '10px',
  },
  noPackageMessage: {
    textAlign: 'center',
    color: "#999",
    fontSize: "18px",
  },
  additionalOptions: {
    marginTop: '30px',
  },
  optionHeading: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  optionText: {
    fontSize: "16px",
    color: "#555",
  },
};
