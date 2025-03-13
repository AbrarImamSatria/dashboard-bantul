import { FaBroadcastTower, FaBriefcase, FaUsers, FaMountain } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <main className="max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Hero Section */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold drop-shadow-md">
            Visualisasi Data Bantul Lebih Mudah dan Terpusat
          </h1>
          <p className="mt-2 max-w-lg drop-shadow-md">
            Pusat dashboard Kabupaten Bantul dalam satu kanal
          </p>
          <input 
            type="text" 
            placeholder="Cari dashboard" 
            className="mt-4 p-2 border rounded-lg w-full max-w-md bg-white shadow-md focus:ring-2 focus:ring-gray-500 text-black" 
          />
        </section>

        {/* Statistik */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { label: "Jumlah Penduduk", value: "1.013.170" },
            { label: "Luas Wilayah (km²)", value: "506,85" },
            { label: "Kepadatan Penduduk", value: "1.998,95" }
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-bold drop-shadow-sm">{stat.value}</p>
              <p className="drop-shadow-sm">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Highlight */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Highlight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/menara.png", alt: "Menara", label: "Menara", link: "/dashboard/menara" },
              { src: "/pegawai.png", alt: "Kepegawaian", label: "Kepegawaian", link: "/dashboard/kepegawaian" },
              { src: "/penduduk.png", alt: "Kependudukan", label: "Kependudukan", link: "/dashboard/kependudukan" },
              { src: "/pariwisata.png", alt: "Pariwisata", label: "Pariwisata", link: "/dashboard/pariwisata" }
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                className="bg-white rounded-lg shadow-md overflow-hidden block hover:shadow-lg transition"
              >
                <img src={item.src} alt={item.alt} className="w-full h-32 object-cover" />
                <p className="text-center py-2 font-medium">{item.label}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Topik */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Topik</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Topik */}
            <div className="w-full md:w-1/4 flex flex-col gap-4">
              {[
                { icon: "📡", title: "Menara", link: "/dashboard/menara" },
                { icon: "💼", title: "Kepegawaian", link: "/dashboard/kepegawaian" },
                { icon: "👥", title: "Kependudukan", link: "/dashboard/kependudukan" },
                { icon: "🏔", title: "Pariwisata", link: "/dashboard/pariwisata" },
                { icon: "🔍", title: "Topik Lain", link: "/topik-lain" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-center gap-3 border border-gray-300 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg font-medium">{item.title}</span>
                </a>
              ))}
            </div>

            {/* Konten Topik */}
            <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: "📡", title: "Dashboard Menara", link: "/dashboard/menara" },
                { icon: "📊", title: "Statistik Menara", link: "/dashboard/menara/statik" },
                { icon: "📄", title: "Dokumen Menara", link: "/dokumen-menara" },
                { icon: "🗺", title: "Peta Menara", link: "/dashboard/menara/peta" },
                { icon: "💼", title: "Distribusi ASN", link: "/dashboard/kepegawaian/distribusi-asn" },
                { icon: "📈", title: "Jenis Pegawai", link: "/dashboard/kepegawaian/jenis-pegawai" },
                { icon: "🛄", title: "Jabatan ASN", link: "/jabatan-asn" },
                { icon: "🏔", title: "Dashboard Pariwisata", link: "/dashboard/pariwisata" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="mt-2 text-lg font-medium text-center">{item.title}</span>
                  <span className="text-sm text-green-600 mt-1">📊 923.479 📅 2024</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Visualisasi Peta */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Visualisasi Peta</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="inline-flex items-center bg-gray-800 text-white rounded-lg overflow-hidden">
              <div className="px-4 py-2">
                <span className="font-medium">Cari visualisasi Peta</span>
              </div>
              <button className="bg-gray-600 text-white px-4 py-2 border-l border-gray-700">
                Cari
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Kategori */}
            <div className="w-full md:w-1/3 space-y-3">
              {[
                "Kepadatan Penduduk Berdasarkan Kabupaten Bantul",
                "Angka Harapan Hidup Berdasarkan Kabupaten Bantul",
                "Jumlah Rumah Sakit (RS) Berdasarkan Kabupaten Bantul",
                "Jumlah Tenaga Keperawatan Berdasarkan Kabupaten Bantul",
                "Jumlah Dokter Spesialis Berdasarkan Kabupaten Bantul",
                "Jumlah Dokter Gigi Berdasarkan Kabupaten Bantul"
              ].map((title, index) => (
                <button key={index} className="w-full bg-gray-200 text-left px-4 py-3 rounded-lg shadow">
                  {title}
                </button>
              ))}
            </div>

            {/* Peta */}
            <div className="w-full md:w-2/3">
              <div className="w-full h-[400px] bg-gray-300 rounded-lg shadow-md">
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
    </div>
  );
}