import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';
import Package from '../Components/Package'; // Import the Package component

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        The cart is Empty!
      </div>
    );
  }

  const handleRemove = (id) => {
    
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  const handleCheckout = async() => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3001/api/orderData",{
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:",response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
    // alert(Checkout successful! Total amount: ₹${updatedPrice});
  };

  return (
    <div style={styles.container}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <h2>Your Cart</h2>
        
        <div style={styles.cartList}>
          {data.map((item) => (
            <Package
              key={item.id}
              id={item.id}
              name={item.name}
              url={item.url}
              price={item.price}
              days={item.days}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Total Price Summary */}
        <div style={styles.summary}>
          Total: ₹{data.reduce((total, item) => total + item.price, 0)}
        </div>

       
        <button onClick={handleCheckout} style={styles.checkoutButton}>
        Checkout
      </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "400px", // Set a maximum height for the cart list
    overflowY: "auto",  // Enable vertical scrolling
    paddingRight: "10px", // Add padding for better spacing
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "10px",
  },
  removeButton: {
    padding: "8px 12px",
    color: "#fff",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  summary: {
    textAlign: "right",
    padding: "10px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
};