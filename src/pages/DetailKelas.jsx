import React, { useState } from 'react';
import { ArrowLeft, Users, FileText, MessageSquare, Settings } from 'lucide-react';

const DetailKelas = ({ kelas, onBack }) => {
  const [activeTab, setActiveTab] = useState('forum');

  return (
    <div className="animate-fade-in-up">
      {/* Tombol Kembali */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm font-bold transition-colors text-slate-500 hover:text-[#7f1d1d]"
      >
        <ArrowLeft size={18} />
        Kembali ke Daftar Kelas
      </button>

      {/* Banner Kelas */}
      <div className={`w-full h-48 md:h-56 rounded-3xl bg-gradient-to-r ${kelas.theme || 'from-slate-500 to-slate-700'} p-8 flex flex-col justify-end relative overflow-hidden shadow-lg`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{kelas.subject}</h1>
          <p className="mt-2 text-sm md:text-base text-white/80">
            {kelas.grade} • Kode: <span className="font-mono font-bold">{kelas.code}</span>
          </p>
        </div>
      </div>

      {/* Navigasi Tab */}
      <div className="flex items-center gap-8 mt-6 border-b border-slate-200">
        {[
          { id: 'forum', label: 'Forum & Materi', icon: <MessageSquare size={18}/> },
          { id: 'tugas', label: 'Tugas', icon: <FileText size={18}/> },
          { id: 'anggota', label: 'Anggota', icon: <Users size={18}/> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all border-b-2 ${
              activeTab === tab.id 
                ? 'border-[#7f1d1d] text-[#7f1d1d]' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Area Konten Dinamis */}
      <div className="py-8">
        {activeTab === 'forum' && (
          <div className="p-8 text-center bg-white border border-slate-100 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-700">Forum Kelas Masih Kosong</h3>
            <p className="mt-2 text-sm text-slate-400">Belum ada pengumuman atau materi yang dibagikan.</p>
            <button className="mt-4 px-6 py-2.5 bg-[#7f1d1d] text-white font-bold rounded-xl text-sm">
              + Buat Pengumuman
            </button>
          </div>
        )}
        
        {activeTab === 'tugas' && (
          <div className="p-8 text-center bg-white border border-slate-100 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-700">Belum Ada Tugas</h3>
            <p className="mt-2 text-sm text-slate-400">Berikan tugas pertama untuk siswa Anda di sini.</p>
          </div>
        )}

        {activeTab === 'anggota' && (
          <div className="p-8 text-center bg-white border border-slate-100 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-700">{kelas.students || 0} Siswa Terdaftar</h3>
            <p className="mt-2 text-sm text-slate-400">Siswa dapat bergabung menggunakan kode kelas: <b className="text-slate-700">{kelas.code}</b></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailKelas;