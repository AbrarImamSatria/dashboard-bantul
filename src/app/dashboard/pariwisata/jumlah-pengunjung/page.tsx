"use client";
import React, { useEffect, useState } from "react";
import MenuPariwisata from "@/components/pariwisata/MenuPariwisata";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getJumlahPengunjung } from "@/services/pariwisata/jumlahPengunjung";

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Detail Jumlah Pengunjung
      </h1>
    </div>
  );
};

interface PengunjungTahunan {
  tahun: string;
  Alam: number;
  Budaya: number;
  Sejarah: number;
  Religi: number;
  name: string;
}

interface DistribusiTahunan {
  tahun: string;
  "Wisatawan Nusantara": number;
  "Wisatawan Mancanegara": number;
  name: string;
}

interface DistribusiBulanan {
  bulan: string;
  "Wisatawan Nusantara": number;
  "Wisatawan Mancanegara": number;
  name: string;
}

interface ObjekWisata {
  nama: string;
  pengunjung: number;
}

const DashboardPariwisata = () => {
  const [dataPengunjungTahunan, setDataPengunjungTahunan] = useState<
    PengunjungTahunan[]
  >([]);
  const [dataDistribusiTahunan, setDataDistribusiTahunan] = useState<
    DistribusiTahunan[]
  >([]);
  const [dataDistribusiBulanan, setDataDistribusiBulanan] = useState<
    DistribusiBulanan[]
  >([]);
  const [dataObjekWisata, setDataObjekWisata] = useState<ObjekWisata[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPengunjung, setMaxPengunjung] = useState(25000); // Default max value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJumlahPengunjung();

        // Format data untuk grafik pengunjung per tahun berdasarkan kategori
        const formattedDataPengunjungTahunan: PengunjungTahunan[] = Object.keys(
          data.jumlah_pengunjung_per_tahun_berdasarkan_kategori_objek_wisata
        ).map((tahun) => ({
          tahun,
          ...data.jumlah_pengunjung_per_tahun_berdasarkan_kategori_objek_wisata[
            tahun
          ],
          name: tahun,
        }));
        setDataPengunjungTahunan(formattedDataPengunjungTahunan);

        // Format data untuk distribusi pengunjung per tahun
        const formattedDataDistribusiTahunan: DistribusiTahunan[] = Object.keys(
          data.distribusi_pengunjung_per_tahun_berdasarkan_asal
        ).map((tahun) => ({
          tahun,
          ...data.distribusi_pengunjung_per_tahun_berdasarkan_asal[tahun],
          name: tahun,
        }));
        setDataDistribusiTahunan(formattedDataDistribusiTahunan);

        // Format data untuk distribusi pengunjung per bulan
        const formattedDataDistribusiBulanan: DistribusiBulanan[] = Object.keys(
          data.distribusi_pengunjung_per_bulan_berdasarkan_asal["2023"]
        ).map((bulan) => ({
          bulan,
          ...data.distribusi_pengunjung_per_bulan_berdasarkan_asal["2023"][
            bulan
          ],
          name: bulan,
        }));
        setDataDistribusiBulanan(formattedDataDistribusiBulanan);

        // Format data untuk objek wisata
        const formattedDataObjekWisata: ObjekWisata[] =
          data.jumlah_pengunjung_objek_wisata_bantul.map((wisata: any) => ({
            nama: wisata.nama,
            pengunjung: wisata.jumlah_pengunjung["2023"],
          }));
        setDataObjekWisata(formattedDataObjekWisata);

        // Menentukan nilai maksimum pengunjung secara dinamis
        const maxVisitors = Math.max(
          ...formattedDataObjekWisata.map((item) => item.pengunjung)
        );
        // Bulatkan ke atas ke 10000 terdekat dan tambahkan margin 10%
        const roundedMax = Math.ceil((maxVisitors * 1.1) / 10000) * 10000;
        setMaxPengunjung(roundedMax);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi format sumbu Y
  const formatSumbuYJuta = (nilai: number): string => {
    if (nilai === 0) return "0 juta";
    if (nilai === 2000) return "2 juta";
    if (nilai === 4000) return "4 juta";
    if (nilai === 6000) return "6 juta";
    if (nilai === 8000) return "8 juta";
    return nilai.toString();
  };

  const formatSumbuYDistribusi = (nilai: number): string => {
    if (nilai === 0) return "0";
    if (nilai === 2.5) return "2.5";
    if (nilai === 5.0) return "5.0";
    if (nilai === 7.5) return "7.5";
    if (nilai === 10.0) return "10.0";
    return nilai.toString();
  };

  const formatSumbuYBulanan = (nilai: number): string => {
    if (nilai === 0) return "0";
    if (nilai === 2) return "2";
    if (nilai === 4) return "4";
    if (nilai === 6) return "6";
    return nilai.toString();
  };

  // Format sumbu X untuk jumlah pengunjung objek wisata
  const formatSumbuXObjekWisata = (nilai: number): string => {
    if (nilai === 0) return "0";
    if (nilai >= 1000) return `${nilai / 1000}k`;
    return nilai.toString();
  };

  // Fungsi untuk memendekkan label jika terlalu panjang
  const shortenLabel = (label: string): string => {
    // Jika label lebih dari 35 karakter, potong dan tambahkan elipsis
    if (label.length > 35) {
      return label.substring(0, 32) + "...";
    }
    return label;
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
      {/* Grafik 1: Jumlah Pengunjung Per Tahun Berdasarkan Kategori */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">
          Jumlah Pengunjung Per Tahun Berdasarkan Kategori Objek Wisata
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataPengunjungTahunan}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barSize={100}
              barGap={0}
              barCategoryGap="10%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatSumbuYJuta} domain={[0, 9000]} />
              <Tooltip
                formatter={(nilai: number) => [`${nilai} ribu pengunjung`]}
                labelFormatter={(nilai: string) => `Tahun ${nilai}`}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="Alam" name="Alam" stackId="a" fill="#004D40" />
              <Bar dataKey="Budaya" name="Budaya" stackId="a" fill="#00897B" />
              <Bar
                dataKey="Sejarah"
                name="Sejarah"
                stackId="a"
                fill="#80CBC4"
              />
              <Bar dataKey="Religi" name="Religi" stackId="a" fill="#E0F2F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grafik 2 & 3: Distribusi Pengunjung */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribusi Tahunan */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">
            Distribusi Pengunjung Per Tahun Berdasarkan Asal
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataDistribusiTahunan}
                margin={{ top: 20, right: 40, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={formatSumbuYDistribusi}
                  domain={[0, 10]}
                />
                <Tooltip
                  formatter={(nilai: number) => [`${nilai} juta pengunjung`]}
                  labelFormatter={(nilai: string) => `Tahun ${nilai}`}
                />
                <Legend
                  layout="horizontal"
                  align="right"
                  wrapperStyle={{
                    paddingRight: "20px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Wisatawan Nusantara"
                  name="Wisatawan Nusantara"
                  stroke="#006064"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="Wisatawan Mancanegara"
                  name="Wisatawan Mancanegara"
                  stroke="#80DEEA"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribusi Bulanan */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">
            Distribusi Pengunjung Per Bulan Berdasarkan Asal
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataDistribusiBulanan}
                margin={{ top: 20, right: 40, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatSumbuYBulanan} domain={[0, 6]} />
                <Tooltip
                  formatter={(nilai: number) => [`${nilai} juta pengunjung`]}
                  labelFormatter={(nilai: string) => `Bulan ${nilai}`}
                />
                <Legend
                  layout="horizontal"
                  align="right"
                  wrapperStyle={{
                    paddingRight: "20px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Wisatawan Nusantara"
                  name="Wisatawan Nusantara"
                  stroke="#006064"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="Wisatawan Mancanegara"
                  name="Wisatawan Mancanegara"
                  stroke="#80DEEA"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grafik 4: Jumlah Pengunjung Objek Wisata */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">
          Jumlah Pengunjung Objek Wisata
        </h2>
        <div className="h-auto">
          <ResponsiveContainer
            width="100%"
            height={dataObjekWisata.length * 40 + 80}
          >
            <BarChart
              layout="vertical"
              data={dataObjekWisata}
              margin={{ top: 10, right: 40, left: 10, bottom: 20 }}
              barSize={35}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                domain={[0, maxPengunjung]}
                tickFormatter={formatSumbuXObjekWisata}
                tickCount={6}
                width={120}
                label={{
                  value: "Jumlah Pengunjung",
                  position: "bottom",
                  offset: 0,
                }}
              />
              <YAxis
                type="category"
                dataKey="nama"
                tick={(props) => {
                  const { x, y, payload } = props;
                  const shortenedLabel = shortenLabel(payload.value);
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={4}
                        textAnchor="end"
                        fill="#666"
                        style={{
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {shortenedLabel}
                      </text>
                    </g>
                  );
                }}
                width={180}
                interval={0}
              />
              <Tooltip
                formatter={(nilai: number) => [
                  `${nilai.toLocaleString()} pengunjung`,
                  "Jumlah Pengunjung",
                ]}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Bar
                dataKey="pengunjung"
                fill="#00695C"
                radius={[0, 4, 4, 0]}
                label={{
                  position: "right",
                  formatter: (value: number) => value.toLocaleString(),
                  fill: "#333",
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default function JumlahPengunjungPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuPariwisata />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb />
        <JudulHalaman />
      </div>
      <div className="pb-9">
        <DashboardPariwisata />
      </div>
    </div>
  );
}
