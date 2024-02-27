import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const styles = {
  centeredText: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

function Footer() {
  return (
    <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="h6" color="inherit" style={styles.centeredText}>
                Contact us at support@store.com
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
  );
}

export default Footer;
