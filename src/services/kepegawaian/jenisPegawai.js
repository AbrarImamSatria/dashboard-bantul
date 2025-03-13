import axios from 'axios';

const API_URL = "https://mock.apidog.com/m2/825221-804791-default/14473642";

export const fetchKepegawaianData = async () => {
  try {
    const response = await axios.get(API_URL);
    
    if (response.status === 200 && response.data.statusCode === 200) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching kepegawaian data:', error);
    throw error;
  }
};