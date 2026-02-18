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
    // Reset error
    setError('');

    // Logika Login Sederhana
    if (username === "1122334455" && password === "1122334455") {
      onLogin('koordinator'); // Mengarahkan ke TeacherDash
    } else if (username === "5544332211" && password === "5544332211") {
      onLogin('siswa'); // Mengarahkan ke StudentDash
    } else {
      setError("Username atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F2F4F8] p-4 font-sans">
      
      {/* Container Utama */}
      <div className="bg-white w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-[30px] overflow-hidden min-h-[600px]">
        
        {/* SISI KIRI: Gambar Sinematik + Overlay Maroon */}
        <div className="relative flex flex-col justify-between w-full p-10 overflow-hidden text-white md:w-5/12">
          <img 
  src={schoolImage} // Gunakan variabel impor tadi
  alt="SMP Telkom Makassar" 
  className="absolute inset-0 object-cover w-full h-full scale-105" 
/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a0f0f] via-[#7f1d1d]/70 to-black/40 mix-blend-multiply"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="w-6 h-6 rounded bg-white/20"></div> 
              <h3 className="text-sm font-bold tracking-widest uppercase">Telkom Schools</h3>
            </div>
            <p className="text-xs opacity-75">Sistem Informasi Akademik</p>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-3xl font-extrabold leading-tight drop-shadow-lg">
              Selamat Datang di <br />
              SMP Telkom <br />
              Makassar.
            </h1>
            <p className="mt-4 text-sm font-medium opacity-90">
              Mewujudkan generasi berkarakter dan berprestasi.
            </p>
          </div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="flex flex-col justify-center w-full p-8 bg-white md:w-7/12 md:p-16">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Login Akun</h2>
            <p className="mt-1 text-sm text-slate-400">Masuk menggunakan NIS / NIP Anda.</p>
          </div>

          {/* Pesan Error jika login gagal */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mb-6 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl animate-pulse">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Input Username (Sebelumnya Email) */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Username / NIS / NIP" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 font-medium"
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 pr-10 font-medium"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-slate-300 hover:text-[#7f1d1d]"
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-4">
               <div className="text-[#7f1d1d]"><CheckSquare size={18} fill="#7f1d1d" color="white" /></div>
               <p className="text-xs text-slate-400">Ingat saya di perangkat ini.</p>
            </div>

            {/* Tombol Login */}
            <button 
              onClick={handleLoginClick}
              className="w-full bg-[#7f1d1d] hover:bg-[#631717] text-white py-4 rounded-full font-bold shadow-lg shadow-red-200/50 transition-all active:scale-95 mt-4"
            >
              Masuk Sekarang
            </button>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="mt-8 text-xs text-slate-400">
                Lupa password? Hubungi <span className="text-[#7f1d1d] font-bold cursor-pointer hover:underline">IT Support</span> Sekolah.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;