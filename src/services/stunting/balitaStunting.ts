export interface KecamatanData {
  nama: string;
  jumlah_balita: number;
  jumlah_balita_stunting: number;
  prevalensi_stunting: number;
}

export interface StuntingData {
  kabupaten: string;
  provinsi: string;
  tahun_data: string;
  sumber_data: string;
  kecamatan: KecamatanData[];
  total: {
    jumlah_balita: number;
    jumlah_balita_stunting: number;
    prevalensi_stunting: number;
  };
}

export const fetchStuntingData = async (): Promise<StuntingData> => {
  try {
    const response = await fetch(
      "https://mock.apidog.com/m2/825221-804791-default/15785501?apidogApiId=15785501"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stunting data");
    }
    const data: StuntingData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stunting data:", error);
    throw error;
  }
};