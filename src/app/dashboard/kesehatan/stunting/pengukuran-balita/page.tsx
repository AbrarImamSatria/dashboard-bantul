"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Baby, Ruler, BarChart2 } from "lucide-react";
import MenuStunting from "@/components/stunting/MenuStunting";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import {
  fetchBalitaPengukuran,
  BalitaPengukuranData,
} from "@/services/stunting/balitaPengukuran";

const COLORS_GENDER = ["#00695c", "#80cbc4"];
const COLORS_STUNTING = ["#00695c", "#80cbc4"];

const JudulHalaman = ({
  kabupaten,
  tahun,
}: {
  kabupaten: string;
  tahun: number;
}) => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Hasil Pengukuran Balita Kabupaten {kabupaten} Tahun {tahun}
      </h1>
    </div>
  );
};

const CardStat = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-[#8FAB98] text-white p-4 rounded-lg flex items-center justify-center gap-4">
    <div className="text-white">{icon}</div>
    <div className="flex flex-col items-center">
      <p className="text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const PieChartCard = ({
  title,
  data,
  colors,
}: {
  title: string;
  data: any[];
  colors: string[];
}) => (
  <div className="bg-[#DDE5DC] rounded-md shadow p-4 w-full md:w-1/2">
    <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const StuntingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F7F7F3] min-h-screen">
      <MenuStunting />
      {children}
    </div>
  );
};

const HalamanPengukuranContent = () => {
  const [data, setData] = useState<BalitaPengukuranData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchBalitaPengukuran();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
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
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  // Prepare chart data from API response
  const dataJenisKelamin = [
    {
      name: `Laki-laki (${data.data_stunting.distribusi_jenis_kelamin.laki_laki.persentase}%)`,
      value: data.data_stunting.distribusi_jenis_kelamin.laki_laki.persentase,
    },
    {
      name: `Perempuan (${data.data_stunting.distribusi_jenis_kelamin.perempuan.persentase}%)`,
      value: data.data_stunting.distribusi_jenis_kelamin.perempuan.persentase,
    },
  ];

  const dataStatusStunting = [
    {
      name: "Normal",
      value: 100 - data.data_stunting.prevalensi_stunting,
    },
    {
      name: "Terindikasi Stunting",
      value: data.data_stunting.prevalensi_stunting,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-3">
      <Breadcrumb />
      <JudulHalaman kabupaten={data.kabupaten} tahun={data.tahun} />
      <div className="pb-9 p-4">
        {/* Card Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <CardStat
            title="Jumlah Balita Diukur"
            value={data.data_stunting.jumlah_balita_diukur.toLocaleString()}
            icon={<Baby size={32} className="text-white" />}
          />
          <CardStat
            title="Balita Terindikasi Stunting"
            value={data.data_stunting.balita_terindikasi_stunting.toLocaleString()}
            icon={<Ruler size={32} className="text-white" />}
          />
          <CardStat
            title="Prevalensi Stunting (%)"
            value={`${data.data_stunting.prevalensi_stunting}%`}
            icon={<BarChart2 size={32} className="text-white" />}
          />
        </div>

        {/* Pie Charts */}
        <div className="flex flex-col md:flex-row gap-4">
          <PieChartCard
            title="Distribusi Jenis Kelamin"
            data={dataJenisKelamin}
            colors={COLORS_GENDER}
          />
          <PieChartCard
            title="Status Stunting"
            data={dataStatusStunting}
            colors={COLORS_STUNTING}
          />
        </div>
      </div>
    </div>
  );
};

const HalamanPengukuran = () => {
  return (
    <StuntingLayout>
      <HalamanPengukuranContent />
    </StuntingLayout>
  );
};

export default HalamanPengukuran;
