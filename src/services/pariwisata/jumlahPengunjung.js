// services/pariwisata/jumlahPengunjung.js
import axios from 'axios';

const API_URL = 'https://mock.apidog.com/m2/825221-804791-default/14679378';

export const getJumlahPengunjung = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};