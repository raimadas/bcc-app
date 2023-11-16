
import React, { useState } from 'react';
import { Container, Paper, Grid, Typography, TextField, Button, Avatar, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import UserService from '../Services/UserService';

const CreateUser = () => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    contactDetails: '',
    income: '',
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSaveUser = () => {
    const userService = new UserService();
    const userData = {
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      contactDetails: user.contactDetails,
      income: user.income,
    };

    userService
      .createUser(userData)
      .then((response) => {
        console.log('User created successfully!', response);
        setOpenSuccess(true);
        setMessage('User created successfully!');
       
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setOpenError(true);
        setMessage('Error creating user. Please try again.');
      
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
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center">
              <Avatar style={{ backgroundColor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Create User
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Details"
              name="contactDetails"
              value={user.contactDetails}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Income"
              name="income"
              value={user.income}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveUser}
              fullWidth
            >
              Save User
            </Button>
          </Grid>
        </Grid>
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

export default CreateUser;
