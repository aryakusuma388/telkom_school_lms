import React, { useState } from 'react';
import { BookOpen, Save, X, Palette, Loader2 } from 'lucide-react';
// IMPORT TAMBAHAN: doc dan updateDoc untuk fitur edit
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

// TAMBAHKAN PROP editData
const BuatKelas = ({ onClose, userProfil, editData = null }) => {
  // Jika editData ada isinya, masukkan ke state awal form
  const [formData, setFormData] = useState({
    subject: editData?.subject || '',
    code: editData?.code || '',
    grade: editData?.grade || 'Kelas 7',
    time: editData?.time || '',
    room: editData?.room || '',
    students: editData?.students || 0,
    theme: editData?.theme || 'from-orange-500 to-red-500', 
    color: editData?.color || 'bg-orange-100 text-orange-600'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.code) return alert("Mohon lengkapi data!");
    if (isLoading) return; 

    setIsLoading(true);

    try {
      const newClassData = {
        ...formData,
        // Jika sedang edit, biarkan guruId lama. Jika buat baru, masukkan guruId baru.
        guruId: editData?.guruId || userProfil?.guruId || userProfil?.uid || userProfil?.id || "tanpa-id", 
        namaGuru: editData?.namaGuru || userProfil?.nama_lengkap || userProfil?.nama || "Guru Telkom",
        updatedAt: new Date()
      };

      if (editData) {
        // --- JIKA MODE EDIT ---
        const docRef = doc(db, 'kelas', editData.id);
        await updateDoc(docRef, newClassData);
        alert("Kelas berhasil diperbarui!");
      } else {
        // --- JIKA MODE BUAT BARU ---
        newClassData.progress = 0;
        newClassData.daftarSiswa = [];
        newClassData.createdAt = new Date();
        await addDoc(collection(db, 'kelas'), newClassData);
        alert("Kelas berhasil dibuat!");
      }

      onClose(); 

    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const themes = [
    { name: 'Sunset', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-100 text-orange-600' },
    { name: 'Ocean', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100 text-blue-600' },
    { name: 'Forest', gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-100 text-emerald-600' },
    { name: 'Berry', gradient: 'from-purple-500 to-indigo-500', bg: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
                <div className="p-2 text-white rounded-xl bg-[#7f1d1d]">
                    <BookOpen size={24} />
                </div>
                {/* Judul berubah tergantung mode edit atau buat baru */}
                <h2 className="text-xl font-bold text-slate-800">
                  {editData ? "Edit Data Kelas" : "Buat Kelas Baru"}
                </h2>
            </div>
            <button onClick={onClose} className="p-2 transition-colors rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X size={24} />
            </button>
        </div>

        <div className="p-8 overflow-y-auto">
            <form id="form-buat-kelas" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Nama Mata Pelajaran</label>
                        <input name="subject" value={formData.subject} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Kode Kelas</label>
                        <input name="code" value={formData.code} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Tingkat Kelas</label>
                        <select name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all">
                            <option>Kelas 7</option>
                            <option>Kelas 8</option>
                            <option>Kelas 9</option>
                            <option>Kelas 10</option>
                            <option>Kelas 11</option>
                            <option>Kelas 12</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Jadwal (Hari & Jam)</label>
                        <input name="time" value={formData.time} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Ruangan</label>
                        <input name="room" value={formData.room} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all"/>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-1.5 text-sm font-bold text-slate-700">Kapasitas Siswa</label>
                        <input name="students" value={formData.students} onChange={handleChange} type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#7f1d1d] focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all"/>
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-700">
                        <Palette size={18}/> Pilih Tema Kartu
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {themes.map((t, idx) => (
                            <div key={idx} onClick={() => setFormData({...formData, theme: t.gradient, color: t.bg})} className={`cursor-pointer border-2 rounded-xl p-1 transition-all ${formData.theme === t.gradient ? 'border-[#7f1d1d] scale-105' : 'border-transparent hover:bg-slate-50'}`}>
                                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${t.gradient} shadow-sm`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>

        <div className="flex justify-end gap-3 px-8 py-6 border-t bg-slate-50 border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-2.5 font-bold transition-all border rounded-xl border-slate-200 text-slate-600 hover:bg-white hover:text-slate-800">
                Batal
            </button>
            <button type="submit" form="form-buat-kelas" disabled={isLoading} className={`px-6 py-2.5 rounded-xl text-white font-bold flex items-center gap-2 transition-all ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#7f1d1d] hover:bg-[#631717]'}`}>
                {isLoading ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
                {editData ? "Simpan Perubahan" : "Simpan Kelas"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default BuatKelas;