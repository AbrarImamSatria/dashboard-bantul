import axios from 'axios';

// Base URL untuk API
const API_URL = 'https://mock.apidog.com/m1/825221-804791-default';

// Fungsi untuk mengambil data home kepegawaian
const getHomeKepegawaianData = async () => {
  try {
    const response = await axios.get(`${API_URL}/homekepegawaian`);
    return response.data;
  } catch (error) {
    console.error('Error fetching home kepegawaian data:', error);
    throw error;
  }
};

export { getHomeKepegawaianData };