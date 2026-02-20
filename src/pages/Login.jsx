import React, { useState } from 'react';
import { Eye, EyeOff, CheckSquare, AlertCircle } from 'lucide-react';
import schoolImage from '../assets/images/sekolah.jpg'; 

// --- 1. IMPORT FIREBASE ---
import { db } from '../firebase'; // Sesuaikan path jika berbeda
import { doc, getDoc } from "firebase/firestore";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
    setError('');

    if (!username || !password) {
      setError("NIP / NIS dan Password wajib diisi!");
      return;
    }

    setIsLoading(true);

    try {
      // --- 2. AMBIL DATA DARI DATABASE ---
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Cek apakah password dari input sama dengan di database
        if (userData.password === password) {
          
          // MENGIRIM ROLE DAN SELURUH DATA PROFIL KE APP.JSX
          onLogin(userData.role, userData); 

        } else {
          setError("Password salah!");
        }
      } else {
        setError("NIP/NIS tidak terdaftar di database!");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLoginClick();
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 font-sans bg-[#F2F4F8]">
      <div className="bg-white w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-[30px] overflow-hidden h-auto md:h-[600px]">
        
        {/* SISI KIRI: Gambar */}
        <div className="relative flex flex-col justify-between w-full p-8 overflow-hidden text-white md:w-5/12">
          <img src={schoolImage} alt="SMP Telkom Makassar" className="absolute inset-0 object-cover w-full h-full scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a0f0f] via-[#7f1d1d]/70 to-black/40 mix-blend-multiply"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="w-6 h-6 rounded bg-white/20"></div> 
              <h3 className="text-xs font-bold tracking-widest uppercase">Telkom Schools</h3>
            </div>
            <p className="text-[10px] opacity-75">Sistem Informasi Akademik</p>
          </div>
          <div className="relative z-10 mt-10 md:mt-auto">
            <h1 className="text-2xl font-extrabold leading-tight drop-shadow-lg">Selamat Datang <br /> di SMP Telkom <br /> Makassar.</h1>
            <p className="mt-3 text-xs font-medium leading-relaxed opacity-90">Mewujudkan generasi berkarakter dan berprestasi.</p>
          </div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="relative flex flex-col justify-center w-full p-8 bg-white md:w-7/12 md:p-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Login Akun</h2>
            <p className="mt-1 text-sm text-slate-400">Masuk menggunakan NIS / NIP Anda.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-2 mb-4 text-xs font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl animate-pulse">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="relative group">
              <input type="text" placeholder=" NIP / NIS" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} className="w-full py-3 text-sm border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 font-medium" />
            </div>
            <div className="relative group">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="w-full py-3 text-sm border-b border-slate-200 focus:border-[#7f1d1d] outline-none transition-colors bg-transparent placeholder:text-slate-300 text-slate-700 pr-10 font-medium" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-0 text-slate-300 hover:text-[#7f1d1d] top-3">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
               <div className="text-[#7f1d1d]"><CheckSquare size={16} fill="#7f1d1d" color="white" /></div>
               <p className="text-xs text-slate-400">Ingat saya di perangkat ini.</p>
            </div>
            <button onClick={handleLoginClick} disabled={isLoading} className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg transition-all active:scale-95 mt-2 text-sm ${isLoading ? 'bg-slate-400' : 'bg-[#7f1d1d] hover:bg-[#631717]'}`}>
              {isLoading ? 'Memverifikasi...' : 'Masuk Sekarang'}
            </button>
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">Lupa password? Hubungi <span className="font-bold cursor-pointer text-[#7f1d1d] hover:underline">IT Support</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;