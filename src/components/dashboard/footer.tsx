"use client"

import React, { useState, useEffect } from 'react';
import { Youtube, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

interface VisitorCounterProps {
  targetCount: number;
  targetDecimal: number;
  duration?: number;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ targetCount, targetDecimal, duration = 3000 }) => {
  const [count, setCount] = useState<number>(0);
  const [decimalCount, setDecimalCount] = useState<number>(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * targetCount));
      setDecimalCount(Math.floor(progress * targetDecimal));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetCount, targetDecimal, duration]);
  
  return (
    <div className="text-white text-2xl font-bold">
      {count.toLocaleString()} <span className="">{decimalCount.toLocaleString()}</span>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5F7161] relative z-20 text-yellow-300 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About & Social */}
          <div>
            <h3 className="text-lg font-bold mb-1">Tentang Kami</h3>
            <p className="text-white text-sm mb-5 leading-tight">
              Dashboard Bantul adalah sistem yang menampilkan data menara telekomunikasi di Kabupaten Bantul secara komprehensif.
            </p>
            
            <h3 className="text-lg font-bold mb-1">Ikuti Kami</h3>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-yellow-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Link & Visitor Counter */}
          <div>
            <h3 className="text-lg font-bold mb-1">Link</h3>
            <p className="text-white text-sm mb-5">https://bantulkab.go.id/</p>
            
            <h3 className="text-lg font-bold mb-1">Pengunjung</h3>
            <VisitorCounter targetCount={13768980} targetDecimal={9561} duration={3000} />
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-1">Hubungi Kami</h3>
            <div className="text-white text-sm mb-5">
              <div className="flex items-start mb-2">
                <MapPin className="mt-1 mr-2 flex-shrink-0" size={16} />
                <p className="leading-tight">Jl. Robert Walter Monginsidi, Kurahan, Bantul, Kec. Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55711</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 flex-shrink-0" size={16} />
                <p>(0274) 367509 Ext 434</p>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="mr-2 flex-shrink-0" size={16} />
                <p>siziora@mail.bantulkab.go.id</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-1">Jam Operasional</h3>
            <div className="text-white text-sm">
              <p>Senin - Jumat : 08.30-15.30</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;