import React from 'react';
import IlustrasiGuru from '../assets/images/guru_batik.png';
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
  Clock,
  PlusCircle
} from 'lucide-react';

const TeacherDash = ({ onLogout, onNavigate, dataKelas = [], userProfil }) => {
  
  // --- LOGIKA KALENDER DINAMIS ---
  const currentDate = new Date();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const emptySlots = Array(firstDayOfMonth).fill(null);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // --- MENGAMBIL DATA PROFIL DARI FIRESTORE ---
  const profil = {
    namaLengkap: userProfil?.nama_lengkap || "Guru Telkom",
    namaPanggilan: userProfil?.nama_panggilan || "Guru",
    nip: userProfil?.nip || "-",
    foto: userProfil?.foto || "https://ui-avatars.com/api/?name=" + (userProfil?.nama_lengkap || "Guru") + "&background=7f1d1d&color=fff" 
  };

  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* === SIDEBAR (KIRI) === */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">
             T
           </div>
           <span className="text-lg font-bold tracking-tight text-slate-800">Telkom School LMS</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
            <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          </div>
          
          <div onClick={() => onNavigate('kelas')} className="cursor-pointer">
             <NavItem icon={<BookOpen size={20}/>} label="Kelas Ajar" />
          </div>
          
          <NavItem icon={<FileText size={20}/>} label="Input Nilai" />
          <NavItem icon={<CalendarIcon size={20}/>} label="Jadwal" />
          <NavItem icon={<Users size={20}/>} label="Data Siswa" />
          
          <div onClick={() => onNavigate('profil')} className="cursor-pointer">
            <NavItem icon={<Settings size={20}/>} label="Pengaturan" />
          </div>
        </nav>

        <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-[#7f1d1d] to-[#a83232] rounded-2xl text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="mb-1 text-sm font-bold">E-Rapor Siap!</h4>
            <p className="text-[10px] opacity-90 mb-3">Batas input nilai tanggal 25.</p>
            <button className="bg-white text-[#7f1d1d] text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition">
              Input Sekarang
            </button>
          </div>
          <div className="absolute w-16 h-16 bg-white rounded-full -bottom-4 -right-4 opacity-10"></div>
          <div className="absolute top-0 w-12 h-12 bg-white rounded-full -left-4 opacity-10"></div>
        </div>

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


      {/* === MAIN CONTENT (KANAN) === */}
      <main className="flex-1 p-4 overflow-y-auto md:ml-64 md:p-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full max-w-md gap-3 px-4 py-3 bg-white border shadow-sm rounded-2xl border-slate-100">
            <Search size={18} className="text-slate-400"/>
            <input 
              type="text" 
              placeholder="Cari siswa, kelas, atau dokumen..." 
              className="w-full text-sm bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white border rounded-full shadow-sm hover:bg-slate-50 border-slate-100">
              <Bell size={20} className="text-slate-600"/>
              <span className="absolute w-2 h-2 bg-red-500 border border-white rounded-full top-2 right-2"></span>
            </button>
            
            <div 
              onClick={() => onNavigate('profil')}
              className="flex items-center gap-3 p-2 pr-4 transition bg-white border rounded-full shadow-sm cursor-pointer border-slate-100 hover:bg-slate-50"
            >
              <img 
                src={profil.foto} 
                alt="Teacher" 
                className="object-cover w-10 h-10 border rounded-full border-slate-200"
              />
              <div className="hidden text-left md:block">
                <p className="w-32 text-sm font-bold leading-tight truncate text-slate-700">
                  {profil.namaLengkap}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">NIP. {profil.nip}</p>
              </div>
              <MoreHorizontal size={16} className="ml-1 text-slate-400"/>
            </div>
          </div>
        </header>


        {/* DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* KOLOM KIRI (2/3 lebar) */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* 1. Welcome Banner */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between">
              <div className="relative z-10 max-w-md">
                <h1 className="mb-2 text-2xl font-bold text-slate-800">
                  Selamat Datang, Pak {profil.namaPanggilan}! 👋
                </h1>
                <p className="mb-6 text-sm leading-relaxed text-slate-500">
                  Anda memiliki <span className="text-[#7f1d1d] font-bold">{dataKelas.length} Kelas Ajar</span> saat ini. Tetap semangat mencerdaskan bangsa!
                </p>
                
                <div className="p-4 border bg-slate-50 rounded-xl border-slate-100">
                  <div className="flex justify-between mb-2 text-xs font-bold">
                    <span className="text-slate-600">Progres Semester Ini</span>
                    <span className="text-[#7f1d1d]">82%</span>
                  </div>
                  <div className="w-full h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full bg-[#7f1d1d] w-[82%] rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* === GAMBAR ILUSTRASI BARU DIMASUKKAN DI SINI === */}
              {/* Pastikan path src="/guru-batik.png" disesuaikan dengan nama file Anda di folder public */}
              <img 
                src={IlustrasiGuru}
                alt="Ilustrasi Guru Batik" 
                className="absolute hidden object-contain h-auto md:block w-80 lg:w-86 -right-2 -bottom-2 drop-shadow-xl"
              />
            </div>

            {/* 2. Kartu Kelas */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Kelas Ajar Anda</h3>
                <button 
                    onClick={() => onNavigate('kelas')}
                    className="text-[#7f1d1d] text-sm font-bold hover:underline"
                >
                    Lihat Semua
                </button>
              </div>
              
              {dataKelas.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {dataKelas.slice(0, 4).map((kelas, idx) => (
                    <ClassCard 
                      key={idx}
                      title={kelas.subject} 
                      grade={kelas.grade} 
                      students={`${kelas.students} Siswa`} 
                      color={kelas.color} 
                      icon={<BookOpen size={24}/>}
                      progress={kelas.progress}
                      barColor={kelas.theme}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 text-center flex flex-col items-center">
                    <div className="p-4 mb-3 rounded-full bg-slate-50 text-slate-400">
                        <BookOpen size={32} />
                    </div>
                    <h4 className="font-bold text-slate-700">Belum ada kelas aktif</h4>
                    <p className="max-w-xs mb-4 text-xs text-slate-400">
                        Anda belum membuat kelas apapun.
                    </p>
                    <button 
                        onClick={() => onNavigate('buat-kelas')}
                        className="flex items-center gap-2 bg-[#7f1d1d] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-red-100 hover:bg-[#631717] transition"
                    >
                        <PlusCircle size={16} /> Buat Kelas Baru
                    </button>
                </div>
              )}
            </div>

            {/* 3. Grafik Aktivitas */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Statistik Kehadiran Siswa</h3>
                  <select className="px-3 py-2 text-xs font-bold border-none rounded-lg outline-none bg-slate-50 text-slate-500">
                    <option>Minggu Ini</option>
                  </select>
               </div>
               <div className="flex items-end justify-between h-40 gap-4 px-2">
                  {[60, 80, 45, 90, 75, 50, 85].map((h, i) => (
                    <div key={i} className="w-full bg-[#fce7e7] rounded-t-lg relative group transition-all hover:bg-[#7f1d1d]">
                      <div 
                        style={{ height: `${h}%` }} 
                        className="absolute bottom-0 w-full bg-[#7f1d1d] rounded-t-lg opacity-80 group-hover:opacity-100 transition-all"
                      ></div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 text-xs font-bold uppercase text-slate-400">
                  <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
               </div>
            </div>

          </div>


          {/* KOLOM KANAN (1/3 lebar) */}
          <div className="space-y-8">
            
            {/* 1. Calendar Widget */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">{monthNames[currentMonth]} {currentYear}</h3>
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-slate-100"><MoreHorizontal size={16}/></button>
                  </div>
               </div>
               
               <div className="grid grid-cols-7 mb-4 text-xs font-bold text-center text-slate-400">
                 <div className="text-[#7f1d1d]">Min</div>
                 <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div>
               </div>
               
               <div className="grid grid-cols-7 text-sm font-medium text-center gap-y-4 text-slate-600">
                 {emptySlots.map((_, index) => (
                    <span key={`empty-${index}`}></span>
                 ))}
                 {daysArray.map((day) => {
                    const isToday = day === today;
                    return (
                        <span 
                            key={day} 
                            className={`
                                w-8 h-8 flex items-center justify-center rounded-full mx-auto
                                ${isToday ? 'bg-[#7f1d1d] text-white shadow-lg shadow-red-200 font-bold' : 'hover:bg-slate-100 cursor-pointer'}
                            `}
                        >
                            {day}
                        </span>
                    );
                 })}
               </div>
            </div>

            {/* 2. Upcoming Tasks */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="mb-6 text-lg font-bold">Jadwal Hari Ini</h3>
              <div className="space-y-4">
                <TaskItem 
                  title="Rapat Guru Wali Kelas" 
                  time="08:00 - 09:30" 
                  tag="Meeting" 
                  color="bg-purple-100 text-purple-600"
                />
                <TaskItem 
                  title="Mengajar Mat. 9A" 
                  time="10:00 - 11:30" 
                  tag="Kelas" 
                  color="bg-orange-100 text-orange-600"
                />
              </div>
              <button className="w-full py-3 mt-6 text-sm font-bold transition border border-dashed rounded-xl border-slate-300 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                + Tambah Jadwal Baru
              </button>
            </div>

            {/* 3. Banner Upgrade */}
            <div className="bg-[#1e293b] p-6 rounded-[2rem] text-white relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-lg bg-white/20 backdrop-blur-sm">
                   <Settings size={20} className="text-white"/>
                 </div>
                 <h4 className="mb-1 text-lg font-bold">Update Sistem</h4>
                 <p className="mb-4 text-xs text-slate-400">Versi mobile v.2.0 tersedia.</p>
                 <button className="bg-[#7f1d1d] w-full py-3 rounded-xl text-xs font-bold hover:bg-[#962626] transition">
                   Lihat Detail
                 </button>
               </div>
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#7f1d1d] rounded-full blur-[60px] opacity-50"></div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- KOMPONEN KECIL ---

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#7f1d1d] text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const ClassCard = ({ title, grade, students, color, icon, progress, barColor }) => (
  <div className="p-5 transition-all bg-white border cursor-pointer rounded-3xl border-slate-100 hover:shadow-lg group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={20}/></button>
    </div>
    
    <h4 className="mb-1 text-lg font-bold text-slate-800 line-clamp-1">{title}</h4>
    <p className="mb-6 text-xs font-medium text-slate-400">{grade} • {students}</p>
    
    <div className="flex items-center gap-3">
       <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100">
         <div 
            style={{width: `${progress}%`}} 
            className={`h-full rounded-full ${barColor ? `bg-gradient-to-r ${barColor}` : 'bg-slate-400'}`}
         ></div>
       </div>
       <span className="text-xs font-bold text-slate-500">{progress}%</span>
    </div>
  </div>
);

const TaskItem = ({ title, time, tag, color }) => (
  <div className="flex items-center gap-4 p-3 transition border border-transparent cursor-pointer rounded-2xl hover:bg-slate-50 hover:border-slate-100">
    <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
      <Clock size={18} />
    </div>
    <div className="flex-1">
      <h5 className="text-sm font-bold text-slate-700">{title}</h5>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${color}`}>
      {tag}
    </span>
  </div>
);

export default TeacherDash;