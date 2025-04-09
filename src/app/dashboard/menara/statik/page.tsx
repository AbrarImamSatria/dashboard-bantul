"use client"; // Tambahkan ini kalau pakai Next.js App Router
import React, { useState, useEffect } from "react";
import { FaChartBar, FaMap } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { fetchDashboardData } from "@/services/menara/homeMenara";
import Breadcrumb from "@/components/dashboard/breadcrumb";

// TypeScript interfaces for data
interface PieDataItem {
  name: string;
  value: number;
  fill: string;
}

interface BarDataItem {
  name: string;
  value: number;
}

interface ZonaDataItem {
  name: string;
  greenfield3: number;
  greenfield4: number;
  monopole: number;
  kamuflase: number;
  rooftop: number;
}

interface DashboardData {
  totalTowers: number;
  totalCompanies: number;
  totalKapanewon: number;
  towerTypes: number;
  distribusiPerusahaan: PieDataItem[];
  distribusiKapanewon: BarDataItem[];
  distribusiKetinggian: BarDataItem[];
  distribusiZona: ZonaDataItem[];
}

// Komponen judul halaman
const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Detail Statistik Menara
      </h1>
    </div>
  );
};

// MenuMenara Component - Extracted outside the main component
const MenuMenara = () => {
  const router = useRouter();
  const menuItems = [
    {
      icon: <FaChartBar size={24} />,
      label: "Statik",
      path: "/dashboard/menara/statik",
    },
    {
      icon: <FaMap size={24} />,
      label: "Peta",
      path: "/dashboard/menara/peta",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center bg-[#6D8B74] p-3 space-x-8">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-white space-x-2 cursor-pointer"
          onClick={() => handleNavigation(item.path)}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// DashboardDistribusiMenara Component with internal data fetching
const DashboardDistribusiMenara = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDashboardData();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal mengambil data dari API");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error || "Data tidak tersedia"}
        </div>
      </div>
    );
  }

  // Helper functions for charts
  const getBarColor = (value: number): string => {
    const maxValue = Math.max(
      ...data.distribusiKapanewon.map((item: BarDataItem) => item.value)
    );
    const minValue = Math.min(
      ...data.distribusiKapanewon.map((item: BarDataItem) => item.value)
    );
    const ratio = (value - minValue) / (maxValue - minValue);
    const baseColor = { r: 20, g: 150, b: 139 };
    const lightColor = { r: 167, g: 228, b: 223 };
    const r = Math.round(lightColor.r + ratio * (baseColor.r - lightColor.r));
    const g = Math.round(lightColor.g + ratio * (baseColor.g - lightColor.g));
    const b = Math.round(lightColor.b + ratio * (baseColor.b - lightColor.b));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getKetinggianBarColor = (value: number): string => {
    const maxValue = Math.max(
      ...data.distribusiKetinggian.map((item: BarDataItem) => item.value)
    );
    const minValue = Math.min(
      ...data.distribusiKetinggian.map((item: BarDataItem) => item.value)
    );
    const ratio = (value - minValue) / (maxValue - minValue);
    const baseColor = { r: 20, g: 150, b: 139 };
    const lightColor = { r: 167, g: 228, b: 223 };
    const r = Math.round(lightColor.r + ratio * (baseColor.r - lightColor.r));
    const g = Math.round(lightColor.g + ratio * (baseColor.g - lightColor.g));
    const b = Math.round(lightColor.b + ratio * (baseColor.b - lightColor.b));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const customTooltipFormatter = (value: number) => {
    return [`${value}`, "Menara"];
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-6xl mx-auto">
      {/* Distribusi Menara Berdasarkan Perusahaan */}
      <div className="rounded-lg p-4 bg-[#DDE5DC]">
        <h3 className="text-lg font-semibold mb-1">
          Distribusi Menara Berdasarkan Perusahaan
        </h3>
        <p className="text-xs text-black mb-4">
          Analisis{" "}
          {data.distribusiPerusahaan.reduce(
            (acc: number, item: PieDataItem) => acc + item.value,
            0
          )}{" "}
          menara yang tercatat berdasarkan jenis perusahaan
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
              <Pie
                data={data.distribusiPerusahaan}
                cx="30%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                dataKey="value"
              >
                {data.distribusiPerusahaan.map(
                  (entry: PieDataItem, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{
                  paddingRight: "60px", // Geser legenda ke kanan
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribusi Menara Berdasarkan Kapanewon */}
      <div className="rounded-lg p-4 bg-[#DDE5DC]">
        <h3 className="text-lg font-semibold mb-1">
          Distribusi Menara Berdasarkan Kapanewon
        </h3>
        <p className="text-xs text-black mb-4">
          Total{" "}
          {data.distribusiKapanewon.reduce(
            (acc: number, item: BarDataItem) => acc + item.value,
            0
          )}{" "}
          menara tersebar di {data.distribusiKapanewon.length} Kapanewon di
          Kabupaten Bantul
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data.distribusiKapanewon}
              margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
              barSize={15}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" domain={[0, 80]} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11 }}
                width={75}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={customTooltipFormatter} />
              <Bar dataKey="value">
                {data.distribusiKapanewon.map(
                  (entry: BarDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(entry.value)}
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribusi Menara Berdasarkan Ketinggian */}
      <div className="rounded-lg p-4 bg-[#DDE5DC]">
        <h3 className="text-lg font-semibold mb-1">
          Distribusi Menara Berdasarkan Ketinggian
        </h3>
        <p className="text-xs text-black mb-4">
          Analisis{" "}
          {data.distribusiKetinggian.reduce(
            (acc: number, item: BarDataItem) => acc + item.value,
            0
          )}{" "}
          menara berdasarkan ketinggian spesifik dan range ketinggian
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.distribusiKetinggian}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 80]} tickCount={5} />
              <Tooltip formatter={customTooltipFormatter} />
              <Bar dataKey="value">
                {data.distribusiKetinggian.map(
                  (entry: BarDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getKetinggianBarColor(entry.value)}
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribusi Menara Berdasarkan Zona Kawasan */}
      <div className="rounded-lg p-4 bg-[#DDE5DC] shadow-sm">
        <h3 className="text-lg font-semibold mb-1">
          Distribusi Menara Berdasarkan Zona Kawasan
        </h3>
        <p className="text-xs text-black mb-4">
          Analisis{" "}
          {data.distribusiZona.reduce(
            (acc: number, item: ZonaDataItem) =>
              acc +
              item.greenfield3 +
              item.greenfield4 +
              item.monopole +
              item.kamuflase +
              item.rooftop,
            0
          )}{" "}
          menara berdasarkan tipe kawasan
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.distribusiZona}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={true} tickLine={false} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="top"
                layout="vertical"
                wrapperStyle={{ paddingRight: "10px", right: 10, top: 0 }}
              />
              <Bar
                dataKey="greenfield3"
                name="Greenfield 3 Kaki"
                stackId="a"
                fill="#0B4841"
              />
              <Bar
                dataKey="greenfield4"
                name="Greenfield 4 Kaki"
                stackId="a"
                fill="#0D5D52"
              />
              <Bar
                dataKey="monopole"
                name="Monopole"
                stackId="a"
                fill="#14968B"
              />
              <Bar
                dataKey="kamuflase"
                name="Kamuflase"
                stackId="a"
                fill="#42BCB3"
              />
              <Bar
                dataKey="rooftop"
                name="Rooftop"
                stackId="a"
                fill="#A7E4DF"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function HalamanMenara() {
  return (
    <div className="bg-[#F7F7F3] min-h-screen">
      <MenuMenara />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> {/* Menambahkan komponen breadcrumb */}
        <JudulHalaman /> {/* Menambahkan judul halaman */}
      </div>
      <div className="pb-9">
        <DashboardDistribusiMenara />
      </div>
    </div>
  );
}
