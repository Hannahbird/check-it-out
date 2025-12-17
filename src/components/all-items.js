import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardMedia, CircularProgress } from '@mui/material';
import axios from 'axios';
import Footer from './footer';
import Header from './header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getOptimizedCardUrl } from '../utils/cloudinaryUtils';
import { getApiEndpoint } from '../config/api';

function AllItems() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const response = await axios.get(getApiEndpoint('/store_items'));
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
      const response = await fetch(getApiEndpoint('/add-to-cart'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });

      if (response.ok) {
        const updatedCartItem = await response.json();
        console.log('Item added to the cart successfully:', updatedCartItem);
      } else {
        console.error('Failed to add item to the cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Header title="Discography" buttonText="Home" buttonAction={() => navigate('/')}>
      <main>
        {loading ? (
          <Container maxWidth="md" style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Container>
        ) : (
          <Container maxWidth="md">
            <div className="inventory">
              <section className="all-items-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {allItems.map((item) => (
                  <Card key={item.id} style={{ maxWidth: '300px', margin: 'auto' }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={getOptimizedCardUrl(item.image_path)}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div style={{ padding: '16px' }}>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>{item.name}</Typography>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>{item.artist}</Typography>
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
        <Footer />
      </main>
    </Header>
  );
}

export default AllItems;