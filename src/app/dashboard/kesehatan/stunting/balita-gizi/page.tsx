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
  CartesianGrid,
} from "recharts";
import MenuStunting from "@/components/stunting/MenuStunting";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { UserCheck, Weight, Ruler, Activity } from "lucide-react";
import { getBalitaGiziData, BalitaGiziData } from "@/services/stunting/balitaGizi";

// Type untuk chart
interface BarType {
  key: string;
  color: string;
  label: string;
}

interface ChartProps {
  title: string;
  data: any[];
  bars: BarType[];
}

const Chart: React.FC<ChartProps> = ({ title, data, bars }) => (
  <div className="bg-[#DDE5DC] rounded-lg p-6 shadow-md mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tahun" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, idx) => (
          <Bar key={idx} dataKey={bar.key} fill={bar.color} name={bar.label} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Prevalensi Balita Bermasalah Gizi Kabupaten Bantul
      </h1>
    </div>
  );
};

interface DashboardProps {
  data: BalitaGiziData;
}

const CombinedDetailDashboard: React.FC<DashboardProps> = ({ data }) => {
  // Format data untuk chart
  const dataBBU = [
    {
      tahun: data.tahun.toString(),
      gizi_kurang: data.status_gizi_berdasarkan_BB_U.gizi_kurang,
      gizi_buruk: data.status_gizi_berdasarkan_BB_U.gizi_buruk,
      underweight: data.status_gizi_berdasarkan_BB_U.gizi_kurang + 
                 data.status_gizi_berdasarkan_BB_U.gizi_buruk,
    },
  ];

  const dataTBU = [
    {
      tahun: data.tahun.toString(),
      pendek: data.status_gizi_berdasarkan_TB_U.pendek,
      sangat_pendek: data.status_gizi_berdasarkan_TB_U.sangat_pendek,
    },
  ];

  const dataBBTB = [
    {
      tahun: data.tahun.toString(),
      gizi_kurang: data.status_gizi_berdasarkan_BB_TB.kurus,
      gizi_buruk: data.status_gizi_berdasarkan_BB_TB.sangat_kurus,
      wasting: data.status_gizi_berdasarkan_BB_TB.kurus + 
              data.status_gizi_berdasarkan_BB_TB.sangat_kurus,
    },
  ];

  // Hitung persentase
  const underweightPercentage = (
    data.status_gizi_berdasarkan_BB_U.persentase.gizi_kurang + 
    data.status_gizi_berdasarkan_BB_U.persentase.gizi_buruk
  ).toFixed(1);
  
  const stuntingPercentage = (
    data.status_gizi_berdasarkan_TB_U.persentase.pendek + 
    data.status_gizi_berdasarkan_TB_U.persentase.sangat_pendek
  ).toFixed(1);
  
  const wastingPercentage = (
    data.status_gizi_berdasarkan_BB_TB.persentase.kurus + 
    data.status_gizi_berdasarkan_BB_TB.persentase.sangat_kurus
  ).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Card 1 - Jumlah Balita */}
        <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
          <UserCheck className="text-white" size={28} />
          <div className="text-center">
            <p className="text-sm text-white">Jumlah Balita Diukur</p>
            <p className="text-2xl font-bold text-white">
              {data.jumlah_balita_diukur.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Card 2 - Underweight */}
        <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
          <Weight className="text-white" size={28} />
          <div className="text-center">
            <p className="text-sm text-white">Underweight (BB/U)</p>
            <p className="text-2xl font-bold text-white">{underweightPercentage}%</p>
          </div>
        </div>
        
        {/* Card 3 - Stunting */}
        <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
          <Ruler className="text-white" size={28} />
          <div className="text-center">
            <p className="text-sm text-white">Stunting (TB/U)</p>
            <p className="text-2xl font-bold text-white">{stuntingPercentage}%</p>
          </div>
        </div>
        
        {/* Card 4 - Wasting */}
        <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
          <Activity className="text-white" size={28} />
          <div className="text-center">
            <p className="text-sm text-white">Wasting (BB/TB)</p>
            <p className="text-2xl font-bold text-white">{wastingPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <Chart
        title="Status Gizi Balita Berdasarkan Berat Badan / Usia (BB/U)"
        data={dataBBU}
        bars={[
          { key: "gizi_kurang", color: "#004D40", label: "Gizi Kurang" },
          { key: "gizi_buruk", color: "#00897B", label: "Gizi Buruk" },
          { key: "underweight", color: "#80CBC4", label: "Underweight" },
        ]}
      />

      <Chart
        title="Status Gizi Balita Berdasarkan Tinggi Badan / Usia (TB/U)"
        data={dataTBU}
        bars={[
          { key: "pendek", color: "#004D40", label: "Pendek" },
          { key: "sangat_pendek", color: "#80CBC4", label: "Sangat Pendek" },
        ]}
      />

      <Chart
        title="Status Gizi Balita Berdasarkan Berat Badan / Tinggi Badan (BB/TB)"
        data={dataBBTB}
        bars={[
          { key: "gizi_kurang", color: "#004D40", label: "Kurus" },
          { key: "gizi_buruk", color: "#00897B", label: "Sangat Kurus" },
          { key: "wasting", color: "#80CBC4", label: "Wasting" },
        ]}
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
  const [data, setData] = useState<BalitaGiziData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBalitaGiziData();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-8">Data tidak tersedia</div>;

  return (
    <div className="max-w-6xl mx-auto pt-3">
      <Breadcrumb />
      <JudulHalaman />
      <div className="pb-9">
        <CombinedDetailDashboard data={data} />
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