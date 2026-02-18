import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Save, X, ChevronRight, Palette } from 'lucide-react';

const BuatKelas = ({ onNavigate, onSave }) => {
  // State untuk form input
  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    grade: 'Kelas 7',
    time: '',
    room: '',
    students: 0,
    theme: 'from-orange-500 to-red-500', // Default theme
    color: 'bg-orange-100 text-orange-600'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!formData.subject || !formData.code) return alert("Mohon lengkapi data!");
    
    // Kirim data ke App.jsx
    onSave({
      ...formData,
      progress: 0, // Default progress 0%
      id: Date.now() // ID unik berdasarkan waktu
    });
  };

  // Pilihan Tema Warna Kartu
  const themes = [
    { name: 'Sunset', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-100 text-orange-600' },
    { name: 'Ocean', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100 text-blue-600' },
    { name: 'Forest', gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-100 text-emerald-600' },
    { name: 'Berry', gradient: 'from-purple-500 to-indigo-500', bg: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* SIDEBAR (Konsisten) */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">T</div>
           <span className="text-lg font-bold tracking-tight text-slate-800">Telkom School LMS</span>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-2">
          <div onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl text-slate-500 hover:bg-slate-50">
            <LayoutDashboard size={20}/> <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-[#7f1d1d] text-white shadow-lg shadow-red-200">
            <BookOpen size={20}/> <span className="text-sm font-medium">Buat Kelas Baru</span>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-y-auto md:ml-64 md:p-8">
        
        {/* Header */}
        <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Buat Kelas Baru</h1>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <span onClick={() => onNavigate('dashboard')} className="cursor-pointer hover:text-[#7f1d1d]">Home</span> 
              <ChevronRight size={12}/> 
              <span onClick={() => onNavigate('kelas')} className="cursor-pointer hover:text-[#7f1d1d]">Kelas Ajar</span>
              <ChevronRight size={12}/> 
              <span className="text-[#7f1d1d] font-bold">Form Input</span>
            </div>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 max-w-4xl">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                    
                    {/* Input Nama Mapel */}
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-bold text-slate-700">Nama Mata Pelajaran</label>
                        <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="Contoh: Matematika Wajib" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all"/>
                    </div>

                    {/* Input Kode & Tingkat */}
                    <div>
                        <label className="block mb-2 text-sm font-bold text-slate-700">Kode Kelas</label>
                        <input name="code" value={formData.code} onChange={handleChange} type="text" placeholder="Contoh: MAT-XII-IPA" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-slate-700">Tingkat Kelas</label>
                        <select name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all">
                            <option>Kelas 7</option>
                            <option>Kelas 8</option>
                            <option>Kelas 9</option>
                        </select>
                    </div>

                    {/* Input Jadwal & Ruangan */}
                    <div>
                        <label className="block mb-2 text-sm font-bold text-slate-700">Jadwal (Hari & Jam)</label>
                        <input name="time" value={formData.time} onChange={handleChange} type="text" placeholder="Contoh: Senin, 08:00 - 09:30" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-slate-700">Ruangan</label>
                        <input name="room" value={formData.room} onChange={handleChange} type="text" placeholder="Contoh: Lab Komputer 1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all"/>
                    </div>
                    
                    {/* Input Jumlah Siswa */}
                    <div>
                        <label className="block mb-2 text-sm font-bold text-slate-700">Kapasitas Siswa</label>
                        <input name="students" value={formData.students} onChange={handleChange} type="number" placeholder="30" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white outline-none transition-all"/>
                    </div>
                </div>

                {/* Theme Selection */}
                <div className="mb-8">
                    <label className="flex items-center block gap-2 mb-4 text-sm font-bold text-slate-700">
                        <Palette size={18}/> Pilih Tema Kartu
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {themes.map((t, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setFormData({...formData, theme: t.gradient, color: t.bg})}
                                className={`cursor-pointer border-2 rounded-xl p-1 ${formData.theme === t.gradient ? 'border-[#7f1d1d]' : 'border-transparent'}`}
                            >
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${t.gradient} shadow-sm`}></div>
                                <p className="text-[10px] text-center mt-1 font-bold text-slate-500">{t.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button type="button" onClick={() => onNavigate('kelas')} className="flex items-center gap-2 px-6 py-3 font-bold transition-all border rounded-xl border-slate-200 text-slate-500 hover:bg-slate-50">
                        <X size={18}/> Batal
                    </button>
                    <button type="submit" className="px-6 py-3 rounded-xl bg-[#7f1d1d] text-white font-bold hover:bg-[#631717] shadow-lg shadow-red-200 flex items-center gap-2 transition-all ml-auto">
                        <Save size={18}/> Simpan Kelas
                    </button>
                </div>
            </form>
        </div>

      </main>
    </div>
  );
};

export default BuatKelas;