import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Award, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StudentDash = ({ onLogout }) => {
  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* === SIDEBAR (KIRI) === */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        {/* Logo Area */}
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">
             T
           </div>
           <span className="text-lg font-bold tracking-tight text-slate-800">Telkom School LMS</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 mt-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20}/>} label="Mata Pelajaran" />
          <NavItem icon={<FileText size={20}/>} label="Tugas & PR" />
          <NavItem icon={<CalendarIcon size={20}/>} label="Jadwal Pelajaran" />
          <NavItem icon={<Award size={20}/>} label="Hasil Studi (Rapor)" />
          <NavItem icon={<Settings size={20}/>} label="Pengaturan Akun" />
        </nav>

        {/* Promo / Info Card: UJIAN */}
        <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-[#7f1d1d] to-[#a83232] rounded-2xl text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="mb-1 text-sm font-bold">Ujian Semester</h4>
            <p className="text-[10px] opacity-90 mb-3">Dimulai dalam 12 Hari lagi.</p>
            <button className="bg-white text-[#7f1d1d] text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition w-full">
              Lihat Kisi-Kisi
            </button>
          </div>
          {/* Dekorasi */}
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
              placeholder="Cari materi pelajaran, tugas, atau guru..." 
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
                src="https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-orange-wall_141793-13830.jpg" 
                alt="Student" 
                className="object-cover w-10 h-10 rounded-full"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-bold leading-tight text-slate-700">Andi Saputra</p>
                <p className="text-[10px] text-slate-400 font-medium">Kelas 9A • NIS. 554433</p>
              </div>
              <MoreHorizontal size={16} className="ml-1 text-slate-400"/>
            </div>
          </div>
        </header>


        {/* DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* KOLOM KIRI (2/3 lebar) */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* 1. Welcome Banner (Student Version) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden flex items-center justify-between">
              <div className="relative z-10 max-w-md">
                <h1 className="mb-2 text-2xl font-bold text-slate-800">Semangat Pagi, Andi! 🚀</h1>
                <p className="mb-6 text-sm leading-relaxed text-slate-500">
                  Kamu memiliki <span className="text-[#7f1d1d] font-bold">3 tugas</span> yang harus dikumpulkan hari ini. Tetap fokus dan jaga kesehatan ya!
                </p>
                
                {/* Stats Row Simple */}
                <div className="flex gap-4">
                    <div className="flex-1 p-3 border bg-slate-50 rounded-xl border-slate-100">
                        <p className="mb-1 text-xs font-bold text-slate-400">Rata-rata Nilai</p>
                        <p className="text-xl font-bold text-[#7f1d1d]">88.5</p>
                    </div>
                    <div className="flex-1 p-3 border bg-slate-50 rounded-xl border-slate-100">
                        <p className="mb-1 text-xs font-bold text-slate-400">Kehadiran</p>
                        <p className="text-xl font-bold text-emerald-600">95%</p>
                    </div>
                </div>
              </div>
              
              {/* Illustration 3D */}
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-studying-online-5693635-4745812.png" 
                className="absolute hidden object-contain w-56 h-56 md:block -right-6 -bottom-6 drop-shadow-xl"
                alt="Student Studying"
              />
            </div>

            {/* 2. Mata Pelajaran (Course Cards) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Mata Pelajaran Hari Ini</h3>
                <button className="text-[#7f1d1d] text-sm font-bold hover:underline">Lihat Jadwal</button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CourseCard 
                  title="Bahasa Indonesia" 
                  teacher="Bu Siti Aminah" 
                  topic="Bab 4: Teks Persuasi" 
                  color="bg-orange-100 text-orange-600"
                  icon={<BookOpen size={24}/>}
                  progress={80}
                />
                <CourseCard 
                  title="Matematika" 
                  teacher="Pak Budi Santoso" 
                  topic="Aljabar Linear" 
                  color="bg-blue-100 text-blue-600"
                  icon={<Award size={24}/>}
                  progress={60}
                />
                <CourseCard 
                  title="Ilmu Pengetahuan Alam" 
                  teacher="Pak Hendra" 
                  topic="Sistem Tata Surya" 
                  color="bg-purple-100 text-purple-600"
                  icon={<LayoutDashboard size={24}/>} // Placeholder icon
                  progress={45}
                />
                <CourseCard 
                  title="Bahasa Inggris" 
                  teacher="Ms. Jessica" 
                  topic="Procedure Text" 
                  color="bg-emerald-100 text-emerald-600"
                  icon={<FileText size={24}/>}
                  progress={90}
                />
              </div>
            </div>

          </div>


          {/* KOLOM KANAN (1/3 lebar) - Widget Sidebar */}
          <div className="space-y-8">
            
            {/* 1. Widget Deadline Tugas (Penting Buat Siswa) */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Tugas & PR</h3>
                  <div className="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-lg">3 Pending</div>
               </div>
               
               <div className="space-y-4">
                  <AssignmentItem 
                    subject="Matematika"
                    title="Latihan Hal. 45"
                    due="Hari Ini, 23:59"
                    urgent={true}
                  />
                  <AssignmentItem 
                    subject="B. Inggris"
                    title="Video Speaking"
                    due="Besok, 10:00"
                    urgent={false}
                  />
                  <AssignmentItem 
                    subject="Sejarah"
                    title="Makalah Kemerdekaan"
                    due="25 Okt 2023"
                    urgent={false}
                  />
               </div>
               
               <button className="w-full mt-6 py-3 rounded-xl bg-[#7f1d1d] text-white text-sm font-bold shadow-lg shadow-red-100 hover:bg-[#631717] transition">
                 Lihat Semua Tugas
               </button>
            </div>

            {/* 2. Calendar Widget (Sama dengan Guru agar konsisten) */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Oktober 2023</h3>
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

            {/* 3. Pengumuman Sekolah */}
            <div className="bg-[#F8FAFF] p-6 rounded-[2rem] border border-blue-100 relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={18} className="text-blue-600"/>
                    <h4 className="font-bold text-blue-900">Pengumuman</h4>
                 </div>
                 <p className="mb-4 text-xs leading-relaxed text-slate-600">
                   Pekan Olahraga Sekolah (Porseni) akan diadakan minggu depan. Segera daftarkan tim kelasmu!
                 </p>
               </div>
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

const CourseCard = ({ title, teacher, topic, color, icon, progress }) => (
  <div className="p-5 transition-all bg-white border cursor-pointer rounded-3xl border-slate-100 hover:shadow-lg group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wide">
        Ongoing
      </div>
    </div>
    
    <h4 className="mb-1 text-lg font-bold text-slate-800">{title}</h4>
    <p className="mb-1 text-xs font-medium text-slate-400">{teacher}</p>
    <p className="mb-6 text-xs font-semibold text-slate-500">Materi: {topic}</p>
    
    <div className="flex items-center gap-3">
       <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100">
         <div style={{width: `${progress}%`}} className={`h-full rounded-full ${color.replace('text', 'bg').replace('100', '500')}`}></div>
       </div>
       <span className="text-xs font-bold text-slate-500">{progress}%</span>
    </div>
  </div>
);

const AssignmentItem = ({ subject, title, due, urgent }) => (
  <div className="flex items-center gap-4 p-3 transition border border-transparent cursor-pointer rounded-2xl bg-slate-50 hover:bg-white hover:border-slate-100 group hover:shadow-sm">
    <div className={`p-2 rounded-xl ${urgent ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
      <CheckCircle2 size={18} />
    </div>
    <div className="flex-1">
      <h5 className="text-sm font-bold text-slate-700 line-clamp-1">{title}</h5>
      <p className="text-xs text-slate-400">{subject}</p>
    </div>
    <div className="text-right">
       <p className={`text-[10px] font-bold ${urgent ? 'text-red-500' : 'text-slate-400'}`}>{due}</p>
    </div>
  </div>
);

export default StudentDash;