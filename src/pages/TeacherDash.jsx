import React from 'react';
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
  TrendingUp,
  Clock
} from 'lucide-react';

const TeacherDash = ({ onLogout }) => {
  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* === SIDEBAR (KIRI) === */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        {/* Logo Area */}
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">
             T
           </div>
           <span className="text-lg font-bold tracking-tight text-slate-800">TelkomDash</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 mt-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20}/>} label="Kelas Ajar" />
          <NavItem icon={<FileText size={20}/>} label="Input Nilai" />
          <NavItem icon={<CalendarIcon size={20}/>} label="Jadwal" />
          <NavItem icon={<Users size={20}/>} label="Data Siswa" />
          <NavItem icon={<Settings size={20}/>} label="Pengaturan" />
        </nav>

        {/* Promo / Info Card di Sidebar */}
        <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-[#7f1d1d] to-[#a83232] rounded-2xl text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="mb-1 text-sm font-bold">E-Rapor Siap!</h4>
            <p className="text-[10px] opacity-90 mb-3">Batas input nilai tanggal 25.</p>
            <button className="bg-white text-[#7f1d1d] text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition">
              Input Sekarang
            </button>
          </div>
          {/* Dekorasi bulat */}
          <div className="absolute w-16 h-16 bg-white rounded-full -bottom-4 -right-4 opacity-10"></div>
          <div className="absolute top-0 w-12 h-12 bg-white rounded-full -left-4 opacity-10"></div>
        </div>

        {/* Logout Button */}
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
        
        {/* HEADER: Search & Profile */}
        <header className="flex items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md gap-3 px-4 py-3 bg-white border shadow-sm rounded-2xl border-slate-100">
            <Search size={18} className="text-slate-400"/>
            <input 
              type="text" 
              placeholder="Cari siswa, kelas, atau dokumen..." 
              className="w-full text-sm bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Profile & Notif */}
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white border rounded-full shadow-sm hover:bg-slate-50 border-slate-100">
              <Bell size={20} className="text-slate-600"/>
              <span className="absolute w-2 h-2 bg-red-500 border border-white rounded-full top-2 right-2"></span>
            </button>
            <div className="flex items-center gap-3 p-2 pr-4 transition bg-white border rounded-full shadow-sm cursor-pointer border-slate-100 hover:bg-slate-50">
              <img 
                src="https://img.freepik.com/free-photo/portrait-smiling-young-man-eyeglasses_171337-4842.jpg" 
                alt="Teacher" 
                className="object-cover w-10 h-10 rounded-full"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-bold leading-tight text-slate-700">Pak Budi Santoso</p>
                <p className="text-[10px] text-slate-400 font-medium">NIP. 19820312 2010</p>
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
                <h1 className="mb-2 text-2xl font-bold text-slate-800">Selamat Datang, Pak Budi! 👋</h1>
                <p className="mb-6 text-sm leading-relaxed text-slate-500">
                  Anda memiliki <span className="text-[#7f1d1d] font-bold">4 jam mengajar</span> hari ini. Jangan lupa memeriksa tugas Matematika Kelas 9A yang baru dikumpulkan.
                </p>
                
                {/* Progress Bar Mockup */}
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
              
              {/* Illustration 3D (Placeholder) */}
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/books-and-graduation-cap-4963503-4127025.png" 
                className="absolute hidden object-contain w-48 h-48 md:block -right-4 -bottom-4 drop-shadow-xl"
                alt="Decoration"
              />
            </div>

            {/* 2. Kartu Kelas (Courses) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Kelas Ajar Anda</h3>
                <button className="text-[#7f1d1d] text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ClassCard 
                  title="Matematika Dasar" 
                  grade="Kelas 7A" 
                  students="32 Siswa" 
                  color="bg-orange-100 text-orange-600"
                  icon={<TrendingUp size={24}/>}
                  progress={75}
                />
                <ClassCard 
                  title="Fisika Terapan" 
                  grade="Kelas 9B" 
                  students="28 Siswa" 
                  color="bg-blue-100 text-blue-600"
                  icon={<BookOpen size={24}/>}
                  progress={45}
                />
                <ClassCard 
                  title="Algoritma Dasar" 
                  grade="Kelas 8C" 
                  students="30 Siswa" 
                  color="bg-emerald-100 text-emerald-600"
                  icon={<FileText size={24}/>}
                  progress={90}
                />
              </div>
            </div>

            {/* 3. Grafik Aktivitas (Simple CSS Representation) */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Statistik Kehadiran Siswa</h3>
                  <select className="px-3 py-2 text-xs font-bold border-none rounded-lg outline-none bg-slate-50 text-slate-500">
                    <option>Minggu Ini</option>
                    <option>Bulan Ini</option>
                  </select>
               </div>
               {/* Dummy Chart Bar */}
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


          {/* KOLOM KANAN (1/3 lebar) - Widget Sidebar */}
          <div className="space-y-8">
            
            {/* 1. Calendar Widget */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Oktober 2023</h3>
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-slate-100"><MoreHorizontal size={16}/></button>
                  </div>
               </div>
               
               {/* Calendar Grid Simple */}
               <div className="grid grid-cols-7 mb-4 text-xs font-bold text-center text-slate-400">
                 <div className="text-[#7f1d1d]">Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
               </div>
               <div className="grid grid-cols-7 text-sm font-medium text-center gap-y-4 text-slate-600">
                 <span className="text-slate-200">28</span><span className="text-slate-200">29</span><span className="text-slate-200">30</span>
                 <span className="bg-[#7f1d1d] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg shadow-red-200 mx-auto">1</span>
                 <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                 <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
               </div>
            </div>

            {/* 2. Upcoming Tasks / Jadwal */}
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
                <TaskItem 
                  title="Input Nilai UTS" 
                  time="13:00 - 14:00" 
                  tag="Admin" 
                  color="bg-blue-100 text-blue-600"
                />
              </div>
              
              <button className="w-full py-3 mt-6 text-sm font-bold transition border border-dashed rounded-xl border-slate-300 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                + Tambah Jadwal Baru
              </button>
            </div>

            {/* 3. Banner Upgrade/Info (Versi Kecil) */}
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
               {/* Circle decor */}
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

const ClassCard = ({ title, grade, students, color, icon, progress }) => (
  <div className="p-5 transition-all bg-white border cursor-pointer rounded-3xl border-slate-100 hover:shadow-lg group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={20}/></button>
    </div>
    
    <h4 className="mb-1 text-lg font-bold text-slate-800">{title}</h4>
    <p className="mb-6 text-xs font-medium text-slate-400">{grade} • {students}</p>
    
    <div className="flex items-center gap-3">
       <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100">
         <div style={{width: `${progress}%`}} className={`h-full rounded-full ${color.replace('text', 'bg').replace('100', '500')}`}></div>
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