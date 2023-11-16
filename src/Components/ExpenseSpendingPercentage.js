import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import UserService from '../Services/UserService';

const ExpenseSpendingPercentage = () => {
  const [category, setCategory] = useState('');
  const [spendingPercentage, setSpendingPercentage] = useState(null);

  const userService = new UserService();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const calculateSpendingPercentage = () => {
    userService.getCategorySpendingPercentage(category)
      .then(percentage => setSpendingPercentage(percentage))
      .catch(error => {
        console.error('Error fetching spending percentage:', error);
      });
  };

  useEffect(() => {
    if (category) {
      calculateSpendingPercentage();
    }
  }, [category]);

  return (
    <Card style={{ backgroundColor: 'white', maxWidth: 500, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Category Spending Percentage
        </Typography>
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={handleCategoryChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        
        {spendingPercentage !== null && (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Spending Percentage for {category}: {spendingPercentage}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseSpendingPercentage;
