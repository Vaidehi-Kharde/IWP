import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Carousel from '../Components/Carousel';
import Destination from './Destination';

export default function Home() {
  const [destination, setDestination] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:3001/api/displayData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setDestination(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div style={styles.navbarContainer}>
        <Navbar />
      </div>
      
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={styles.carouselContainer}>
        <div className="carousel-inner">
          <div className="carousel-caption d-flex justify-content-center" style={styles.searchBox}>
            <input 
              className="form-control" 
              type="search" 
              placeholder="Search destinations..." 
              aria-label="Search" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={styles.searchInput}
            />
          </div>
          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1697730373939-3ebcaa9d295e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={styles.carouselImage} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2luZ2Fwb3JlfGVufDB8fDB8fHww" className="d-block w-100" style={styles.carouselImage} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={styles.carouselImage} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-4" style={styles.flexContainer}>
        {destination.length !== 0 ? (
          destination
            .filter((item) => item.destination_name.toLowerCase().includes(search.toLowerCase()))
            .reduce((uniqueDestinations, data) => {
              if (!uniqueDestinations.some(dest => dest.destination_name === data.destination_name)) {
                uniqueDestinations.push(data);
              }
              return uniqueDestinations;
            }, [])
            .map((data) => (
              <div key={data._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card destinationName={data.destination_name} destinationURL={data.destination_image} />
              </div>
            ))
        ) : (
          <p className="text-center">No destinations found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  navbarContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
  },
  carouselContainer: {
    position: 'relative',
    height: '500px',
    overflow: 'hidden',
  },
  carouselImage: {
    filter: 'brightness(70%)',
    maxHeight: '500px',
    objectFit: 'cover',
  },
  searchBox: {
    zIndex: '10',
    width: '80%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  searchInput: {
    borderRadius: '8px',
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
};
