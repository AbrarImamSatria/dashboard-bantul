'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { MapPin, TrendingUp, FileText, Building, Users, UserPlus, Mountain, BarChart2, Umbrella, Activity, Menu } from 'lucide-react';
import Link from 'next/link';

interface HighlightCard {
  id: number;
  title: string;
  image: string;
  icon: string;
  link: string;
}

interface Dimensions {
  sidebarHeight: number;
  rowHeight: number;
}

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  viewCount: string;
  year: string;
  rowHeight: number;
  link: string;
}

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    sidebarHeight: 0,
    rowHeight: 0
  });

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout | undefined;
    
    if (autoScrollEnabled && scrollContainerRef.current) {
      scrollInterval = setInterval(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        const isAtStart = container.scrollLeft <= 10;
        
        if (isAtEnd && scrollDirection === 'right') {
          setScrollDirection('left');
        } else if (isAtStart && scrollDirection === 'left') {
          setScrollDirection('right');
        }
        
        container.scrollBy({ 
          left: scrollDirection === 'right' ? 300 : -300, 
          behavior: 'smooth' 
        });
      }, 4000);
    }
    
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [autoScrollEnabled, scrollDirection]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (sidebarRef.current) {
        const totalHeight = sidebarRef.current.offsetHeight;
        const rowHeight = totalHeight / 3;
        
        setDimensions({
          sidebarHeight: totalHeight,
          rowHeight: rowHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setScrollDirection('left');
      setAutoScrollEnabled(false);
      setTimeout(() => setAutoScrollEnabled(true), 8000);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setScrollDirection('right');
      setAutoScrollEnabled(false);
      setTimeout(() => setAutoScrollEnabled(true), 8000);
    }
  };

  const highlightCards: HighlightCard[] = [
    { id: 1, title: 'Menara', image: '/images/menara.jpg', icon: "📡", link: "/dashboard/menara" },
    { id: 2, title: 'Kepegawaian', image: '/images/kepegawaian.jpg', icon: "💼", link: "/dashboard/kepegawaian" },
    { id: 3, title: 'Kependudukan', image: '/images/kependudukan.jpg', icon: "👥", link: "/dashboard/kependudukan" },
    { id: 4, title: 'Pariwisata', image: '/images/pariwisata.jpg', icon: "🏔", link: "/dashboard/pariwisata" },
    { id: 5, title: 'Kesehatan', image: '/images/kesehatan.jpg', icon: "🏥", link: "/dashboard/kesehatan/stunting/balita-stunting" },
    { id: 6, title: 'Pendidikan', image: '/images/pendidikan.jpg', icon: "🎓", link: "/dashboard/pendidikan" },
    { id: 7, title: 'Pertanian', image: '/images/pertanian.jpg', icon: "🌾", link: "/dashboard/pertanian" }
  ];

  const mapCategories: string[] = [
    "Kepadatan Penduduk Berdasarkan Kabupaten Bantul",
    "Angka Harapan Hidup Berdasarkan Kabupaten Bantul",
    "Jumlah Rumah Sakit (RS) Berdasarkan Kabupaten Bantul",
    "Jumlah Tenaga Keperawatan Berdasarkan Kabupaten Bantul",
    "Jumlah Dokter Spesialis Berdasarkan Kabupaten Bantul",
    "Jumlah Dokter Gigi Berdasarkan Kabupaten Bantul"
  ];

  return (
    <>
      {/* Hero Header Section */}
      <div className="w-full bg-[#6D8B74] text-white rounded-b-[60px] px-8 py-12 shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/2 z-10 pt-14 pb-14">
              <h1 className="text-5xl font-bold mb-2">Visualisasi Data Bantul</h1>
              <h2 className="text-5xl font-bold mb-6">Lebih Mudah dan Terpusat</h2>
              <p className="text-2xl mb-6">Pusat dashboard Kabupaten Bantul dalam satu kanal</p>
              
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white rounded-lg overflow-hidden p-1.5">
                  <div className="flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari dashboard"
                    className="flex-grow py-2 px-3 text-gray-800 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="bg-[#6D8B74] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
                  >
                    Cari
                  </button>
                </div>
              </form>
            </div>
            
            <div className="w-full md:w-1/2 z-10">
              <div className="bg-[#E8A7A700] bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-gray-800 bg-[#f8f5e9]">
                <div className="px-4 py-2 mb-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5F7161] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-[#5F7161]">Kependudukan</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-gray-300">
                  <div className="px-4 py-10">
                    <p className="text-2xl font-semibold text-[#5F7161] mb-3">Jumlah Penduduk</p>
                    <div className="flex items-end">
                      <p className="text-3xl text-[#5F7161]">1.013.170</p>
                      <p className="text-1xl text-[#5F7161] ml-1 mb-1">jiwa</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-10">
                    <p className="text-2xl font-semibold text-[#5F7161] mb-3">Luas <br />Wilayah</p>
                    <div className="flex items-end mb-10">
                      <p className="text-3xl text-[#5F7161]">506,85</p>
                      <p className="text-1xl text-[#5F7161] ml-1 mb-1">km²</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-10">
                    <p className="text-2xl font-semibold text-[#5F7161] mb-3">Kepadatan Penduduk</p>
                    <div className="flex items-end">
                      <p className="text-3xl text-[#5F7161]">1.998,95</p>
                      <p className="text-1xl text-[#5F7161] ml-1 mb-1">jiwa/km²</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 w-full">
        {/* Highlight Section */}
        <section className="w-full pt-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-[#38453A]">Highlight</h2>
            
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollRight}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
            onMouseEnter={() => setAutoScrollEnabled(false)}
            onMouseLeave={() => setAutoScrollEnabled(true)}
          >
            {highlightCards.map(card => (
              <Link 
                key={card.id}
                href={card.link}
                className="flex-shrink-0 w-72 bg-[#BFD0C1] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="h-32 overflow-hidden bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-5xl">{card.icon}</span>
                  </div>
                </div>
                <div className="p-2 text-center flex items-center justify-center">
                  <h3 className="text-lg font-medium text-[#38453A]">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </section>

        {/* Topic Section */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold text-[#38453A] mb-4">Topik</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div ref={sidebarRef} className="w-full md:w-64 flex flex-col gap-4">
              <SidebarMenuItem 
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6C17.6569 6 19 7.34315 19 9C19 10.6569 17.6569 12 16 12C14.3431 12 13 10.6569 13 9C13 7.34315 14.3431 6 16 6Z" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M16 12V16M16 16C16 16 11 15.5 8 20C5 24.5 5 26 5 26H16M16 16C16 16 21 15.5 24 20C27 24.5 27 26 27 26H16" stroke="#4A5568" strokeWidth="2"/>
                  </svg>
                }
                title="Menara"
                link="/dashboard/menara"
              />
              
              <SidebarMenuItem 
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 26H25V10H7V26Z" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M13 10V6H19V10" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M7 15H25" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M11 19H21" stroke="#4A5568" strokeWidth="2"/>
                  </svg>
                }
                title="Kepegawaian"
                link="/dashboard/kepegawaian"
              />
              
              <SidebarMenuItem 
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="10" r="4" stroke="#4A5568" strokeWidth="2"/>
                    <circle cx="20" cy="10" r="4" stroke="#4A5568" strokeWidth="2"/>
                    <circle cx="16" cy="18" r="4" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M12 24C8.68629 24 6 26.6863 6 30" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M20 24C23.3137 24 26 26.6863 26 30" stroke="#4A5568" strokeWidth="2"/>
                  </svg>
                }
                title="Kependudukan"
                link="/dashboard/kependudukan"
              />
              
              <SidebarMenuItem 
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 26L14 15L20 22L26 13" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M6 26L14 15L20 22L26 13" stroke="#4A5568" strokeWidth="2"/>
                  </svg>
                }
                title="Pariwisata"
                link="/dashboard/pariwisata"
              />
              
              <SidebarMenuItem 
                icon={
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="10" r="4" stroke="#4A5568" strokeWidth="2"/>
                    <circle cx="24" cy="18" r="3" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M21 26C21 22.6863 18.7614 20 16 20C13.2386 20 11 22.6863 11 26" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M28 18H26" stroke="#4A5568" strokeWidth="2"/>
                    <path d="M22 14L23 13" stroke="#4A5568" strokeWidth="2"/>
                  </svg>
                }
                title="Kesehatan"
                link="/dashboard/kesehatan/stunting/balita-stunting"
              />
              
              <SidebarMenuItem 
                icon={<Menu size={32} color="#4A5568" />}
                title="Topik Lain"
                link="#"
              />
            </div>
            
            <div 
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              style={{ 
                gridAutoRows: dimensions.rowHeight ? `${dimensions.rowHeight}px` : 'auto',
                minHeight: dimensions.sidebarHeight ? `${dimensions.sidebarHeight}px` : 'auto'
              }}
            >
              {/* Menara Cards */}
              <DashboardCard 
                icon={
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10C27.3137 10 30 12.6863 30 16C30 19.3137 27.3137 22 24 22C20.6863 22 18 19.3137 18 16C18 12.6863 20.6863 10 24 10Z" stroke="white" strokeWidth="2"/>
                    <path d="M24 22V30M24 30C24 30 16 29 10 38C4 47 4 48 4 48H24M24 30C24 30 32 29 38 38C44 47 44 48 44 48H24" stroke="white" strokeWidth="2"/>
                  </svg>
                }
                title="Dashboard Menara"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/menara"
              />
              
              <DashboardCard 
                icon={<TrendingUp size={48} color="white" />}
                title="Statik Menara"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/menara/statik"
              />
              
              <DashboardCard 
                icon={<MapPin size={48} color="white" />}
                title="Peta Menara"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/menara/peta"
              />
              
              {/* Kepegawaian Cards */}
              <DashboardCard 
                icon={<Building size={48} color="white" />}
                title="Dashboard Kepegawaian"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kepegawaian"
              />
              
              <DashboardCard 
                icon={
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 24C24 19.5817 27.5817 16 32 16C36.4183 16 40 19.5817 40 24C40 28.4183 36.4183 32 32 32C30.4407 32 28.9962 31.5215 27.8 30.7C25.5975 29.2293 24 26.7815 24 24Z" stroke="white" strokeWidth="2"/>
                    <path d="M32 16V12" stroke="white" strokeWidth="2"/>
                    <path d="M40 24H44" stroke="white" strokeWidth="2"/>
                    <path d="M38 16L42 12" stroke="white" strokeWidth="2"/>
                    <path d="M38 32L42 36" stroke="white" strokeWidth="2"/>
                    <path d="M32 32V36" stroke="white" strokeWidth="2"/>
                    <path d="M8 32H28" stroke="white" strokeWidth="2"/>
                    <path d="M8 24H16" stroke="white" strokeWidth="2"/>
                    <path d="M8 16H20" stroke="white" strokeWidth="2"/>
                  </svg>
                }
                title="Distribusi ASN"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kepegawaian/distribusi-asn"
              />
              
              <DashboardCard 
                icon={<Users size={48} color="white" />}
                title="Jenis Pegawai"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kepegawaian/jenis-pegawai"
              />
              
              {/* Kependudukan Card */}
              <DashboardCard 
                icon={
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="8" width="24" height="32" rx="2" stroke="white" strokeWidth="2"/>
                    <path d="M18 16H30" stroke="white" strokeWidth="2"/>
                    <path d="M18 24H30" stroke="white" strokeWidth="2"/>
                    <path d="M18 32H24" stroke="white" strokeWidth="2"/>
                  </svg>
                }
                title="Dashboard Kependudukan"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kependudukan"
              />
              
              {/* Pariwisata Cards */}
              <DashboardCard 
                icon={<Mountain size={48} color="white" />}
                title="Dashboard Pariwisata"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/pariwisata"
              />
              
              <DashboardCard 
                icon={<BarChart2 size={48} color="white" />}
                title="Distribusi Wisata"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/pariwisata/distribusi-wisata"
              />
              
              <DashboardCard 
                icon={<Umbrella size={48} color="white" />}
                title="Jenis Wisata"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/pariwisata/jenis-wisata"
              />
              
              <DashboardCard 
                icon={<Users size={48} color="white" />}
                title="Jumlah Pengunjung"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/pariwisata/jumlah-pengunjung"
              />
              
              {/* Kesehatan Cards */}
              <DashboardCard 
                icon={<Activity size={48} color="white" />}
                title="Balita Stunting"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kesehatan/stunting/balita-stunting"
              />
              
              <DashboardCard 
                icon={<UserPlus size={48} color="white" />}
                title="Balita Gizi"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kesehatan/stunting/balita-gizi"
              />
              
              <DashboardCard 
                icon={<FileText size={48} color="white" />}
                title="Pengukuran Balita"
                viewCount="923.479"
                year="2024"
                rowHeight={dimensions.rowHeight}
                link="/dashboard/kesehatan/stunting/pengukuran-balita"
              />
            </div>
          </div>
        </section>
        
        {/* Map Visualization */}
        <section className="mt-8 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#BFD0C17A] p-6 pl-40 pr-40 shadow-md">
          <h2 className="text-3xl font-semibold text-[#38453A] mb-4">Visualisasi Peta</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-3/7 space-y-6">
              <div className="w-full">
                <div className="flex items-center bg-[#6D8B74] text-white rounded-lg overflow-hidden w-full">
                  <div className="px-4 py-2 flex-grow">
                    <span className="font-medium">Cari visualisasi Peta</span>
                  </div>
                  <button className="bg-[#5F7161] text-white px-4 py-2 border-l border-[#4F6251]">
                    Cari
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 pb-5">
                {mapCategories.map((title, index) => (
                  <button 
                    key={index} 
                    className="w-full bg-[#BFD0C1] text-[#38453A] text-left px-4 py-3 rounded-lg shadow hover:bg-[#A5BEAA] transition"
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="w-full h-[410px] bg-gray-300 rounded-lg shadow-md">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.593627605082!2d110.32859167580967!3d-7.831357377170865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a56c6df0d5f5b%3A0x5027a76e356ef70!2sBantul%2C%20Kecamatan%20Bantul%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ icon, title, link }) => {
  return (
    <Link href={link} className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="text-gray-600">
        {icon}
      </div>
      <span className="text-lg font-medium text-gray-700">{title}</span>
    </Link>
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, viewCount, year, rowHeight, link }) => {
  const cardHeight = rowHeight ? rowHeight * 0.65 : 'auto';
  
  return (
    <div className="flex flex-col h-full">
      <Link 
        href={link}
        className="flex items-center justify-center bg-[#9AB5A1] rounded-lg shadow-sm hover:shadow-md transition mb-2"
        style={{ height: typeof cardHeight === 'number' ? `${cardHeight}px` : cardHeight }}
      >
        <div className="flex items-center justify-center">
          {icon}
        </div>
      </Link>
      
      <h3 className="text-black font-medium text-base mb-1">{title}</h3>
      
      <div className="flex gap-1">
        <div className="flex items-center text-xs text-gray-600 bg-gray-200 rounded-full px-2 py-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Views : {viewCount}
        </div>
        <div className="flex items-center text-xs text-gray-600 bg-gray-200 rounded-full px-2 py-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Updated : {year}
        </div>
      </div>
    </div>
  );
};