export interface BalitaPengukuranData {
  kabupaten: string;
  provinsi: string;
  tahun: number;
  data_stunting: {
    jumlah_balita_diukur: number;
    balita_terindikasi_stunting: number;
    prevalensi_stunting: number;
    distribusi_jenis_kelamin: {
      laki_laki: {
        jumlah: number;
        persentase: number;
        stunting: {
          jumlah: number;
          persentase: number;
        };
      };
      perempuan: {
        jumlah: number;
        persentase: number;
        stunting: {
          jumlah: number;
          persentase: number;
        };
      };
    };
    status_stunting: {
      kategori: string;
      interpretasi: string;
    };
  };
  sumber_data: string;
}

export const fetchBalitaPengukuran = async (): Promise<BalitaPengukuranData> => {
  const response = await fetch('https://mock.apidog.com/m2/825221-804791-default/15788264');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};