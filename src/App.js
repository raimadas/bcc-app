import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import CreateUser from './Components/CreateUser';

import BudgetSpendingPercentage from './Components/BudgetSpendingPercentage';

import ExpenseSpendingPercentage from './Components/ExpenseSpendingPercentage';

import CalculateFutureValue from './Components/CalculateFutureValue';
import GenerateEmi from './Components/GenerateEmi';
import NetSavings from './Components/NetSavings';
function App() {
  const backgroundStyle = {
    backgroundColor:'lightgray',
    backgroundSize: 'cover',
    minHeight: '100vh', 
  };

  return (
    <Router>
      <div className="App" style={backgroundStyle}>
        <header className="App-header">
          
        </header>
        <main>
          <Routes>
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route path="/budget/:budgetId" element={<BudgetSpendingPercentage />} />
          <Route path="/expense-percentage/:category" element={<ExpenseSpendingPercentage />} />
          <Route path="/savings" element={<NetSavings />} />
          <Route path="/generate-emi/:userId" element={<GenerateEmi />} />
          <Route path="/calculate-future-value" element={<CalculateFutureValue />} />
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;

