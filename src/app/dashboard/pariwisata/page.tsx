"use client";

import React, { useEffect, useState } from "react";
import { FaLandmark, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MenuPariwisata from "@/components/pariwisata/MenuPariwisata";
import { fetchPariwisataData } from "@/services/pariwisata/homePariwisata";

// Definisikan tipe data untuk respons API
interface ApiResponse {
  total_wisata: number;
  total_pengunjung: number;
  total_kecamatan: number;
  jumlah_wisata_perkecamatan: {
    [key: string]: number;
  };
  jenis_wisata: {
    [key: string]: number;
  };
  jumlah_pengunjung_per_tahun_berdasarkan_kategori_objek_wisata: {
    [year: string]: {
      [category: string]: number;
    };
  };
}

interface CardItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface PieDataItem {
  name: string;
  value: number;
  percentage: string;
}

interface BarDataItem {
  name: string;
  value: number;
}

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}

const PariwisataDashboard = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const apiData = await fetchPariwisataData();
      setData(apiData);
    };

    loadData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  const cardData: CardItem[] = [
    {
      label: "Total Wisata",
      value: data.total_wisata.toString(),
      icon: <FaLandmark className="text-4xl text-teal-600" />,
    },
    {
      label: "Total Pengunjung",
      value: data.total_pengunjung.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Total Kecamatan",
      value: data.total_kecamatan.toString(),
      icon: <FaMapMarkerAlt className="text-4xl text-teal-600" />,
    },
  ];

  const pieData: PieDataItem[] = Object.entries(data.jenis_wisata).map(
    ([key, value]) => ({
      name: key,
      value: value,
      percentage: ((value / data.total_wisata) * 100).toFixed(1),
    })
  );

  const barDataKecamatan: BarDataItem[] = Object.entries(
    data.jumlah_wisata_perkecamatan
  )
    .map(([key, value]) => ({
      name: key,
      value: value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const yearlyVisitorData = Object.entries(
    data.jumlah_pengunjung_per_tahun_berdasarkan_kategori_objek_wisata
  ).map(([year, categories]) => ({
    name: year,
    ...categories,
  }));

  const COLORS = ["#004d40", "#26a69a", "#80cbc4", "#b2dfdb"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: LabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#000000"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={12}
        >
          {`${name} (${pieData[index].percentage}%)`}
        </text>
        <line
          x1={cx + outerRadius * 0.95 * Math.cos(-midAngle * RADIAN)}
          y1={cy + outerRadius * 0.95 * Math.sin(-midAngle * RADIAN)}
          x2={cx + outerRadius * 1.15 * Math.cos(-midAngle * RADIAN)}
          y2={cy + outerRadius * 1.15 * Math.sin(-midAngle * RADIAN)}
          stroke="#000000"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center justify-center h-24"
          >
            <div className="flex items-center justify-center">
              <div className="mr-3">{item.icon}</div>
              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-600 text-center">
                  {item.label}
                </div>
                <div className="text-xl font-bold text-center">
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row: Bar Chart and Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart: Jumlah Wisata Per-Kecamatan */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Jumlah Wisata Per-Kecamatan (2024)
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={barDataKecamatan}
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 40]} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={90}
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#26a69a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Jenis Wisata */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">Jenis Wisata</h2>
          <div className="w-full h-64 flex justify-center">
            <PieChart width={450} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                labelLine={true}
                label={renderCustomizedLabel}
                startAngle={110}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex justify-center space-x-6 mt-20">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-xs">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Yearly Stacked Bar Chart */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Jumlah Pengunjung Per Tahun Berdasarkan Kategori Objek Wisata
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearlyVisitorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              stackOffset="sign"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(tick) => `${tick / 1000}k`} />
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number") {
                    return new Intl.NumberFormat("id-ID").format(value);
                  }
                  return value;
                }}
              />
              <Legend />
              <Bar dataKey="Alam" stackId="a" fill="#004d40" />
              <Bar dataKey="Budaya" stackId="a" fill="#26a69a" />
              <Bar dataKey="Sejarah" stackId="a" fill="#80cbc4" />
              <Bar dataKey="Religi" stackId="a" fill="#b2dfdb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default function PariwisataPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuPariwisata />
      <div className="pb-9 pt-3">
        <PariwisataDashboard />
      </div>
    </div>
  );
}
