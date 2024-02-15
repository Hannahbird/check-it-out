import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Header = ({ title, buttonText, buttonAction }) => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h6" color="inherit">
            {title}
          </Typography>
          {buttonText && (
            <Button variant="contained" color="info" onClick={buttonAction} style={{ marginLeft:'auto' }}>
              {buttonText}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
