const API_BASE_URL = 'https://quiznest-backend.onrender.com/api';

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  signup: (email, pin) => apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, pin }),
  }),

  login: (email, pin) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, pin }),
  }),
};

// Countries API call
export const countriesAPI = {
  getAll: () => apiRequest('/countries'),
};

// Quiz API calls
export const quizAPI = {
  saveAttempt: (quizData) => apiRequest('/quiz/attempts', {
    method: 'POST',
    body: JSON.stringify(quizData),
  }),
  
  getAttempts: () => apiRequest('/quiz/attempts'),
  
  getStats: () => apiRequest('/quiz/stats'),
};
