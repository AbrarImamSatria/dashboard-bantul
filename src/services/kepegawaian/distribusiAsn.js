import axios from 'axios';

// Fungsi untuk mengambil data jenis pegawai dari API
const getDistribusiAsn = async () => {
  try {
    const response = await axios.get('https://mock.apidog.com/m2/825221-804791-default/14473633');
    return response.data;
  } catch (error) {
    console.error('Error fetching jenis pegawai data:', error);
    throw error;
  }
};

export { getDistribusiAsn };