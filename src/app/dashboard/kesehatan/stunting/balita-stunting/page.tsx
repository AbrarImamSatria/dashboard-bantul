"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import MenuStunting from "@/components/stunting/MenuStunting";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { Users, BarChart3, Percent } from "lucide-react";
import {
  fetchStuntingData,
  KecamatanData,
  StuntingData,
} from "@/services/stunting/balitaStunting";

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Prevalensi Balita Stunting Kabupaten Bantul
      </h1>
    </div>
  );
};

const ChartBox = ({
  title,
  dataKey,
  label,
  data,
}: {
  title: string;
  dataKey: string;
  label: string;
  data: KecamatanData[];
}) => (
  <div className="bg-[#DDE5DC] rounded-lg p-6 shadow-md mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 20, bottom: 30, left: 100 }}
      >
        <XAxis type="number" />
        <YAxis dataKey="nama" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="#065F46" name={label} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const CombinedDetailDashboard = ({
  stuntingData,
}: {
  stuntingData: StuntingData;
}) => {
  // Transform data to match the chart format
  const chartData = stuntingData.kecamatan.map((kec) => ({
    nama: kec.nama,
    jumlah_balita: kec.jumlah_balita,
    jumlah_balita_stunting: kec.jumlah_balita_stunting,
    prevalensi_stunting: kec.prevalensi_stunting,
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Kapanewon"
          className="border rounded-md px-4 py-2 flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Kelurahan"
          className="border rounded-md px-4 py-2 flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Tahun"
          className="border rounded-md px-4 py-2 flex-1 min-w-[100px]"
          defaultValue={stuntingData.tahun_data}
        />
        <button className="bg-[#6D8B74] hover:bg-green-950 text-white rounded-md px-4 py-2">
          Terapkan
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
          <Users size={32} className="text-white" />
          <div className="flex flex-col items-center">
            <p className="text-sm">Jumlah Balita Diukur</p>
            <p className="text-3xl font-bold">
              {stuntingData.total.jumlah_balita.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
          <BarChart3 size={32} className="text-white" />
          <div className="flex flex-col items-center">
            <p className="text-sm">Jumlah Balita Stunting</p>
            <p className="text-3xl font-bold">
              {stuntingData.total.jumlah_balita_stunting.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
          <Percent size={32} className="text-white" />
          <div className="flex flex-col items-center">
            <p className="text-sm">Prevalensi Stunting (%)</p>
            <p className="text-3xl font-bold">
              {stuntingData.total.prevalensi_stunting}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <ChartBox
        title="Jumlah Balita Diukur"
        dataKey="jumlah_balita"
        label="Jumlah Balita Diukur"
        data={chartData}
      />
      <ChartBox
        title="Jumlah Balita Stunting"
        dataKey="jumlah_balita_stunting"
        label="Jumlah Balita Stunting"
        data={chartData}
      />
      <ChartBox
        title="Prevalensi Balita Stunting"
        dataKey="prevalensi_stunting"
        label="Stunting (%)"
        data={chartData}
      />
    </div>
  );
};

// Buat layout terpisah untuk menangani menu
const StuntingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F7F7F3] min-h-screen">
      <MenuStunting />
      {children}
    </div>
  );
};

const HalamanASNContent = () => {
  const [stuntingData, setStuntingData] = useState<StuntingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStuntingData();
        setStuntingData(data);
      } catch (err) {
        setError("Gagal memuat data stunting");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!stuntingData) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto pt-3">
      <Breadcrumb />
      <JudulHalaman />
      <div className="pb-9">
        <CombinedDetailDashboard stuntingData={stuntingData} />
      </div>
    </div>
  );
};

const HalamanASN = () => {
  return (
    <StuntingLayout>
      <HalamanASNContent />
    </StuntingLayout>
  );
};

export default HalamanASN;