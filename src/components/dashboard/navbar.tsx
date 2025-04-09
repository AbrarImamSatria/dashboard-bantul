"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image'

const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const loginRef = useRef<HTMLDivElement | null>(null);

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  
  // Tutup dropdown ketika menu diklik
  const handleMenuClick = () => {
    setIsDashboardOpen(false);
    setIsLoginOpen(false);
  };

  // Tutup dropdown ketika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target as Node)) {
        setIsDashboardOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#5F7161] shadow-md relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/image.png"
              alt="Logo"
              className="h-auto w-auto max-h-20"
            />
            <div className="ml-2">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <h1 className="text-2xl font-bold text-white">Bantul</h1>
            </div>
          </div>
          <nav className="flex items-center space-x-4 relative z-30">
            <div className="relative" ref={dashboardRef}>
              <button
                onClick={toggleDashboard}
                className="flex items-center space-x-1 text-white"
              >
                <span>Dashboard</span>
                <FaChevronDown className={`ml-1 transition-transform duration-200 ${isDashboardOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              {isDashboardOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-xl z-40"
                  style={{
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard/kepegawaian"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Kepegawaian
                  </Link>
                  <Link
                    href="/dashboard/kependudukan"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Kependudukan
                  </Link>
                  <Link
                    href="/dashboard/menara"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Menara
                  </Link>
                  <Link
                    href="/dashboard/pariwisata"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Pariwisata
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="text-white" onClick={handleMenuClick}>
              Tentang
            </Link>
            <div className="relative" ref={loginRef}>
              <button
                onClick={toggleLogin}
                className="flex items-center space-x-1 border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#5F7161] transition-colors"
              >
                <span>Masuk</span>
                <FaChevronDown className={`ml-1 transition-transform duration-200 ${isLoginOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Login dropdown menu */}
              {isLoginOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-xl z-40"
                  style={{
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Link
                    href="/dashboard/auth/admin"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Admin
                  </Link>
                  <Link
                    href="/dashboard/auth/executive"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={handleMenuClick}
                  >
                    Executive
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;