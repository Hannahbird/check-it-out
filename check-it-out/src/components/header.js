import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ title, buttonText, buttonAction, isCartEmpty }) => {
  const location = useLocation();
  const isOnCartPage = location.pathname === '/cart';

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <div>
            {buttonText && (
              <Button variant="contained" color="info" onClick={buttonAction}>
                {buttonText}
              </Button>
            )}
            {isCartEmpty || isOnCartPage ? null : (
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
                  <ShoppingCartIcon />
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
