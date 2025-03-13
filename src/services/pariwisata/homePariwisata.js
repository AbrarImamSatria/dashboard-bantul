// services/pariwisata/homePariwisata.js
import axios from 'axios';

const API_URL = 'https://mock.apidog.com/m2/825221-804791-default/14665940';

export const fetchPariwisataData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Mengembalikan hanya bagian 'data' dari respons
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};