import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 

class UserService {
 
  // Create a new user
  createUser(user) {
    return axios.post(`${API_BASE_URL}/users/create`, user)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Get all users
  getAllUsers() {
    return axios.get(`${API_BASE_URL}/users/all`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Get a user by ID
  getUserById(userId) {
    return axios.get(`${API_BASE_URL}/users/${userId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

   // Create a new budget
   createBudget(budget) {
    return axios.post(`${API_BASE_URL}/budgets/create`, budget)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Get spending percentage for a budget by ID
  getSpendingPercentage(budgetId) {
    return axios.get(`${API_BASE_URL}/budgets/spending-percentage/${budgetId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  createExpense(expense) {
    return axios.post(`${API_BASE_URL}/expenses/create`, expense)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  getCategorySpendingPercentage(category) {
    return axios.get(`${API_BASE_URL}/expenses/spending-percentage/${category}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  // Get net savings for a user by ID
  getNetSavingsOfUser(userId) {
    return axios
      .get(`${API_BASE_URL}/expenses/net-savings/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  //loan

  generateEMI(loan, userId) {
    return axios
      .post(`${API_BASE_URL}/loans/generate-emi/${userId}`, loan)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }


  calculateAndSaveFutureValue(investment) {
    return axios
      .post(`${API_BASE_URL}/investments/calculate-future-value`, investment)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  
}

export default UserService;
