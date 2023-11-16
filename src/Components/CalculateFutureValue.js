import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UserService from '../Services/UserService';

const CalculateFutureValue = () => {
  const [investment, setInvestment] = useState({
    presentValue: '',
    invROI: '',
    timePeriod: '',
    timesCompoundedPerYear: '',
    purchaseDate: '',
    investmentCategory: '',
  });

  const [futureValue, setFutureValue] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const userService = new UserService();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  const calculateFutureValue = () => {
    userService.calculateAndSaveFutureValue(investment)
      .then((response) => {
        setFutureValue(response.data.futureValue);
        setOpenSuccess(true);
        setMessage(`Future Value calculated and saved: ${response.data.futureValue}`);
      })
      .catch((error) => {
        setOpenError(true);
        setMessage('Future value calculated and saved');
        console.error('Error calculating Future Value:', error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Calculate Future Value
        </Typography>
        <TextField
          fullWidth
          label="Present Value"
          name="presentValue"
          value={investment.presentValue}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Investment ROI"
          name="invROI"
          value={investment.invROI}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Time Period (years)"
          name="timePeriod"
          value={investment.timePeriod}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Times Compounded Per Year"
          name="timesCompoundedPerYear"
          value={investment.timesCompoundedPerYear}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Purchase Date"
          name="purchaseDate"
          value={investment.purchaseDate}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Investment Category"
          name="investmentCategory"
          value={investment.investmentCategory}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={calculateFutureValue}
          fullWidth
        >
          Calculate Future Value
        </Button>
        {futureValue !== null && (
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Calculated Future Value: {futureValue}
          </Typography>
        )}
      </Paper>
      <Snackbar
        open={openSuccess || openError}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </Container>
  );
};

export default CalculateFutureValue;
