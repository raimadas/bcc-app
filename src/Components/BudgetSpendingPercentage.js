import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import UserService from '../Services/UserService';

const BudgetSpendingPercentage = () => {
  const [spendingPercentage, setSpendingPercentage] = useState(null);
  const { budgetId } = useParams(); 

  useEffect(() => {
    
    const userService = new UserService();
    userService.getSpendingPercentage(budgetId)
      .then(percentage => setSpendingPercentage(percentage))
      .catch(error => {
        console.error('Error fetching spending percentage:', error);
        
      });
  }, [budgetId]);

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto', backgroundColor: 'white' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Budget Spending Percentage
        </Typography>
        {spendingPercentage !== null ? (
          <Typography variant="body1">
            Spending Percentage: {spendingPercentage}%
          </Typography>
        ) : (
          <CircularProgress color="primary" />
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetSpendingPercentage;

