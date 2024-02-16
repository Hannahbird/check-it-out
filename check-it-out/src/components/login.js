import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const LoginRegisterPopup = ({ open, onClose, onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
    onClose();
  };

  const handleRegister = () => {
    onRegister(username, password);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login/Register</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
        <Button onClick={handleRegister} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRegisterPopup;
