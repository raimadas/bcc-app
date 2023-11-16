import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Snackbar } from '@mui/material';
import UserService from '../Services/UserService';

const NetSavings = () => {
  const [userId, setUserId] = useState(1); 
  const [netSavings, setNetSavings] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const userService = new UserService();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const calculateNetSavings = () => {
    userService.getNetSavingsOfUser(userId)
      .then((response) => {
        setNetSavings(response);
      })
      .catch((error) => {
        setOpenError(true);
        setMessage('Error calculating net savings. Please try again.');
        console.error('Error calculating net savings:', error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Net Savings Calculation
        </Typography>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={handleUserIdChange}
          style={{ width: '90%', padding: '10px', fontSize: '16px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={calculateNetSavings}
          fullWidth
        >
          Calculate Net Savings
        </Button>
        {netSavings !== null && (
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Net Savings: {netSavings}
          </Typography>
        )}
      </Paper>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </Container>
  );
};

export default NetSavings;
