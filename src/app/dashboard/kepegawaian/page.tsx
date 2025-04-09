"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaChartPie } from "react-icons/fa";
import { getHomeKepegawaianData } from "@/services/kepegawaian/homeKepegawaian.js";
import MenuKepegawaian from "@/components/kepegawaian/MenuKepegawaian";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Interface untuk props komponen
interface BarChartCardProps {
  data: any[];
  title: string;
  yMax: number;
  ticks: number[];
}

interface GenderData {
  pns: {
    laki_laki: number;
    perempuan: number;
  };
  pppk: {
    laki_laki: number;
    perempuan: number;
  };
}

interface GenderDistributionCardProps {
  data: any[];
  genderData: GenderData;
  yMax: number;
  ticks: number[];
}

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

interface PieChartCardProps {
  data: DataItem[];
  colors: string[];
}

interface CardItem {
  label: string;
  value: string;
  icon: React.ReactElement;
}

interface DashboardCardsProps {
  cardData: CardItem[];
}

// Komponen BarChartCard
const BarChartCard = ({ data, title, yMax, ticks }: BarChartCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-[#F7F7F3] shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full flex justify-center mt-11">
        <RechartsBarChart
          width={310}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={120}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, yMax]}
            ticks={ticks}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Bar dataKey="ASN saat ini" fill="#80cbc4" />
          <Bar dataKey="Total Kebutuhan" fill="#004d40" />
        </RechartsBarChart>
      </div>
      <div className="flex justify-center space-x-16 mt-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#80cbc4" }}
          />
          <span className="text-sm">ASN saat ini</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#004d40" }}
          />
          <span className="text-sm">Total Kebutuhan</span>
        </div>
      </div>
    </div>
  );
};

// Komponen GenderDistributionCard
const GenderDistributionCard = ({
  data,
  genderData,
  yMax,
  ticks,
}: GenderDistributionCardProps) => {
  const pnsTotal = genderData.pns.perempuan + genderData.pns.laki_laki;
  const pppkTotal = genderData.pppk.perempuan + genderData.pppk.laki_laki;

  const pnsMalePercent = ((genderData.pns.laki_laki / pnsTotal) * 100).toFixed(2);
  const pnsFemalePercent = ((genderData.pns.perempuan / pnsTotal) * 100).toFixed(2);
  const pppkMalePercent = ((genderData.pppk.laki_laki / pppkTotal) * 100).toFixed(2);
  const pppkFemalePercent = ((genderData.pppk.perempuan / pppkTotal) * 100).toFixed(2);

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-[#F7F7F3] shadow-md">
      <h2 className="text-xl font-bold mb-4 text-left">
        Distribusi ASN Berdasarkan Jenis Kelamin
      </h2>
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5">
          <RechartsBarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, yMax]} ticks={ticks} />
            <Tooltip />
            <Bar dataKey="Perempuan" fill="#80cbc4" />
            <Bar dataKey="Laki-laki" fill="#004d40" />
          </RechartsBarChart>
        </div>
        <div className="w-full md:w-2/5 pl-4 flex flex-col gap-4">
          <div className="flex items-center mb-2 justify-center">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 rounded-full bg-teal-400 mr-2"></div>
              <span className="text-sm text-center">Perempuan</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-teal-800 mr-2"></div>
              <span className="text-sm text-center">Laki-laki</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-md p-3 w-3/4 mx-auto">
            <div className="font-bold">PNS</div>
            <div className="text-sm">
              Laki-laki: {genderData.pns.laki_laki.toLocaleString()} ({pnsMalePercent}%)
            </div>
            <div className="text-sm">
              Perempuan: {genderData.pns.perempuan.toLocaleString()} ({pnsFemalePercent}%)
            </div>
            <div className="text-sm">Total: {pnsTotal.toLocaleString()}</div>
          </div>
          <div className="bg-gray-100 rounded-md p-3 w-3/4 mx-auto">
            <div className="font-bold">PPPK</div>
            <div className="text-sm">
              Laki-laki: {genderData.pppk.laki_laki.toLocaleString()} ({pppkMalePercent}%)
            </div>
            <div className="text-sm">
              Perempuan: {genderData.pppk.perempuan.toLocaleString()} ({pppkFemalePercent}%)
            </div>
            <div className="text-sm">Total: {pppkTotal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen PieChartCard
const PieChartCard = ({ data, colors }: PieChartCardProps) => {
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
          {`${name} (${data[index].percentage}%)`}
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
    <div className="border border-gray-200 rounded-lg p-6 bg-[#F7F7F3] shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-center">
        Perbandingan PNS dan PPPK
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

// Komponen DashboardCards
const DashboardCards = ({ cardData }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((item) => (
        <div
          key={item.label}
          className="border border-gray-200 rounded-lg p-4 bg-[#8FAB98] shadow-md flex flex-col items-center justify-center h-24"
        >
          <div className="flex items-center justify-center">
            <div className="mr-3">{item.icon}</div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-white text-center">
                {item.label}
              </div>
              <div className="text-xl text-white font-bold text-center">
                {item.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Komponen CombinedDashboard
const CombinedDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getHomeKepegawaianData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal mengambil data dari API");
        setLoading(false);
        console.error(err);
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

  if (error || !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error || "Data tidak tersedia"}
        </div>
      </div>
    );
  }

  const pieData = [
    { name: "PNS", value: dashboardData.jumlah_pns },
    { name: "PPPK", value: dashboardData.jumlah_pppk },
  ];

  const total = pieData.reduce((acc, item) => acc + item.value, 0);
  const formattedPieData = pieData.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  const barData = [
    {
      name: "Perbandingan Jumlah ASN",
      "ASN saat ini": dashboardData.perbandingan_kebutuhan_dan_aktual_asn.aktual,
      "Total Kebutuhan": dashboardData.perbandingan_kebutuhan_dan_aktual_asn.kebutuhan,
    },
  ];

  const genderData = [
    {
      name: "PNS",
      Perempuan: dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.perempuan,
      "Laki-laki": dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.laki_laki,
    },
    {
      name: "PPPK",
      Perempuan: dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.perempuan,
      "Laki-laki": dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.laki_laki,
    },
  ];

  const cardData = [
    {
      label: "Total ASN",
      value: dashboardData.total_asn.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
    {
      label: "Jumlah PNS",
      value: dashboardData.jumlah_pns.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
    {
      label: "Jumlah PPPK",
      value: dashboardData.jumlah_pppk.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
    {
      label: "Kebutuhan ASN",
      value: dashboardData.kebutuhan_asn.toLocaleString(),
      icon: <FaUsers className="text-4xl text-white" />,
    },
  ];

  const genderYMax =
    Math.max(
      dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.perempuan,
      dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pns.laki_laki,
      dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.perempuan,
      dashboardData.distribusi_asn_berdasarkan_jenis_kelamin.pppk.laki_laki
    ) * 1.2;

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      <DashboardCards cardData={cardData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PieChartCard data={formattedPieData} colors={["#004d40", "#80cbc4"]} />
        <BarChartCard
          data={barData}
          title="Perbandingan Kebutuhan dan Aktual ASN"
          yMax={Math.ceil(dashboardData.kebutuhan_asn / 1000) * 1000}
          ticks={[0, 2500, 5000, 7500, 10000]}
        />
      </div>
      <GenderDistributionCard
        data={genderData}
        genderData={dashboardData.distribusi_asn_berdasarkan_jenis_kelamin}
        yMax={genderYMax}
        ticks={[0, 500, 1000, 1500, 2000]}
      />
    </div>
  );
};

// Komponen ASNPage
export default function ASNPage() {
  return (
    <div className=" min-h-screen bg-[#F7F7F3]">
      <MenuKepegawaian />
      <div className="pb-9 pt-3">
        <CombinedDashboard />
      </div>
    </div>
  );
}