import React, {useState } from 'react'
// import Card from '../Components/Card';

export default function Carousel() {
  // const [destination, setDestination] = useState([])
  const [search, setSearch] = useState('');
  return (
    <div>
      <div >
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
            <div className="carousel-inner">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                  {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img src="https://plus.unsplash.com/premium_photo-1697730373939-3ebcaa9d295e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%", maxHeight: "500px" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2luZ2Fwb3JlfGVufDB8fDB8fHww" className="d-block w-100" style={{ filter: "brightness(30%", maxHeight: "500px" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%", maxHeight: "500px" }} alt="..." />
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
        </div>
      </div>
    </div>
  )
}
