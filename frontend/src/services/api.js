import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (category, ingredients) => {
  const response = await api.post('/recommend', {
    category: category.toLowerCase(),
    ingredients: ingredients,
  });
  return response.data;
};

export const getRecipes = async (params = {}) => {
  const response = await api.get('/api/recipes', { params });
  return response.data;
};

export const getRecipesCount = async (params = {}) => {
  const response = await api.get('/api/recipes/count', { params });
  return response.data;
};

export default api;
