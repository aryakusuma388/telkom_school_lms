import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Calendar as CalendarIcon, Users, FileText, Settings, 
  LogOut, Bell, Search, MoreHorizontal, Plus, Clock, MapPin, ChevronRight, Edit, Trash2,
  Loader2 // <-- TAMBAHAN: Import icon Loader2
} from 'lucide-react';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

import BuatKelas from './BuatKelas'; 
import DetailKelas from './DetailKelas'; 

const KelasAjar = ({ onLogout, onNavigate, dataKelas = [], userProfil }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDataTarget, setEditDataTarget] = useState(null); 
  const [activeMenuId, setActiveMenuId] = useState(null); 
  
  const [activeClass, setActiveClass] = useState(null); 
  
  // --- STATE BARU UNTUK EFEK LOADING ---
  const [isEnteringClass, setIsEnteringClass] = useState(false);

  const profil = {
    uid: userProfil?.guruId || userProfil?.uid || userProfil?.id || "tanpa-id",
    namaLengkap: userProfil?.nama_lengkap || userProfil?.nama || "Guru Telkom",
    nip: userProfil?.nip || "-",
    foto: userProfil?.foto || `https://ui-avatars.com/api/?name=${userProfil?.nama_lengkap || "Guru"}&background=7f1d1d&color=fff`
  };

  const kelasMilikGuru = dataKelas.filter(cls => cls.guruId === profil.uid);
  const filteredClasses = kelasMilikGuru.filter(cls => 
    cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (cls) => {
    setEditDataTarget(cls); 
    setIsModalOpen(true);   
    setActiveMenuId(null);  
  };

  const handleDeleteClick = async (id) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus kelas ini? Semua data kelas akan hilang.")) {
      try {
        await deleteDoc(doc(db, 'kelas', id));
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Gagal menghapus kelas.");
      }
    }
    setActiveMenuId(null); 
  };

  // --- FUNGSI BARU: Simulasi Loading saat masuk kelas ---
  const handleMasukKelas = (cls) => {
    setIsEnteringClass(true); // Nyalakan loading
    
    // Beri jeda waktu (misal: 800 milidetik) sebelum menampilkan halaman detail
    setTimeout(() => {
      setActiveClass(cls);
      setIsEnteringClass(false); // Matikan loading
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800 relative" onClick={() => setActiveMenuId(null)}>
      
      {/* SIDEBAR */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">T</div>
           <span className="text-lg font-bold tracking-tight text-slate-800">Telkom School</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          </div>
          <div className="cursor-default">
            <NavItem icon={<BookOpen size={20}/>} label="Kelas Ajar" active />
          </div>
          <NavItem icon={<FileText size={20}/>} label="Input Nilai" />
          <NavItem icon={<CalendarIcon size={20}/>} label="Jadwal" />
          <NavItem icon={<Users size={20}/>} label="Data Siswa" />
          <div onClick={() => onNavigate('profil')} className="cursor-pointer">
            <NavItem icon={<Settings size={20}/>} label="Pengaturan" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button onClick={onLogout} className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-y-auto md:ml-64 md:p-8">
        
        {/* Konten Header Atas (Tetap tampil) */}
        {!isEnteringClass && !activeClass && (
           <header className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Manajemen Kelas</h1>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <span onClick={() => onNavigate('dashboard')} className="cursor-pointer hover:text-[#7f1d1d]">Home</span> 
                <ChevronRight size={12}/> 
                <span className="text-[#7f1d1d] font-bold">Kelas Ajar</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 p-2 pr-4 bg-white border rounded-full shadow-sm border-slate-100">
                <img src={profil.foto} alt="Teacher" className="object-cover w-10 h-10 border rounded-full border-slate-200"/>
                <div className="hidden text-left md:block">
                    <p className="w-32 text-sm font-bold leading-tight truncate text-slate-700">{profil.namaLengkap}</p>
                    <p className="text-[10px] text-slate-400 font-medium">NIP. {profil.nip}</p>
                </div>
                </div>
            </div>
            </header>
        )}

        {/* LOGIKA TIGA ARAH: LOADING -> DETAIL -> GRID */}
        {isEnteringClass ? (
          
          /* 1. TAMPILAN LOADING SCREEN */
          <div className="flex flex-col items-center justify-center h-[70vh] animate-fade-in">
            <div className="p-4 mb-4 bg-white rounded-full shadow-lg shadow-slate-200/50">
                <Loader2 size={40} className="text-[#7f1d1d] animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Memasuki Ruang Kelas...</h3>
            <p className="mt-2 text-sm text-slate-400">Menyiapkan forum dan materi belajar Anda</p>
          </div>

        ) : activeClass ? (
          
          /* 2. TAMPILAN DETAIL KELAS */
          <DetailKelas 
            kelas={activeClass} 
            onBack={() => setActiveClass(null)} 
          />

        ) : (

          /* 3. TAMPILAN GRID KELAS AWAL */
          <div className="animate-fade-in-up">
            <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
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

              <button 
                onClick={() => {
                  setEditDataTarget(null); 
                  setIsModalOpen(true);
                }} 
                className="flex items-center gap-2 bg-[#7f1d1d] hover:bg-[#631717] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-200 w-full md:w-auto justify-center transition-all"
              >
                <Plus size={18} /> Buat Kelas Baru
              </button>
            </div>

            {filteredClasses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredClasses.map((cls) => (
                  <div key={cls.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    
                    <div className={`h-24 bg-gradient-to-r ${cls.theme || 'from-slate-500 to-slate-700'} relative p-6 flex items-start justify-between`}>
                      <div className="p-2 text-white bg-white/20 backdrop-blur-md rounded-xl">
                        <BookOpen size={20} />
                      </div>
                      
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            setActiveMenuId(activeMenuId === cls.id ? null : cls.id);
                          }}
                          className="p-1 transition rounded-lg text-white/80 hover:bg-white/20 hover:text-white"
                        >
                          <MoreHorizontal size={20} />
                        </button>
                        
                        {activeMenuId === cls.id && (
                          <div className="absolute right-0 z-30 w-32 py-1 mt-1 bg-white border shadow-lg rounded-xl border-slate-100">
                            <button 
                              onClick={() => handleEditClick(cls)} 
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#7f1d1d]"
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(cls.id)} 
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-4">
                      <div className="flex items-end justify-between mb-2">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cls.code}</span>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${cls.color || 'bg-slate-100 text-slate-600'} bg-opacity-50`}>{cls.grade}</span>
                      </div>
                      
                      <h3 className="mb-4 text-lg font-bold text-slate-800 line-clamp-1">{cls.subject}</h3>
                      
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <Clock size={16} className="text-slate-300"/> <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <Users size={16} className="text-slate-300"/> <span>{cls.students || 0} Siswa</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleMasukKelas(cls)} // <-- UBAH KE FUNGSI LOADING BARU
                        className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm transition-colors flex items-center justify-center gap-2 hover:bg-[#7f1d1d] hover:text-white hover:border-[#7f1d1d]"
                      >
                        Masuk Kelas <ChevronRight size={16}/>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                 <p className="text-slate-500">Belum ada kelas.</p>
              </div>
            )}
          </div>
        )}

      </main>

      {isModalOpen && (
        <BuatKelas 
          userProfil={userProfil} 
          editData={editDataTarget} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${active ? 'bg-[#7f1d1d] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon} <span className="text-sm font-medium">{label}</span>
  </div>
);

export default KelasAjar;