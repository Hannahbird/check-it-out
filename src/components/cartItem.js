// CartItem.js
import React, { useState } from 'react';
import { Card, CardMedia, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

const CartItem = ({ item, updateCart, removeFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/update-cart-item/${item.id}`, {
        quantity: newQuantity,
      });
  
      if (response.status === 200) {
        setQuantity(newQuantity);
      } else {
        console.error('Failed to update quantity:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/remove-from-cart/${item.id}`);
      removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <Card style={{ maxWidth: '300px', margin: '16px' }}>
    <CardMedia
    component="img"
    height="150"
    image={item.store_item.image_path}
    alt={item.store_item.name}
    style={{ marginBottom: '16px' }}
  />
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">{item.store_item.name}</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div>
            <Typography variant="body2" color="textSecondary">
              ${item.store_item.price}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <IconButton size="small" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                -
              </IconButton>
              <Typography variant="body2" style={{ margin: '0 8px' }}>
                {quantity}
              </Typography>
              <IconButton size="small" onClick={() => handleQuantityChange(quantity + 1)}>
                +
              </IconButton>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveItem}
              style={{ marginLeft: '8px' }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
