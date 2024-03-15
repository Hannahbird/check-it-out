import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import CartItem from './cartItem';
import { Grid, Container, Button, Typography, Divider } from '@mui/material';

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
      <Header title="Your Cart" buttonText="Continue Shopping" buttonAction={() => navigate('/all-items')} />
      <Container>
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" style={{ marginTop: '16px', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>Order Summary</Typography>
        {cartItems.map((item) => (
          <Grid container key={item.id} justifyContent="space-between" style={{ marginBottom: '8px' }}>
            <Typography>{item.store_item.name}</Typography>
            <Typography>${(item.store_item.price * item.quantity).toFixed(2)}</Typography>
          </Grid>
        ))}
        <Divider style={{ margin: '8px 0' }} />
        <Grid container justifyContent="space-between" fontWeight="bold">
          <Typography>Total Cost:</Typography>
          <Typography>${calculateTotalCost().toFixed(2)}</Typography>
        </Grid>
      </Container>

      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button onClick={handleUpdateCart} variant="contained" style={{ marginRight: '8px', background: '#4caf50', color: '#fff', borderRadius: '4px' }}>Update Cart</Button>
        <Button onClick={handleEmptyCart} variant="contained" style={{ background: '#f50057', color: '#fff', borderRadius: '4px' }}>Empty Cart</Button>
      </Container>
      <Divider style={{ margin: '8px 0' }} />

      <Footer />
    </div>
  );
}

export default Cart;
