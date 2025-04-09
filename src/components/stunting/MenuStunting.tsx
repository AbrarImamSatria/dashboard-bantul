"use client";
import React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const MenuStunting = () => {
  const router = useRouter();
  const menuItems: { icon: ReactElement; label: string; path: string }[] = [
    {
      icon: <FaChartPie size={24} />,
      label: "Prevalensi Balita Stunting",
      path: "/dashboard/kesehatan/stunting/balita-stunting",
    },
    {
      icon: <FaUsers size={24} />,
      label: "Prevalensi Balita Bermasalah Gizi",
      path: "/dashboard/kesehatan/stunting/balita-gizi",
    },
    {
      icon: <FaChartPie size={24} />,
      label: "Hasil Pengukuran Balita",
      path: "/dashboard/kesehatan/stunting/pengukuran-balita",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex justify-center bg-[#6D8B74] p-3 space-x-8">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-white space-x-2 cursor-pointer"
          onClick={() => handleNavigation(item.path)}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuStunting;
