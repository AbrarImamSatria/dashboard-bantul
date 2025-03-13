"use client";
import React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MenuKepegawaian = () => {
  const router = useRouter();
  const menuItems: { icon: React.ReactElement; label: string; path: string }[] = [
    {
      icon: <FaChartPie size={24} />,
      label: "Distribusi ASN",
      path: "/dashboard/kepegawaian/distribusi-asn",
    },
    {
      icon: <FaUsers size={24} />,
      label: "Jenis Pegawai",
      path: "/dashboard/kepegawaian/jenis-pegawai",
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

export default MenuKepegawaian;







