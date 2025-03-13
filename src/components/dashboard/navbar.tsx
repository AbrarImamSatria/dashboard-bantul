"use client";

import { useState, useEffect, useRef, RefObject } from "react";
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
    <header className="bg-gray-300 shadow-md">
      <div className="container mx-auto max-w-8xl px-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/logobantul.png"
              alt="Logo"
              className="h-auto w-auto max-h-9"
            />
          </div>
          <nav className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1"
              >
                <span>Dashboard</span>
                <FaChevronDown />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuClick}
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard/kepegawaian"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuClick}
                  >
                    Kepegawaian
                  </Link>
                  <Link
                    href="/dashboard/kependudukan"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuClick}
                  >
                    Kependudukan
                  </Link>
                  <Link
                    href="/dashboard/menara"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuClick}
                  >
                    Menara
                  </Link>
                  <Link
                    href="/dashboard/pariwisata"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuClick}
                  >
                    Pariwisata
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="text-black">
              Tentang
            </Link>
            <Link href="/login">
              <button className="border border-black px-4 py-2 rounded">
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