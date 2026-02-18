// src/components/LoadingScreen.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative">
        {/* Lingkaran Luar Berputar */}
        <div className="w-20 h-20 border-4 border-slate-100 border-t-[#7f1d1d] rounded-full animate-spin"></div>
        
        {/* Logo/Icon Diam di Tengah */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-[#7f1d1d] text-xl">
          TS
        </div>
      </div>
      
      <div className="mt-6 space-y-1 text-center">
        <h3 className="text-lg font-bold tracking-widest uppercase text-slate-800">Memuat Sistem</h3>
        <p className="text-xs text-slate-400 animate-pulse">Mohon tunggu sebentar...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;