import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import CartItem from './cartItem';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cartUpdateStatus, setCartUpdateStatus] = useState('idle');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        console.log('Response from /cart:', response.data); 
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cartUpdateStatus]);

  const handleUpdateCart = async () => {
    setCartUpdateStatus((prevStatus) => (prevStatus === 'idle' ? 'updating' : 'idle'));
  };

  const handleEmptyCart = async () => {
    try {
      await axios.delete('http://localhost:5000/clear-cart');
      setCartItems([]); 
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return <p>Error loading cart items</p>;
  }

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.store_item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header title="Your Cart" buttonText="Back to Home" buttonAction={() => navigate('/')} />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', width: '60%', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '16px' }}>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>{item.store_item.name}</span>
            <span>${(item.store_item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr style={{ margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total Cost:</span>
          <span>${calculateTotalCost().toFixed(2)}</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px', padding: '8px 16px' }}>
      <button
          onClick={handleUpdateCart}
          style={{
            marginTop: '16px',
            marginRight: '8px',
            padding: '8px 16px',
            background: '#4caf50', 
            color: '#fff', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Update Cart
        </button>
      <button
        onClick={handleEmptyCart}
        style={{
          marginTop: '16px',
          padding: '8px 16px',
          background: '#f50057', 
          color: '#fff', 
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Empty Cart
      </button>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
