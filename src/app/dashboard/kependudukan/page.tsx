"use client"; // Tambahkan ini kalau pakai Next.js App Router
import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import MenuKependudukan from "@/components/kependudukan/MenuKependudukan";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Import API service
import kependudukanAPI from "@/services/kependudukan/homeKependudukan";

// Define interfaces for type safety
interface DataItem {
  name: string;
  value: number;
  percentage: string;
}

interface DashboardData {
  total_penduduk: number;
  jumlah_penduduk_laki_laki: number;
  jumlah_penduduk_perempuan: number;
  luas_wilayah: number;
  kepadatan_penduduk: number;
  rasio_jenis_kelamin: number;
}

interface DataJenisKelamin {
  nama: string;
  nilai: number;
  warna: string;
}

interface DataUsia {
  usia: string;
  jumlah: number;
}

interface DataPendidikan {
  tingkat: string;
  jumlah: number;
}

interface DataPerkawinan {
  nama: string;
  nilai: number;
  warna: string;
}

interface DataKelahiran {
  tahun: string;
  jumlah: number;
}

interface DataPekerjaan {
  jenis: string;
  jumlah: number;
}

interface FilterComponentProps {
  tahunOptions: string[];
  kecamatanOptions: string[];
  onFilter: (tahun: string, kecamatan: string) => void;
}

interface ChartDashboardProps {
  dataJenisKelamin: DataJenisKelamin[];
  dataUsia: DataUsia[];
  dataPendidikan: DataPendidikan[];
  dataPerkawinan: DataPerkawinan[];
  dataKelahiran: DataKelahiran[];
  dataPekerjaan: DataPekerjaan[];
}

const FilterComponent = ({
  tahunOptions,
  kecamatanOptions,
  onFilter,
}: FilterComponentProps) => {
  const [tahun, setTahun] = useState<string>("");
  const [kecamatan, setKecamatan] = useState<string>("");

  const handleFilter = () => {
    onFilter(tahun, kecamatan);
  };

  return (
    <div className="bg-[#BFD0C1] p-6 rounded-md">
      <div className="text-lg font-bold mb-4">Filter</div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Dropdown Tahun */}
        <div className="relative flex-1">
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full h-12 pl-4 pr-10 bg-white rounded border border-gray-300 appearance-none focus:outline-none"
          >
            <option value="">Tahun</option>
            {tahunOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Dropdown Kecamatan */}
        <div className="relative flex-1">
          <select
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            className="w-full h-12 pl-4 pr-10 bg-white rounded border border-gray-300 appearance-none focus:outline-none"
          >
            <option value="">Kecamatan</option>
            {kecamatanOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Tombol Filter */}
        <button
          onClick={handleFilter}
          className="w-full md:w-auto bg-[#6D8B74] hover:bg-[#7cb489] text-white font-medium py-2 px-4 rounded focus:outline-none"
        >
          Filter data
        </button>
      </div>
    </div>
  );
};

const DashboardCards = ({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) => {
  // Data untuk Dashboard Cards
  const cardData = [
    {
      label: "Total Penduduk",
      value: dashboardData.total_penduduk.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
    {
      label: "Kepadatan Penduduk",
      value: dashboardData.kepadatan_penduduk.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
    {
      label: "Rasio Jenis Kelamin",
      value: dashboardData.rasio_jenis_kelamin.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cardData.map((item) => (
        <div
          key={item.label}
          className="border border-gray-200 rounded-lg p-4 bg-[#8FAB98] shadow-md flex flex-col items-center justify-center h-24"
        >
          {/* Konten rata tengah */}
          <div className="flex items-center justify-center">
            {/* Ikon */}
            <div className="mr-3">{item.icon}</div>
            {/* Teks */}
            <div className="flex flex-col items-center">
              <div className="text-sm text-white text-center">
                {item.label}
              </div>
              <div className="text-xl font-bold text-center text-white">
                {item.value} <span className="text-sm font-normal"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChartDashboard = ({
  dataJenisKelamin,
  dataUsia,
  dataPendidikan,
  dataPerkawinan,
  dataKelahiran,
  dataPekerjaan,
}: ChartDashboardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Distribusi Jenis Kelamin */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Distribusi Jenis Kelamin</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataJenisKelamin}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="nilai"
              nameKey="nama"
              label={({ nama, nilai }: { nama: string; nilai: number }) =>
                `${nama} (${nilai}%)`
              }
            >
              {dataJenisKelamin.map(
                (entry: DataJenisKelamin, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.warna} />
                )
              )}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Distribusi Penduduk Berdasarkan Usia */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">
          Distribusi Penduduk Berdasarkan Usia
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataUsia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="usia" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
            <Bar dataKey="jumlah" name="Kelompok Usia" fill="#8FE3CF" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 bg-teal-400 mr-2"></div>
            <span className="text-sm">Kelompok Usia</span>
          </div>
        </div>
      </div>

      {/* Distribusi Pendidikan */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Distribusi Pendidikan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataPendidikan} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="tingkat" type="category" width={100} />
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
            <Bar dataKey="jumlah" name="Jumlah Penduduk" fill="#0E8388" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 bg-teal-600 mr-2"></div>
            <span className="text-sm">Jumlah Penduduk</span>
          </div>
        </div>
      </div>

      {/* Distribusi Status Perkawinan */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">
          Distribusi Status Perkawinan
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataPerkawinan}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="nilai"
              nameKey="nama"
              label={({ nama, nilai }: { nama: string; nilai: number }) =>
                `${nama} ${nilai}%`
              }
            >
              {dataPerkawinan.map((entry: DataPerkawinan, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.warna} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center items-center flex-wrap gap-2">
          {dataPerkawinan.map((entry: DataPerkawinan, index: number) => (
            <div key={index} className="flex items-center mr-3">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: entry.warna }}
              ></div>
              <span className="text-sm">{entry.nama}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distribusi Kelahiran */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Distribusi Kelahiran</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dataKelahiran}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="jumlah"
              stroke="#0E8388"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribusi Pekerjaan */}
      <div className="bg-[#DDE5DC] p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Distribusi Pekerjaan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataPekerjaan} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="jenis" type="category" width={120} />
            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
            <Bar dataKey="jumlah" name="Jumlah" fill="#0E8388" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface ApiResponse {
  dashboard_data: DashboardData;
  data_jenis_kelamin: DataJenisKelamin[];
  data_usia: DataUsia[];
  data_pendidikan: DataPendidikan[];
  data_perkawinan: DataPerkawinan[];
  data_kelahiran: DataKelahiran[];
  data_pekerjaan: DataPekerjaan[];
  tahun_options: string[];
  kecamatan_options: string[];
}

const CombinedDashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse>({
    dashboard_data: {
      total_penduduk: 0,
      jumlah_penduduk_laki_laki: 0,
      jumlah_penduduk_perempuan: 0,
      luas_wilayah: 0,
      kepadatan_penduduk: 0,
      rasio_jenis_kelamin: 0,
    },
    data_jenis_kelamin: [],
    data_usia: [],
    data_pendidikan: [],
    data_perkawinan: [],
    data_kelahiran: [],
    data_pekerjaan: [],
    tahun_options: [],
    kecamatan_options: [],
  });

  // Fungsi untuk memuat data
  const fetchData = async (tahun: string = "", kecamatan: string = "") => {
    setLoading(true);
    try {
      let response;

      if (tahun || kecamatan) {
        response = await kependudukanAPI.fetchKependudukanByFilter(
          tahun,
          kecamatan
        );
      } else {
        response = await kependudukanAPI.fetchKependudukanData();
      }

      setData(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Muat data saat komponen dimount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle filter
  const handleFilter = (tahun: string, kecamatan: string) => {
    fetchData(tahun, kecamatan);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Baris pertama: Dashboard Cards */}
      <DashboardCards dashboardData={data.dashboard_data} />

      {/* Filter Component */}
      <FilterComponent
        tahunOptions={data.tahun_options}
        kecamatanOptions={data.kecamatan_options}
        onFilter={handleFilter}
      />

      {/* Chart Dashboard */}
      <ChartDashboard
        dataJenisKelamin={data.data_jenis_kelamin}
        dataUsia={data.data_usia}
        dataPendidikan={data.data_pendidikan}
        dataPerkawinan={data.data_perkawinan}
        dataKelahiran={data.data_kelahiran}
        dataPekerjaan={data.data_pekerjaan}
      />
    </div>
  );
};

export default function KependudukanPage() {
  return (
    <div className="g-[#F7F7F3] min-h-screen">
      <MenuKependudukan />
      <div className="pb-9 pt-3">
        <CombinedDashboard />
      </div>
    </div>
  );
}
