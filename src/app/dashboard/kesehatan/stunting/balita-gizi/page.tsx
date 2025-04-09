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
  CartesianGrid,
} from "recharts";
import MenuStunting from "@/components/stunting/MenuStunting";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { UserCheck, Weight, Ruler, Activity } from "lucide-react";

// Data dummy
const dataBBU = [
  { tahun: "2020", bb_kurang: 240, bb_sangat_kurang: 150, underweight: 410 },
  { tahun: "2021", bb_kurang: 220, bb_sangat_kurang: 130, underweight: 350 },
  { tahun: "2022", bb_kurang: 230, bb_sangat_kurang: 160, underweight: 410 },
  { tahun: "2023", bb_kurang: 180, bb_sangat_kurang: 170, underweight: 350 },
  { tahun: "2024", bb_kurang: 300, bb_sangat_kurang: 140, underweight: 440 },
];

const dataTBU = [
  { tahun: "2020", pendek: 380, sangat_pendek: 130 },
  { tahun: "2021", pendek: 360, sangat_pendek: 140 },
  { tahun: "2022", pendek: 390, sangat_pendek: 180 },
  { tahun: "2023", pendek: 370, sangat_pendek: 320 },
  { tahun: "2024", pendek: 400, sangat_pendek: 200 },
];

const dataBBTB = [
  { tahun: "2020", gizi_kurang: 240, gizi_buruk: 100, wasting: 340 },
  { tahun: "2021", gizi_kurang: 230, gizi_buruk: 90, wasting: 320 },
  { tahun: "2022", gizi_kurang: 260, gizi_buruk: 110, wasting: 370 },
  { tahun: "2023", gizi_kurang: 270, gizi_buruk: 140, wasting: 410 },
  { tahun: "2024", gizi_kurang: 280, gizi_buruk: 130, wasting: 410 },
];

// Tipe bar chart
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

// Komponen chart reusable
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

// Komponen detail dashboard (dari DashboardGizi)
const CombinedDetailDashboard = () => (
  <div className="max-w-6xl mx-auto p-4">
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
        <UserCheck className="text-white" size={28} />
        <div className="text-center">
          <p className="text-sm text-white">Jumlah Balita Diukur</p>
          <p className="text-2xl font-bold text-white">48.750</p>
        </div>
      </div>
      <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
        <Weight className="text-white" size={28} />
        <div className="text-center">
          <p className="text-sm text-white">Underweight (BB/U)</p>
          <p className="text-2xl font-bold text-white">14.2%</p>
        </div>
      </div>
      <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
        <Ruler className="text-white" size={28} />
        <div className="text-center">
          <p className="text-sm text-white">Stunting (TB/U)</p>
          <p className="text-2xl font-bold text-white">19.3%</p>
        </div>
      </div>
      <div className="bg-[#8FAB98] p-4 rounded-lg flex items-center justify-center gap-4">
        <Activity className="text-white" size={28} />
        <div className="text-center">
          <p className="text-sm text-white">Wasting (BB/TB)</p>
          <p className="text-2xl font-bold text-white">6.5%</p>
        </div>
      </div>
    </div>

    <Chart
      title="Status Gizi Balita Berdasarkan Berat Badan / Usia (BB/U)"
      data={dataBBU}
      bars={[
        { key: "bb_kurang", color: "#004D40", label: "BB Kurang" },
        {
          key: "bb_sangat_kurang",
          color: "#00897B",
          label: "BB Sangat Kurang",
        },
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
        { key: "gizi_kurang", color: "#004D40", label: "Gizi Kurang" },
        { key: "gizi_buruk", color: "#00897B", label: "Gizi Buruk" },
        { key: "wasting", color: "#80CBC4", label: "Wasting" },
      ]}
    />
  </div>
);

// Komponen utama yang bisa dipanggil langsung
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
