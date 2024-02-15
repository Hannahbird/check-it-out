import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, Divider } from '@mui/material';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStoreItems() {
      try {
        const response = await fetch('http://localhost:5000/store_items');
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error('Error fetching store items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoreItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const featuredItems = carouselItems.slice(0, 3);

  return (
    <div maxWidth="md">
      <Header title="Our Store" buttonText="Login" buttonAction={() => console.log('Button clicked')} />
      <Typography className="App-header" variant="h4" component="div" gutterBottom>
          Welcome to Our Store
        <Typography variant="body1">Discover amazing products and great deals!</Typography>
        </Typography>
      <Container>
        <main>
          <section className="featured-products">
            <Typography variant="h5" style={{ marginTop: '16px', marginBottom: '24px', fontWeight: 'bold', color: '#333' }}>
              Featured Products
            </Typography>
            <Grid container spacing={3}>
              {featuredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100%" // Set a fixed height
                      image={item.image_path}
                      alt={item.name}
                    />
                    <div style={{ padding: '16px' }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" style={{ marginBottom: '8px' }}>
                        Description of {item.name}.
                      </Typography>
                      <Button variant="contained" color="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {carouselItems.length > 3 && (
              <Link to="/all-items" style={{ marginTop: '16px', display: 'block' }}>
                <Button variant="outlined">View More</Button>
              </Link>
            )}
          </section>
        </main>
      </Container>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
