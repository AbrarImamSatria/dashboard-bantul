import axios from 'axios';

export interface BalitaGiziData {
  lokasi: {
    kabupaten: string;
    provinsi: string;
  };
  tahun: number;
  jumlah_balita_diukur: number;
  status_gizi_berdasarkan_BB_U: {
    gizi_buruk: number;
    gizi_kurang: number;
    gizi_baik: number;
    gizi_lebih: number;
    persentase: {
      gizi_buruk: number;
      gizi_kurang: number;
      gizi_baik: number;
      gizi_lebih: number;
    };
  };
  status_gizi_berdasarkan_TB_U: {
    sangat_pendek: number;
    pendek: number;
    normal: number;
    tinggi: number;
    persentase: {
      sangat_pendek: number;
      pendek: number;
      normal: number;
      tinggi: number;
    };
  };
  status_gizi_berdasarkan_BB_TB: {
    sangat_kurus: number;
    kurus: number;
    normal: number;
    gemuk: number;
    persentase: {
      sangat_kurus: number;
      kurus: number;
      normal: number;
      gemuk: number;
    };
  };
}

const API_URL = 'https://mock.apidog.com/m2/825221-804791-default/15784834';

export const getBalitaGiziData = async (): Promise<BalitaGiziData> => {
  try {
    const response = await axios.get<BalitaGiziData>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching balita gizi data:', error);
    throw error;
  }
};