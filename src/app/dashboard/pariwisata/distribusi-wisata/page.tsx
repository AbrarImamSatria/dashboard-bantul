"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDistribusiWisata } from '@/services/pariwisata/distribusiWisata';
import MenuPariwisata from "@/components/pariwisata/MenuPariwisata";
import Breadcrumb from "@/components/dashboard/breadcrumb";

// Definisikan tipe data untuk objek di dalam state
interface DataItem {
  name: string;
  value: number;
}

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">Detail Distribusi Wisata</h1>
    </div>
  );
};

const WisataDashboard = () => {
  const [dataKecamatan, setDataKecamatan] = useState<DataItem[]>([]);
  const [dataStatus, setDataStatus] = useState<DataItem[]>([]);
  const [dataAksesibilitas, setDataAksesibilitas] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDistribusiWisata();

        // Ubah data dari API ke bentuk yang sesuai dengan tipe DataItem
        const jumlahWisataPerKecamatan: DataItem[] = Object.entries(data.data.jumlah_wisata_perkecamatan).map(([name, value]) => ({ name, value: Number(value) }));
        const jumlahWisataBerdasarkanStatus: DataItem[] = Object.entries(data.data.jumlah_wisata_berdasarkan_status).map(([name, value]) => ({ name, value: Number(value) }));
        const distribusiWisataBerdasarkanAksesibilitas: DataItem[] = Object.entries(data.data.distribusi_wisata_berdasarkan_aksesibilitas).map(([name, value]) => ({ name, value: Number(value) }));

        setDataKecamatan(jumlahWisataPerKecamatan);
        setDataStatus(jumlahWisataBerdasarkanStatus);
        setDataAksesibilitas(distribusiWisataBerdasarkanAksesibilitas);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Warna untuk pie chart
  const COLORS = ['#004d40', '#00796b', '#4db6ac', '#b2dfdb'];
  
  // Warna untuk bar chart
  const barColor = '#26a69a';
  
  // Warna untuk bar chart aksesibilitas
  const accessibilityColor = '#004d40';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 max-w-6xl mx-auto">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jumlah Wisata Per-Kecamatan */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">Jumlah Wisata Per-Kecamatan (2024)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataKecamatan}
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 40]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} interval={0} />
                <Tooltip />
                <Bar dataKey="value" fill={barColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Jumlah Wisata Berdasarkan Status */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">Jumlah Wisata Berdasarkan Status</h2>
          <div className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="top"
                  wrapperStyle={{ paddingTop: '100px' }}
                  align="right"
                  payload={
                    dataStatus.map((item, index) => ({
                      id: item.name,
                      type: 'square',
                      value: item.name,
                      color: COLORS[index % COLORS.length],
                    }))
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">Distribusi Wisata Berdasarkan Aksesibilitas</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataAksesibilitas}
              margin={{ top: 5, right: 30, left: 5, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill={accessibilityColor} />
              <Legend name="Aksesibilitas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default function DistribusiPariwisataPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuPariwisata />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb /> 
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <WisataDashboard />
      </div>
    </div>
  );
}