import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  MoreHorizontal,
  Plus,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

// Menerima props: onLogout, onNavigate, dan dataKelas (dari App.jsx)
const KelasAjar = ({ onLogout, onNavigate, dataKelas = [] }) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  // Logika Filter: Mencari kelas berdasarkan Nama Mapel atau Kode
  const filteredClasses = dataKelas.filter(cls => 
    cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* === SIDEBAR (Navigasi Kiri) === */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">
             T
           </div>
           <span className="text-lg font-bold tracking-tight text-slate-800">
             Telkom School LMS
           </span>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-4 mt-4 space-y-2">
          
          {/* Tombol ke Dashboard */}
          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          </div>

          {/* Tombol Kelas Ajar (Sedang Aktif) */}
          <div className="cursor-default">
            <NavItem icon={<BookOpen size={20}/>} label="Kelas Ajar" active />
          </div>

          {/* Menu Lain (Hiasan UI) */}
          <NavItem icon={<FileText size={20}/>} label="Input Nilai" />
          <NavItem icon={<CalendarIcon size={20}/>} label="Jadwal" />
          <NavItem icon={<Users size={20}/>} label="Data Siswa" />
          <NavItem icon={<Settings size={20}/>} label="Pengaturan" />
        </nav>

        {/* Tombol Logout */}
        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={onLogout}
            className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>


      {/* === MAIN CONTENT (Area Kanan) === */}
      <main className="flex-1 p-4 overflow-y-auto md:ml-64 md:p-8">
        
        {/* Header Atas: Judul & Profil */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Manajemen Kelas</h1>
            {/* Breadcrumb Navigasi */}
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <span 
                onClick={() => onNavigate('dashboard')} 
                className="cursor-pointer hover:text-[#7f1d1d]"
              >
                Home
              </span> 
              <ChevronRight size={12}/> 
              <span className="text-[#7f1d1d] font-bold">Kelas Ajar</span>
            </div>
          </div>

          {/* Profil Guru (Pojok Kanan Atas) */}
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white border rounded-full shadow-sm hover:bg-slate-50 border-slate-100">
              <Bell size={20} className="text-slate-600"/>
              <span className="absolute w-2 h-2 bg-red-500 border border-white rounded-full top-2 right-2"></span>
            </button>
            <div className="flex items-center gap-3 p-2 pr-4 bg-white border rounded-full shadow-sm border-slate-100">
              <img 
                src="https://img.freepik.com/free-photo/portrait-smiling-young-man-eyeglasses_171337-4842.jpg" 
                alt="Teacher" 
                className="object-cover w-10 h-10 rounded-full"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-bold leading-tight text-slate-700">Pak Budi Santoso</p>
                <p className="text-[10px] text-slate-400 font-medium">NIP. 19820312 2010</p>
              </div>
            </div>
          </div>
        </header>

        {/* Area Kontrol: Search Bar & Tombol Tambah */}
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          
          {/* Kolom Pencarian */}
          <div className="flex items-center w-full gap-3 px-4 py-3 bg-white border shadow-sm rounded-xl border-slate-100 md:w-96">
            <Search size={18} className="text-slate-400"/>
            <input 
              type="text" 
              placeholder="Cari kelas atau kode..." 
              className="w-full text-sm bg-transparent outline-none placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tombol Buat Kelas Baru -> Navigasi ke halaman form */}
          <button 
            onClick={() => onNavigate('buat-kelas')} 
            className="flex items-center gap-2 bg-[#7f1d1d] hover:bg-[#631717] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-200 transition-transform active:scale-95 w-full md:w-auto justify-center"
          >
            <Plus size={18} />
            Buat Kelas Baru
          </button>
        </div>

        {/* === LOGIKA TAMPILAN GRID KELAS === */}
        {filteredClasses.length > 0 ? (
          // JIKA ADA DATA KELAS
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClasses.map((cls) => (
              <div 
                key={cls.id} 
                className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                
                {/* Bagian Atas Kartu (Warna Warni Sesuai Tema) */}
                <div className={`h-24 bg-gradient-to-r ${cls.theme} relative p-6 flex items-start justify-between`}>
                  <div className="p-2 text-white bg-white/20 backdrop-blur-md rounded-xl">
                    <BookOpen size={20} />
                  </div>
                  <button className="transition text-white/70 hover:text-white">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Bagian Isi Kartu */}
                <div className="p-6 pt-4">
                  <div className="flex items-end justify-between mb-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {cls.code}
                     </span>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${cls.color} bg-opacity-50`}>
                        {cls.grade}
                     </span>
                  </div>
                  
                  <h3 className="mb-4 text-lg font-bold text-slate-800 line-clamp-1">
                    {cls.subject}
                  </h3>
                  
                  {/* Info Detail (Jam, Ruangan, Siswa) */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Clock size={16} className="text-slate-300"/>
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <MapPin size={16} className="text-slate-300"/>
                      <span>{cls.room}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Users size={16} className="text-slate-300"/>
                      <span>{cls.students} Siswa</span>
                    </div>
                  </div>

                  {/* Progress Bar (Statistik) */}
                  <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-500">
                    <span>Materi Selesai</span>
                    <span className="text-[#7f1d1d]">{cls.progress}%</span>
                  </div>
                  <div className="w-full h-2 mb-6 overflow-hidden rounded-full bg-slate-100">
                    <div 
                        style={{width: `${cls.progress}%`}} 
                        className={`h-full rounded-full bg-gradient-to-r ${cls.theme}`}
                    ></div>
                  </div>

                  {/* Tombol Aksi */}
                  <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-[#7f1d1d] hover:text-white hover:border-[#7f1d1d] transition-colors flex items-center justify-center gap-2 group-hover:bg-[#7f1d1d] group-hover:text-white group-hover:border-[#7f1d1d]">
                    Masuk Kelas <ChevronRight size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // JIKA TIDAK ADA DATA (EMPTY STATE)
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
             <div className="p-6 mb-4 rounded-full bg-slate-100">
                <Search size={40} className="text-slate-300"/>
             </div>
             <h3 className="text-lg font-bold text-slate-700">Belum Ada Kelas</h3>
             <p className="max-w-xs mx-auto mb-6 text-sm text-slate-400">
               Daftar kelas masih kosong. Silakan buat kelas baru untuk memulai.
             </p>
             
             <button 
                onClick={() => onNavigate('buat-kelas')}
                className="text-[#7f1d1d] font-bold text-sm hover:underline flex items-center gap-1"
             >
                <Plus size={16}/> Buat Kelas Sekarang
             </button>
          </div>
        )}

      </main>
    </div>
  );
};

// Komponen Kecil untuk Item Sidebar (Biar kode lebih rapi)
const NavItem = ({ icon, label, active }) => (
  <div 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all 
    ${active 
      ? 'bg-[#7f1d1d] text-white shadow-lg shadow-red-200' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default KelasAjar;