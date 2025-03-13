"use client";
import MenuKepegawaian from "@/components/kepegawaian/MenuKepegawaian";
import React, { useState, useEffect } from "react";
import { ReactElement } from "react";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import { fetchKepegawaianData } from "@/services/kepegawaian/jenisPegawai";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FaUsers } from "react-icons/fa";

interface CardItem {
  label: string;
  value: string;
  icon: ReactElement;
}

interface DashboardCardsProps {
  cardData: CardItem[];
  columns?: number;
}

const DashboardCards = ({ cardData, columns = 4 }: DashboardCardsProps) => {
  const gridCols = columns === 3 
    ? "grid-cols-1 sm:grid-cols-3" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-4`}>
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
  );
};


interface DetailFormasiProps {
  detailFormasi: {
    tenagaKesehatan: {
      total: number;
      keterangan: string;
    };
    tenagaTeknis: {
      total: number;
      keterangan: string;
    };
  };
}

const DetailFormasiPanel = ({ detailFormasi }: DetailFormasiProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      {/* Judul tetap di kiri */}
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Detail Formasi yang dibutuhkan
      </h3>

      {/* Konten card di tengah */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Tenaga Kesehatan
          </p>
          <p className="text-3xl font-bold mb-1">
            {detailFormasi.tenagaKesehatan.total}
          </p>
          <p className="text-xs text-gray-500">
            {detailFormasi.tenagaKesehatan.keterangan}
          </p>
        </div>
        <div className="bg-white p-4 rounded flex-1 min-w-48 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Tenaga Teknis
          </p>
          <p className="text-3xl font-bold mb-1">
            {detailFormasi.tenagaTeknis.total}
          </p>
          <p className="text-xs text-gray-500">
            {detailFormasi.tenagaTeknis.keterangan}
          </p>
        </div>
      </div>
    </div>
  );
};

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">Detail Jenis Pegawai</h1>
    </div>
  );
};

interface BarChartComparisonProps {
  data: any[];
  title: string;
  domain: number[];
  ticks: number[];
  barSize?: number;
  barDataKeys: string[];
  colors: string[];
  labels: string[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

const BarChartComparison = ({
  data,
  title,
  domain,
  ticks,
  barSize = 120,
  barDataKeys,
  colors,
  labels,
  width = 310,
  height = 250,
  margin = {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
}: BarChartComparisonProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-center mt-11">
        <RechartsBarChart
          width={width}
          height={height}
          data={data}
          margin={margin}
          barSize={barSize}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            domain={domain}
            ticks={ticks}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          {barDataKeys.map((dataKey, index) => (
            <Bar 
              key={dataKey} 
              dataKey={dataKey} 
              fill={colors[index]} 
            />
          ))}
        </RechartsBarChart>
      </div>
      <div className="flex justify-center space-x-16 mt-2">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DistribusiBarChartProps {
  data: any[];
  title: string;
  color: string;
  label: string;
  dataKey?: string;
  width?: number;
  height?: number;
}

const DistribusiBarChart = ({
  data,
  title,
  color,
  label,
  dataKey = "jumlah",
  width = 450,
  height = 280,
}: DistribusiBarChartProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-start pl-4">
        <RechartsBarChart
          width={width}
          height={height}
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 10,
            bottom: 5,
          }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar name={label} dataKey={dataKey} fill={color} />
        </RechartsBarChart>
      </div>
      <div className="flex justify-start pl-4 mt-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

interface DataItem {
  name: string;
  value: number;
  percentage: string;
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

interface PieChartComparisonProps {
  data: DataItem[];
  colors: string[];
  title: string;
}

const PieChartComparison = ({ 
  data, 
  colors, 
  title 
}: PieChartComparisonProps) => {
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
          {`${data[index].name} (${data[index].percentage}%)`}
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
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-center">
        {title}
      </h2>
      <div className="flex justify-center">
        <PieChart width={350} height={280}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            labelLine={true}
            label={renderCustomizedLabel}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex justify-center space-x-8 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm">
              {item.name}: {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const COLORS = ["#004d40", "#80cbc4"];
const HEALTH_COLORS = ["#004d40", "#26a69a", "#80cbc4", "#b2dfdb"];
const TECH_COLORS = ["#004d40", "#00796b", "#4db6ac", "#80cbc4"];

const CombinedDetailDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const apiData = await fetchKepegawaianData();
        setData(apiData);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi nanti.");
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

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Data untuk 3 card di bagian atas
  const cardData = [
    {
      label: "Total Formasi",
      value: data.summaryStats.totalFormasi.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Total ASN Saat Ini",
      value: data.summaryStats.totalASN.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
    {
      label: "Kekurangan",
      value: data.summaryStats.kekurangan.toLocaleString(),
      icon: <FaUsers className="text-4xl text-teal-600" />,
    },
  ];

  // Prepare data for PieChart
  const formattedData = data.perbandinganPNSdanPPPK.map((item: any) => ({
    ...item,
    value: Number(item.value),
  }));

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Baris pertama: Dashboard Cards (3 kartu) */}
      <DashboardCards cardData={cardData} columns={3} />

      {/* Detail Formasi Panel */}
      <DetailFormasiPanel detailFormasi={data.detailFormasi} />

      {/* Baris kedua: PieChart dan BarChart (2 kartu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk PieChart */}
        <PieChartComparison 
          data={formattedData} 
          colors={COLORS} 
          title="Perbandingan PNS dan PPPK" 
        />

        {/* Card untuk BarChart */}
        <BarChartComparison 
          data={data.perbandinganKebutuhanDanAktual}
          title="Perbandingan Kebutuhan dan Aktual ASN" 
          domain={[0, 10000]}
          ticks={[0, 2500, 5000, 7500, 10000]}
          barDataKeys={["ASN saat ini", "Total Kebutuhan"]}
          colors={["#80cbc4", "#004d40"]}
          labels={["ASN saat ini", "Total Kebutuhan"]}
        />
      </div>

      {/* Baris ketiga: 2 kartu baru untuk bar chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card untuk Distribusi Kebutuhan Tenaga Kesehatan */}
        <DistribusiBarChart 
          data={data.distribusiKebutuhanTenagaKesehatan}
          title="Distribusi Kebutuhan Tenaga Kesehatan"
          color="#004d40"
          label="Jumlah Kebutuhan"
        />

        {/* Card untuk Distribusi Kebutuhan Tenaga Teknis */}
        <DistribusiBarChart 
          data={data.distribusiKebutuhanTenagaTeknis}
          title="Distribusi Kebutuhan Tenaga Teknis"
          color="#80cbc4"
          label="Tenaga Teknis"
        />
      </div>
    </div>
  );
};

export default function HalamanASN() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuKepegawaian />
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