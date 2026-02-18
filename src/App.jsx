import React, { useState, useEffect } from 'react';

// Import Halaman
import Login from './pages/Login';
import TeacherDash from './pages/TeacherDash';
// Pastikan StudentDash sudah ada, atau ganti dengan dummy jika belum dibuat
import StudentDash from './pages/StudentDash'; 

// Import Komponen Loading
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [role, setRole] = useState(null); // 'siswa', 'koordinator', atau null
  const [loading, setLoading] = useState(true); // Default true saat pertama buka app

  // 1. CEK LOGIN SAAT APLIKASI PERTAMA DIBUKA (REFRESH)
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Ambil data dari penyimpanan browser
      const savedRole = localStorage.getItem('userRole');
      
      if (savedRole) {
        // Jika ada data tersimpan, set role
        setRole(savedRole);
      }
      
      // Matikan loading setelah pengecekan selesai
      // Kita kasih sedikit delay agar transisi halus
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkLoginStatus();
  }, []);

  // 2. FUNGSI LOGIN (Dengan Animasi)
  const handleLogin = (userRole) => {
    setLoading(true); // Mulai animasi loading

    // Simulasi proses login (jeda 1.5 detik)
    setTimeout(() => {
      // Simpan role ke browser agar tahan refresh
      localStorage.setItem('userRole', userRole);
      setRole(userRole);
      setLoading(false); // Hentikan animasi loading
    }, 1500);
  };

  // 3. FUNGSI LOGOUT (Dengan Animasi)
  const handleLogout = () => {
    setLoading(true); // Mulai animasi loading

    // Simulasi proses logout
    setTimeout(() => {
      // Hapus data dari browser
      localStorage.removeItem('userRole');
      setRole(null);
      setLoading(false); // Hentikan animasi loading
    }, 1500);
  };

  // --- RENDERING TAMPILAN ---

  // Jika sedang loading, tampilkan LoadingScreen
  if (loading) {
    return <LoadingScreen />;
  }

  // Logika Navigasi Halaman
  if (role === 'koordinator') {
    return <TeacherDash onLogout={handleLogout} />;
  } 
  
  if (role === 'siswa') {
    return <StudentDash onLogout={handleLogout} />;
  }

  // Jika belum login (role === null), tampilkan Login
  return <Login onLogin={handleLogin} />;
};

export default App;