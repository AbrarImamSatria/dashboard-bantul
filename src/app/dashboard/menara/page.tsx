"use client"; // Tambahkan ini kalau pakai Next.js App Router
import React, { useState, useEffect } from "react";
import {
  FaChartBar,
  FaMap,
  FaBroadcastTower,
  FaBuilding,
  FaMapMarkerAlt,
  FaCubes,
} from "react-icons/fa";
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

// MenuMenara Component
const MenuMenara = () => {
  const router = useRouter();
  const menuItems = [
    {
      icon: <FaChartBar size={24} />,
      label: "Statik",
      path: "menara/statik",
    },
    {
      icon: <FaMap size={24} />,
      label: "Peta",
      path: "menara/peta",
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

// Dashboard Content Component with internal data fetching
const DashboardMenara = () => {
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

  // Card data
  const cardData = [
    {
      label: "Total Menara",
      value: data.totalTowers.toLocaleString(),
      icon: <FaBroadcastTower className="text-4xl text-white" />,
    },
    {
      label: "Perusahaan",
      value: data.totalCompanies.toLocaleString(),
      icon: <FaBuilding className="text-4xl text-white" />,
    },
    {
      label: "Kapanewon",
      value: data.totalKapanewon.toLocaleString(),
      icon: <FaMapMarkerAlt className="text-4xl text-white" />,
    },
    {
      label: "Tipe Menara",
      value: data.towerTypes,
      icon: <FaCubes className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto ">
      {/* Baris pertama: Cards dengan statistik utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-[#8FAB98] shadow-md flex flex-col items-center justify-center h-24"
          >
            <div className="flex items-center justify-center">
              <div className="mr-3">{item.icon}</div>
              <div className="flex flex-col items-center">
                <div className="text-sm text-white text-center">
                  {item.label}
                </div>
                <div className="text-xl font-bold text-center text-white">
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Baris kedua: Distribusi Perusahaan (Pie) dan Distribusi Kapanewon (Bar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribusi Menara Berdasarkan Perusahaan */}
        <div className="border rounded-lg p-4 bg-[#F7F7F3] shadow-sm">
          <h3 className="text-lg font-semibold mb-1">
            Distribusi Menara Berdasarkan Perusahaan
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Analisis{" "}
            {data.distribusiPerusahaan.reduce(
              (acc: number, item: PieDataItem) => acc + item.value,
              0
            )}{" "}
            menara yang tercatat berdasarkan jenis perusahaan
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribusiPerusahaan}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {data.distribusiPerusahaan.map(
                    (entry: PieDataItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribusi Menara Berdasarkan Kapanewon */}
        <div className="border rounded-lg p-4 bg-[#F7F7F3]shadow-sm">
          <h3 className="text-lg font-semibold mb-1">
            Distribusi Menara Berdasarkan Kapanewon
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Total{" "}
            {data.distribusiKapanewon.reduce(
              (acc: number, item: BarDataItem) => acc + item.value,
              0
            )}{" "}
            menara tersebar di {data.distribusiKapanewon.length} Kapanewon di
            Kabupaten Bantul
          </p>
          <div className="h-64">
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
      </div>

      {/* Baris ketiga: Distribusi Ketinggian dan Distribusi Zona Kawasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribusi Menara Berdasarkan Ketinggian */}
        <div className="border rounded-lg p-4 bg-[#F7F7F3] shadow-sm">
          <h3 className="text-lg font-semibold mb-1">
            Distribusi Menara Berdasarkan Ketinggian
          </h3>
          <p className="text-xs text-gray-500 mb-4">
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
        <div className="border rounded-lg p-4 bg-[#F7F7F3] shadow-sm">
          <h3 className="text-lg font-semibold mb-1">
            Distribusi Menara Berdasarkan Zona Kawasan
          </h3>
          <p className="text-xs text-gray-500 mb-4">
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
          <div className="h-64">
            <ResponsiveContainer width="106%" height="100%">
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

      {/* Google Maps embedded */}
      <div className="border rounded-lg bg-white shadow-md overflow-hidden">
        <div className="h-[500px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0806492642723!2d110.3274781!3d-7.886631099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aff568b6c4877%3A0x1fa8698e3d8d7691!2sDinas%20Komunikasi%20dan%20Informatika%20Kabupaten%20Bantul!5e0!3m2!1sid!2sid!4v1741224991382!5m2!1sid!2sid"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
      <div className="pb-9 pt-3">
        <DashboardMenara />
      </div>
    </div>
  );
}