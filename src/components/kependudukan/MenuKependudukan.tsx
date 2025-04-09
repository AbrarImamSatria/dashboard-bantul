"use client";
import React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MenuKepegawaian = () => {
  const router = useRouter();
  const menuItems: { icon: React.ReactElement; label: string; path: string }[] = [
    {
      icon: <FaUsers size={24} />,
      label: "Dashboard Kependudukan",
      path: "/dashboard/kependudukan",
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

export default MenuKepegawaian;







