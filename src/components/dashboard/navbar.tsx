"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Tutup dropdown ketika menu diklik
  const handleMenuClick = () => {
    setIsOpen(false);
  };

  // Tutup dropdown ketika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
              src="https://diskominfo.bantulkab.go.id/assets/Site/img/logo-font-white.png"
              alt="Logo"
              className="h-auto w-auto max-h-9"
            />
          </div>
          <nav className="flex items-center space-x-4 relative z-30">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-white"
              >
                <span>Dashboard</span>
                <FaChevronDown className={`ml-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              {isOpen && (
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
            <Link href="/login" onClick={handleMenuClick}>
              <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#5F7161] transition-colors">
                Masuk
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;