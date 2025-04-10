"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

// Define breadcrumb path segments and their display names
const pathMap: Record<string, string> = {
  "kepegawaian": "Kepegawaian",
  "distribusi-asn": "Distribusi ASN",
  "jenis-pegawai": "Jenis Pegawai",
  "detail": "Detail Distribusi ASN",

  "menara": "Menara",
  "peta": "Detail Peta",
  "statik": "Detail Statistik Menara",

  "pariwisata": "Pariwisata",
  "distribusi-wisata": " Detail Distribusi Wisata",
  "jenis-wisata": "Detail Jenis Wisata",
  "jumlah-pengunjung": "Detail Jumlah Pengunjung",

  "balita-gizi": "Prevalensi Balita Bermasalah Gizi",
  "balita-stunting" :"Prevalensi Balita Bermasalah Stunting"
};

const Breadcrumb = () => {
  const pathname = usePathname();
  
  const breadcrumbs = useMemo(() => {
    // Remove trailing slash and split the path
    const pathWithoutTrailingSlash = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const pathSegments = pathWithoutTrailingSlash.split('/').filter(segment => segment);
    
    // Create breadcrumb items with proper paths and display names
    const items = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const displayName = pathMap[segment] || segment;
      const isLast = index === pathSegments.length - 1;
      
      return {
        path,
        displayName,
        isLast
      };
    });
    
    return items;
  }, [pathname]);
  
  return (
    <div className="flex items-center text-sm text-gray-600 px-4 py-2">
      <Link href="/" className="flex items-center hover:text-gray-900">
        <span>Home</span>
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          <span className="mx-2">&gt;</span>
          {item.isLast ? (
            <span className="font-medium text-gray-900">{item.displayName}</span>
          ) : (
            <Link href={item.path} className="hover:text-gray-900">
              <span>{item.displayName}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;