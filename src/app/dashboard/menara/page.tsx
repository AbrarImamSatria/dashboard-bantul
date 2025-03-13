"use client";
import React, { useState } from "react";
import { FaChartBar, FaMap } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/dashboard/breadcrumb";

const JudulHalaman = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Detail Statistik Menara
      </h1>
    </div>
  );
};

// Menu Navigation Component
const MenuMenara = () => {
  const router = useRouter();
  const menuItems = [
    {
      icon: <FaChartBar size={24} />,
      label: "Statik",
      path: "/dashboard/menara/statik",
    },
    {
      icon: <FaMap size={24} />,
      label: "Peta",
      path: "/dashboard/menara/peta",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-3 space-x-8">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-black space-x-2 cursor-pointer"
          onClick={() => handleNavigation(item.path)}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Tower Location Map Component
const TowerLocationMap = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [locationInfo, setLocationInfo] = useState({
    kelurahan: "",
    tipeKelurahan: "",
    ketinggianMenara: "",
  });
  const [klasifikasiMenara, setKlasifikasiMenara] = useState("");
  const [tipeMenara, setTipeMenara] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCoordinates({
      ...coordinates,
      [id]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === "klasifikasi-menara") {
      setKlasifikasiMenara(value);
    } else if (id === "tipe-menara") {
      setTipeMenara(value);
    }
  };

  const checkCoordinates = () => {
    // This would normally call an API to get location data
    // For demonstration, we'll just set some example values
    setLocationInfo({
      kelurahan: "Bantul",
      tipeKelurahan: "Perkotaan",
      ketinggianMenara: "42",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div>
          <h2 className="text-lg font-bold mb-2">Pilih Koordinasi Peta</h2>
          <p className="text-sm mb-4">
            Silahkan masukan koordinat lokasi menara melalui form dibawah,
            kemudian klik tombol Cek Koordinat.
          </p>

          <div className="mb-4">
            <label className="block text-green-700 mb-1" htmlFor="latitude">
              Latitude :
            </label>
            <div className="relative">
              <input
                type="text"
                id="latitude"
                placeholder="Contoh : -7.899253"
                className="w-full border rounded p-2 pr-10 text-base"
                value={coordinates.latitude}
                onChange={handleInputChange}
              />
              <button className="absolute right-2 top-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-green-700 mb-1" htmlFor="longitude">
              Longitude:
            </label>
            <div className="relative">
              <input
                type="text"
                id="longitude"
                placeholder="Contoh : 110.341364"
                className="w-full border rounded p-2 pr-10 text-base"
                value={coordinates.longitude}
                onChange={handleInputChange}
              />
              <button className="absolute right-2 top-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            className="bg-green-600 text-white rounded px-6 py-3 text-base font-medium w-full mb-6"
            onClick={checkCoordinates}
          >
            Cek Koordinat
          </button>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="kelurahan">
              Kelurahan:
            </label>
            <input
              type="text"
              id="kelurahan"
              className="w-full border rounded p-3 bg-gray-100"
              value={locationInfo.kelurahan}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="tipe-kelurahan">
              Tipe Kelurahan:
            </label>
            <input
              type="text"
              id="tipe-kelurahan"
              className="w-full border rounded p-2 bg-gray-100"
              value={locationInfo.tipeKelurahan}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="klasifikasi-menara">
              Klasifikasi Menara:
            </label>
            <div className="relative">
              <select
                className="w-full border rounded p-2 appearance-none"
                id="klasifikasi-menara"
                value={klasifikasiMenara}
                onChange={handleSelectChange}
              >
                <option>Silahkan Pilih</option>
                <option>Menara Tunggal</option>
                <option>Menara Bersama</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="tipe-menara">
              Tipe Menara:
            </label>
            <div className="relative">
              <select
                className="w-full border rounded p-2 appearance-none"
                id="tipe-menara"
                value={tipeMenara}
                onChange={handleSelectChange}
              >
                <option>Silahkan Pilih</option>
                <option>Greenfield</option>
                <option>Rooftop</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="ketinggian-menara">
              Ketinggian Maksimal Menara (meter):
            </label>
            <input
              type="text"
              id="ketinggian-menara"
              className="w-full border rounded p-2 bg-gray-100"
              value={locationInfo.ketinggianMenara}
              readOnly
            />
          </div>
        </div>

        {/* Right column */}
        <div>
          <h2 className="text-lg font-bold mb-2">Peta</h2>
          <p className="text-sm mb-4">
            Lokasi Dinas Komunikasi dan Informatika Bantul. Silahkan sematkan
            pin lokasi menara pada peta atau dengan cara masukkan koordinat
            lokasi menara pada{" "}
            <span className="text-blue-600 font-semibold">Form Koordinat</span>,
            kemudian klik tombol Cek Koordinat untuk mengetahui rincian menara
            yang dapat dibangun.
          </p>

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

          <div className="border-t pt-4 mt-4">
            <h3 className="text-green-600 font-semibold mb-2">
              Menara Terdekat
            </h3>
            <p className="text-sm">
              Berikut adalah daftar menara terdekat dengan jarak 1000 meter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function HalamanMenara() {
  const [activePage, setActivePage] = useState("peta");

  // Import your breadcrumb component here
  // Assuming you already have this component ready
  // import Breadcrumb from 'path-to-your-breadcrumb-component';

  const renderContent = () => {
    switch (activePage) {
      case "statik":
        return <div className="p-4">Halaman Statik Menara</div>;
      case "peta":
      default:
        return <TowerLocationMap />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuMenara />
      <div className="max-w-6xl mx-auto pt-3">
        <Breadcrumb />
        <JudulHalaman />
      </div>
      {renderContent()}
    </div>
  );
}
