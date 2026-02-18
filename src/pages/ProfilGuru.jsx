import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, Calendar as CalendarIcon, 
  Users, FileText, Settings, LogOut, User, Save, Camera, Mail, Phone, MapPin, Briefcase
} from 'lucide-react';

const ProfilGuru = ({ dataProfil, onSave, onNavigate, onLogout }) => {
  // State lokal untuk form edit
  const [formData, setFormData] = useState(dataProfil);
  const [isEditing, setIsEditing] = useState(false);

  // Update state jika props berubah
  useEffect(() => {
    setFormData(dataProfil);
  }, [dataProfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Kirim data ke App.jsx untuk disimpan
    setIsEditing(false);
    alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="flex min-h-screen bg-[#F2F4F8] font-sans text-slate-800">
      
      {/* === SIDEBAR (Sama seperti Dashboard) === */}
      <aside className="fixed z-20 flex-col hidden w-64 h-full bg-white border-r md:flex border-slate-100">
        <div className="flex items-center gap-3 p-8">
           <div className="w-8 h-8 bg-[#7f1d1d] rounded-lg flex items-center justify-center text-white font-bold">T</div>
           <span className="text-lg font-bold tracking-tight text-slate-800">Telkom School</span>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-2">
          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
             <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          </div>
          <div onClick={() => onNavigate('kelas')} className="cursor-pointer">
             <NavItem icon={<BookOpen size={20}/>} label="Kelas Ajar" />
          </div>
          <NavItem icon={<Settings size={20}/>} label="Pengaturan Akun" active />
        </nav>
        <div className="p-4 border-t border-slate-50">
          <button onClick={onLogout} className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut size={20} /> <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-4 overflow-y-auto md:ml-64 md:p-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Profil Saya</h1>
                <p className="text-sm text-slate-500">Kelola informasi pribadi dan akun Anda.</p>
            </div>
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${isEditing ? 'bg-slate-200 text-slate-600' : 'bg-[#7f1d1d] text-white shadow-lg shadow-red-200'}`}
            >
                {isEditing ? 'Batal Edit' : 'Edit Profil'}
            </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* KOLOM KIRI: Kartu Foto */}
            <div className="space-y-6 lg:col-span-1">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-full h-32 bg-gradient-to-br from-[#7f1d1d] to-[#a83232] absolute top-0 left-0"></div>
                    
                    <div className="relative mt-12 mb-4 cursor-pointer group">
                        <div className="w-32 h-32 overflow-hidden border-4 border-white rounded-full shadow-lg bg-slate-200">
                             <img src={formData.foto} alt="Profile" className="object-cover w-full h-full" />
                        </div>
                        <div className="absolute bottom-0 right-2 bg-slate-800 text-white p-2 rounded-full shadow-md hover:bg-[#7f1d1d] transition">
                            <Camera size={16} />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800">{formData.namaPanggilan}</h2>
                    <p className="mb-4 text-sm font-medium text-slate-500">{formData.jabatan}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">NIP. {formData.nip}</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">Aktif</span>
                    </div>
                </div>

                {/* Info Kontak Singkat */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
                    <h3 className="font-bold text-slate-800">Kontak Cepat</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="p-2 bg-slate-50 rounded-lg text-[#7f1d1d]"><Mail size={16}/></div>
                        <span className="truncate">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="p-2 bg-slate-50 rounded-lg text-[#7f1d1d]"><Phone size={16}/></div>
                        <span>{formData.noHp}</span>
                    </div>
                </div>
            </div>

            {/* KOLOM KANAN: Form Edit */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-50">
                        <User size={20} className="text-[#7f1d1d]" />
                        <h3 className="text-lg font-bold text-slate-800">Informasi Pribadi</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                        <InputGroup label="Nama Lengkap" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} disabled={!isEditing} />
                        <InputGroup label="Nama Panggilan" name="namaPanggilan" value={formData.namaPanggilan} onChange={handleChange} disabled={!isEditing} />
                        <InputGroup label="NIP / Username" name="nip" value={formData.nip} onChange={handleChange} disabled={true} />
                        <InputGroup label="Jabatan" name="jabatan" value={formData.jabatan} onChange={handleChange} disabled={!isEditing} />
                    </div>

                    <div className="mb-6">
                         <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">Bio Singkat</label>
                         <textarea 
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows="4"
                            className={`w-full p-4 rounded-xl border outline-none text-sm font-medium transition-all ${!isEditing ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-white border-slate-300 focus:border-[#7f1d1d] text-slate-800'}`}
                         ></textarea>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                        <InputGroup label="Email Sekolah" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} type="email" icon={<Mail size={16}/>} />
                        <InputGroup label="Nomor Telepon" name="noHp" value={formData.noHp} onChange={handleChange} disabled={!isEditing} icon={<Phone size={16}/>} />
                        <div className="md:col-span-2">
                           <InputGroup label="Alamat Domisili" name="alamat" value={formData.alamat} onChange={handleChange} disabled={!isEditing} icon={<MapPin size={16}/>} />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 text-sm font-bold transition rounded-xl text-slate-500 hover:bg-slate-50">Batal</button>
                            <button type="submit" className="px-8 py-3 rounded-xl text-sm font-bold bg-[#7f1d1d] text-white hover:bg-[#631717] shadow-lg shadow-red-100 transition flex items-center gap-2">
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
      </main>
    </div>
  );
};

// Komponen Kecil untuk Input
const InputGroup = ({ label, name, value, onChange, disabled, type="text", icon }) => (
    <div>
        <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-slate-500">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-3.5 text-slate-400">{icon}</div>}
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full py-3 rounded-xl border outline-none text-sm font-bold transition-all ${icon ? 'pl-11 pr-4' : 'px-4'} ${disabled ? 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white border-slate-300 focus:border-[#7f1d1d] text-slate-800'}`}
            />
        </div>
    </div>
);

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-[#7f1d1d] text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
    {icon} <span className="text-sm font-medium">{label}</span>
  </div>
);

export default ProfilGuru;