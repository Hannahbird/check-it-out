import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';
import Footer from './footer';
import Header from './header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function AllItems() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const response = await axios.get('http://localhost:5000/store_items');
        setAllItems(response.data);
      } catch (error) {
        console.error('Error fetching all items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllItems();
  }, []);

  const addToCart = async (itemId) => {
    try {
      const response = await fetch('http://localhost:5000/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });

      if (response.ok) {
        const updatedCartItem = await response.json();
        console.log('Item added to the cart successfully:', updatedCartItem);
        // Update the UI or state with the updated cart item if needed
      } else {
        console.error('Failed to add item to the cart:', response.statusText);
        // Handle error accordingly
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error accordingly
    }
  };

  return (
    <div>
      <Header title="All Items" buttonText="Back to Home" buttonAction={() => navigate('/')} />

      <main>
        {loading ? (
          <Container maxWidth="md" style={{ marginTop: '20px', textAlign: 'center' }}>
            <CircularProgress />
          </Container>
        ) : (
          <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <div className="inventory">
              <section className="all-items-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {allItems.map((item) => (
                  <Card key={item.id} style={{ maxWidth: '300px', margin: 'auto' }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={item.image_path}
                      alt={item.name}
                    />
                    <div style={{ padding: '16px' }}>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>{item.name}</Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                          ${item.price}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => addToCart(item.id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </section>
            </div>
          </Container>
        )}
      </main>

      {/* Add a footer if needed */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AllItems;
