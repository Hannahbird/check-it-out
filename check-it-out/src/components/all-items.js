import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, Divider, CircularProgress } from '@mui/material';
import Footer from './footer';
import Header from './header';

function AllItems() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all items from the server (similar to what you did in App.js)
    async function fetchAllItems() {
      try {
        const response = await fetch('http://localhost:5000/store_items');
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.error('Error fetching all items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllItems();
  }, []);

  return (
    <div>
      <Header title="All Items" buttonText="Back to Home" buttonAction={() => navigate('/')} />

      <main style={{ marginBottom: '20px' }}>
        {loading ? (
          <Container maxWidth="md" style={{ marginTop: '20px', textAlign: 'center' }}>
            <CircularProgress />
          </Container>
        ) : (
          <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <div className="inventory">
              <section className="all-items-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {/* Render your list of items here, similar to the App component */}
                {allItems.map((item) => (
                  <Card key={item.id} style={{ maxWidth: '300px', margin: 'auto' }}> {/* Adjust maxWidth as needed */}
                    <CardMedia
                      component="img"
                      height="100%" // Set a fixed height
                      image={item.image_path}
                      alt={item.name}
                    />
                    <div style={{ padding: '16px' }}>
                      <Typography variant="body1" style={{ marginBottom: '8px' }}>{item.name}</Typography>
                      <Button variant="contained" color="primary">
                        Add to Cart
                      </Button>
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
        <Footer/>
      </footer>
    </div>
  );
}

export default AllItems;