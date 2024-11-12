import './App.css';
import Home from './Screens/Home';
import React from "react";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './Screens/Signup.js';
import Login from './Screens/Login.js';
import Destination from './Screens/Destination.js';
import { CartProvider } from './Components/ContextReducer.js';
import Cart from './Screens/Cart.js';
import MyOrder from './Screens/MyOrder.js';
import About from './Screens/About.js';

function App() {
  return (
  <CartProvider>
    <Router>
      {/* actually BrowserRouter */}
      <div className="App">
            <Routes>
              <Route>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/createuser" element={<Signup />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/destination" element={<Destination/>} />
              <Route exact path="/myOrder" element={<MyOrder/>} />
              <Route path="/destination/:destinationName" component={Destination} />
              <Route exact path="/about" element={<About></About>}></Route>
              </Route>
            </Routes>
      </div>
    </Router>
  </CartProvider>
    
  );
}

export default App;
