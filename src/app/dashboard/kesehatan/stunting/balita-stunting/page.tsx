"use client";

import React from "react";
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

const data = [
  { nama: "Bambanglipuro", diukur: 85, stunting: 70, prevalensi: 50 },
  { nama: "Banguntapan", diukur: 110, stunting: 95, prevalensi: 48 },
  { nama: "Bantul", diukur: 140, stunting: 120, prevalensi: 60 },
  { nama: "Dlingo", diukur: 120, stunting: 100, prevalensi: 55 },
  { nama: "Imogiri", diukur: 100, stunting: 80, prevalensi: 40 },
  { nama: "Jetis", diukur: 80, stunting: 70, prevalensi: 35 },
  { nama: "Kasihan", diukur: 70, stunting: 60, prevalensi: 32 },
  { nama: "Kretek", diukur: 60, stunting: 50, prevalensi: 28 },
  { nama: "Pajangan", diukur: 55, stunting: 45, prevalensi: 26 },
  { nama: "Pandak", diukur: 50, stunting: 40, prevalensi: 24 },
  { nama: "Piyungan", diukur: 45, stunting: 38, prevalensi: 22 },
  { nama: "Sedayu", diukur: 40, stunting: 30, prevalensi: 20 },
  { nama: "Pundong", diukur: 35, stunting: 25, prevalensi: 18 },
];

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
}: {
  title: string;
  dataKey: string;
  label: string;
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

const CombinedDetailDashboard = () => (
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
          <p className="text-3xl font-bold">48.750</p>
        </div>
      </div>

      <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
        <BarChart3 size={32} className="text-white" />
        <div className="flex flex-col items-center">
          <p className="text-sm">Jumlah Balita Stunting</p>
          <p className="text-3xl font-bold">7.800</p>
        </div>
      </div>

      <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
        <Percent size={32} className="text-white" />
        <div className="flex flex-col items-center">
          <p className="text-sm">Prevalensi Stunting (%)</p>
          <p className="text-3xl font-bold">16.0%</p>
        </div>
      </div>
    </div>

    {/* Charts */}
    <ChartBox
      title="Jumlah Balita Diukur"
      dataKey="diukur"
      label="Jumlah Balita Diukur"
    />
    <ChartBox
      title="Jumlah Balita Stunting"
      dataKey="stunting"
      label="Jumlah Balita"
    />
    <ChartBox
      title="Prevalensi Balita Stunting"
      dataKey="prevalensi"
      label="Stunting (%)"
    />
  </div>
);

export default function HalamanASN() {
  return (
    <div className="bg-[#F7F7F3] min-h-screen">
      <MenuStunting />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb />
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <CombinedDetailDashboard />
      </div>
    </div>
  );
}
