"use client";
import React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const MenuPariwisata = () => {
  const router = useRouter();
  const menuItems: { icon: ReactElement; label: string; path: string }[] = [
    {
      icon: <FaChartPie size={24} />,
      label: "Distribusi Wisata",
      path: "/dashboard/pariwisata/distribusi-wisata",
    },
    {
      icon: <FaUsers size={24} />,
      label: "Jenis Wisata",
      path: "/dashboard/pariwisata/jenis-wisata",
    },
    {
      icon: <FaChartPie size={24} />,
      label: "Jumlah Pengunjung",
      path: "/dashboard/pariwisata/jumlah-pengunjung",
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

export default MenuPariwisata;
