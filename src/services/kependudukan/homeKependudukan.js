import axios from 'axios';

const API_URL = 'https://mock.apidog.com/m2/825221-804791-default/14514390';

// Fungsi untuk mengambil semua data kependudukan
export const fetchKependudukanData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching kependudukan data:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data dengan filter (jika diperlukan di masa depan)
export const fetchKependudukanByFilter = async (tahun, kecamatan) => {
  try {
    // Membuat parameter query jika tahun atau kecamatan dipilih
    const params = {};
    if (tahun) params.tahun = tahun;
    if (kecamatan) params.kecamatan = kecamatan;

    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching kependudukan data with filters:', error);
    throw error;
  }
};

export default {
  fetchKependudukanData,
  fetchKependudukanByFilter
};