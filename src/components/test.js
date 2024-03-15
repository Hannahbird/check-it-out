import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardMedia } from '@mui/material';
// import './App.css';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Footer from './footer';
import Header from './header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

function Test() {
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } else {
                console.error('Failed to add item to the cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    useEffect(() => {
        async function fetchStoreItems() {
            try {
                const response = await axios.get('http://localhost:5000/store_items');
                setCarouselItems(response.data);
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
                                            height="100%"
                                            image={item.image_path}
                                            alt={item.name}
                                        />
                                        <CardContent>
                                        <div style={{ padding: '16px' }}>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        CardActions are just a flexbox component that wraps the children in
                                                        8px of padding and 8px horizontal padding between children.
                                                    </Typography>
                                                    {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<ShoppingCartIcon />}
                                                    onClick={() => addToCart(item.id)}
                                                >
                                                    Add to Cart
                                                </Button> */}
                                            </div>
                                        </div>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                            <Button size="small" color="primary">
                                                Primary
                                            </Button>
                                            <Button size="small" color="secondary" onClick={() => addToCart(item.id)}>
                                                ${item.price}
                                            </Button>
                                        </CardActions>
                                        </CardContent>
                                        
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
                <Footer />
            </footer>
        </div>
    );
}

export default Test;