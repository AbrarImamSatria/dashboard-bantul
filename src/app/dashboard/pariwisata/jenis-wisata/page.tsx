"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MenuPariwisata from "@/components/pariwisata/MenuPariwisata";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { fetchJenisWisataData } from "@/services/pariwisata/jenisWisata";

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">Detail Jenis Wisata</h1>
    </div>
  );
};
// Interface untuk custom label props
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

// Interface untuk data pie chart
interface PieDataItem {
  name: string;
  value: number;
  percentage: string;
}

// Interface untuk data bar chart
interface BarDataItem {
  name: string;
  value: number;
}

// Interface untuk data performa wisata
interface PerformaDataItem {
  name: string;
  value: number;
  days?: number;
}

// Interface untuk custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
  isRating?: boolean;
}

const JenisWisataDashboard = () => {
  const [satisfactionData, setSatisfactionData] = useState<BarDataItem[]>([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [ratingData, setRatingData] = useState<PerformaDataItem[]>([]);
  const [durasiData, setDurasiData] = useState<PerformaDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJenisWisataData();
        const jenisWisata = data.data.jenis_wisata;

        // Transform data for satisfaction chart
        const satisfactionData = Object.keys(jenisWisata).map((key) => ({
          name: key,
          value: jenisWisata[key].jumlah,
        }));
        setSatisfactionData(satisfactionData);

        // Transform data for pie chart
        const pieData = Object.keys(jenisWisata).map((key) => ({
          name: key,
          value: jenisWisata[key].jumlah,
          percentage: ((jenisWisata[key].jumlah / 50) * 100).toFixed(1), // Assuming total is 50 for percentage calculation
        }));
        setPieData(pieData);

        // Transform data for rating chart
        const ratingData = Object.keys(jenisWisata).map((key) => ({
          name: key,
          value: jenisWisata[key].rating_kepuasan * 20, // Assuming rating is out of 5, scaled to 100
        }));
        setRatingData(ratingData);

        // Transform data for duration chart
        const durasiData = Object.keys(jenisWisata).map((key) => ({
          name: key,
          value: jenisWisata[key].rata_rata_lama_kunjungan.durasi,
          days: jenisWisata[key].rata_rata_lama_kunjungan.durasi * 7, // Convert days to weeks
        }));
        setDurasiData(durasiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#004d40", "#26a69a", "#80cbc4", "#b2dfdb"];

  // Custom PieChart label renderer dengan tipe yang jelas
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

  // Format untuk label bar pada durasi kunjungan
  const renderDurationLabel = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = durasiData[index];

    return (
      <text
        x={x + width + 5}
        y={y + height / 2}
        fill="#666"
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={12}
      >
        {item.days} hari
      </text>
    );
  };

  // Format untuk label bar pada rating
  const renderRatingLabel = (props: any) => {
    const { x, y, width, height, value } = props;

    return (
      <text
        x={x + width + 5}
        y={y + height / 2}
        fill="#666"
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  // Custom tooltip untuk chart performa
  const CustomTooltip = ({
    active,
    payload,
    label,
    isRating,
  }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-sm">
          <p className="font-medium">{label}</p>
          {isRating ? (
            <p>
              Rating: <span className="font-medium">{payload[0].value}</span>
            </p>
          ) : (
            <>
              <p>
                Durasi:{" "}
                <span className="font-medium">{payload[0].value} minggu</span>
              </p>
              <p>
                Hari:{" "}
                <span className="font-medium">
                  {durasiData.find((item) => item.name === label)?.days} hari
                </span>
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Bagian 1: Charts dari file pertama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jenis Wisata Pie Chart - Sebelah kiri */}
        <div className="border rounded-lg p-4 bg-[#DDE5DC] shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">Jenis Wisata</h2>
          <div className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
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
                  startAngle={90}
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
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-2">
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

        {/* Trend Kepuasan Pelanggan Chart - Sebelah kanan */}
        <div className="border rounded-lg p-4 bg-[#DDE5DC] shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">
            Trend Kepuasan Pelanggan
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={satisfactionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 400]} tickFormatter={(tick) => `${tick}`} />
                <Tooltip
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return new Intl.NumberFormat("id-ID").format(value);
                    }
                    return value;
                  }}
                />
                <Bar dataKey="value" fill="#5CCDC9" name="Skor Kepuasan" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bagian 2: Performa Jenis Wisata */}
      <div className="border rounded-lg p-4 bg-[#DDE5DC] shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">
          Performa Jenis Wisata
        </h2>

        {/* Rating Kepuasan Pengunjung Chart */}
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2">
            Rating Kepuasan Pengunjung
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={ratingData}
                margin={{ top: 10, right: 50, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" domain={[0, 60]} tickCount={7} />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  fontSize={14}
                />
                <Tooltip
                  content={<CustomTooltip isRating={true} />}
                  cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                />
                <Bar
                  dataKey="value"
                  fill="#006766"
                  barSize={45}
                  label={renderRatingLabel}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rata-rata Lama Kunjungan Chart */}
        <div>
          <h3 className="text-base font-medium mb-2">
            Rata-rata Lama Kunjungan (Hari)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={durasiData}
                margin={{ top: 10, right: 50, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" domain={[0, 3]} tickCount={7} />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  fontSize={14}
                />
                <Tooltip
                  content={<CustomTooltip isRating={false} />}
                  cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                />
                <Bar
                  dataKey="value"
                  fill="#006766"
                  barSize={45}
                  label={renderDurationLabel}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-sm font-medium text-center mt-3 text-gray-600">
            Rata-rata Minggu
          </div>
        </div>
      </div>
    </div>
  );
};

export default function JenisWisataPage() {
  return (
    <div className="bg-[#F7F7F3] min-h-screen">
      <MenuPariwisata />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb />
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <JenisWisataDashboard />
      </div>
    </div>
  );
}
