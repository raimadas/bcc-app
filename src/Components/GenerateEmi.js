import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import UserService from '../Services/UserService';

const GenerateEmi = () => {
  const [loan, setLoan] = useState({
    principal: '',
    rateOfInterest: '',
    timePeriod: '',
  });

  const [emi, setEMI] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const { userId } = useParams(); 
  const userService = new UserService();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const generateEMI = () => {
    userService.generateEMI(loan, userId)
      .then((response) => {
        if (response.data && response.data.emi) {
          setEMI(response.data.emi);
          setOpenSuccess(true);
          setMessage(`EMI calculated successfully: ${response.data.emi}`);
        } else {
          setOpenError(true);
          setMessage('EMI calculated successfully.');
        }
      })
      .catch((error) => {
        setOpenError(true);
        setMessage('Error generating EMI. Please try again.');
        console.error('Error generating EMI:', error);
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
          EMI Generation
        </Typography>
        <TextField
          fullWidth
          label="Principal Amount"
          name="principal"
          value={loan.principal}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Rate of Interest"
          name="rateOfInterest"
          value={loan.rateOfInterest}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Loan Tenure (months)"
          name="timePeriod"
          value={loan.timePeriod}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={generateEMI}
          fullWidth
        >
          Generate EMI
        </Button>
        {emi !== null && (
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Calculated EMI: {emi}
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

export default GenerateEmi;
