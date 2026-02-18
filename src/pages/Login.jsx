import React, { useState } from 'react';
import { Eye, EyeOff, CheckSquare, AlertCircle } from 'lucide-react';

// Pastikan import gambar Anda sudah benar di sini
import schoolImage from '../assets/images/sekolah.jpg'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    setError('');

    // --- LOGIKA LOGIN ---
    if (username === "25000013" && password === "@Telkom2026") {
      onLogin('koordinator'); 
    } 
    else if (username === "1122334455" && password === "1122334455") {
      onLogin('koordinator'); 
    } 
    else if (username === "5544332211" && password === "5544332211") {
      onLogin('siswa'); 
    } 
    else {
      setError("Username atau Password salah!");
    }
  };

  return (
    // Outer Wrapper: Tetap min-h-screen agar background abu-abu memenuhi layar
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F2F4F8] p-4 font-sans">
      
      {/* PERUBAHAN ADA DI SINI:
         1. Hapus 'min-h-screen'
         2. Ubah 'max-w-5xl' menjadi 'max-w-4xl' (agar lebar lebih compact)
         3. Tambah 'h-auto md:h-[600px]' (agar tinggi fix di desktop, tapi fleksibel di HP)
      */}
      <div className="bg-white w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-[30px] overflow-hidden h-auto md:h-[600px]">
        
        {/* SISI KIRI: Gambar */}
        {/* Padding dikurangi sedikit jadi p-8 agar muat di ukuran baru */}
        <div className="relative flex flex-col justify-between w-full p-8 overflow-hidden text-white md:w-5/12">
          <img 
            src={schoolImage} 
            alt="SMP Telkom Makassar" 
            className="absolute inset-0 object-cover w-full h-full scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a0f0f] via-[#7f1d1d]/70 to-black/40 mix-blend-multiply"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="w-6 h-6 rounded bg-white/20"></div> 
              <h3 className="text-xs font-bold tracking-widest uppercase">Telkom Schools</h3>
            </div>
            <p className="text-[10px] opacity-75">Sistem Informasi Akademik</p>
          </div>

          <div className="relative z-10 mt-10 md:mt-auto">
            <h1 className="text-2xl font-extrabold leading-tight drop-shadow-lg">
              Selamat Datang <br />
              di SMP Telkom <br />
              Makassar.
            </h1>
            <p className="mt-3 text-xs font-medium leading-relaxed opacity-90">
              Mewujudkan generasi berkarakter dan berprestasi.
            </p>
          </div>
        </div>

        {/* SISI KANAN: Form Login */}
        {/* Padding disesuaikan jadi p-8 md:p-12 agar pas di tengah */}
        <div className="relative flex flex-col justify-center w-full p-8 bg-white md:w-7/12 md:p-12">
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Login Akun</h2>
            <p className="mt-1 text-sm text-slate-400">Masuk menggunakan NIS / NIP Anda.</p>
          </div>

          {/* Pesan Error */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 mb-4 text-xs font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl animate-pulse">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Input Username */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Username / NIS / NIP" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 text-sm border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 font-medium"
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 text-sm border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 pr-10 font-medium"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-slate-300 hover:text-[#7f1d1d]"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-2">
               <div className="text-[#7f1d1d]"><CheckSquare size={16} fill="#7f1d1d" color="white" /></div>
               <p className="text-xs text-slate-400">Ingat saya di perangkat ini.</p>
            </div>

            {/* Tombol Login */}
            <button 
              onClick={handleLoginClick}
              className="w-full bg-[#7f1d1d] hover:bg-[#631717] text-white py-3.5 rounded-full font-bold shadow-lg shadow-red-200/50 transition-all active:scale-95 mt-2 text-sm"
            >
              Masuk Sekarang
            </button>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">
                Lupa password? Hubungi <span className="text-[#7f1d1d] font-bold cursor-pointer hover:underline">IT Support</span>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;