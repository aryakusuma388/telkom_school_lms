import React, { useState } from 'react';
import Login from './pages/Login';
import TeacherDash from './pages/TeacherDash';
import StudentDash from './pages/StudentDash';
import KelasAjar from './pages/KelasAjar';
import BuatKelas from './pages/BuatKelas';
import ProfilGuru from './pages/ProfilGuru'; // Import Halaman Baru
import LoadingScreen from './components/LoadingScreen';

// Import data awal
import { initialKelas } from './data/InitialData'; 
import { initialProfile } from './data/userProfile'; // Import Data Arya

const App = () => {
  // 1. STATE LOGIN (PERSISTEN)
  const [role, setRole] = useState(() => localStorage.getItem('userRole') || null);

  // 2. STATE DATA KELAS (PERSISTEN)
  const [daftarKelas, setDaftarKelas] = useState(() => {
    const saved = localStorage.getItem('dataKelasApp');
    return saved ? JSON.parse(saved) : initialKelas;
  });

  // 3. STATE PROFIL GURU (BARU & PERSISTEN)
  // Ini kuncinya: Ambil dari storage, kalau kosong pakai data 'Arya'
  const [profilGuru, setProfilGuru] = useState(() => {
    const saved = localStorage.getItem('profilGuruApp');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [loading, setLoading] = useState(false);
  const [teacherView, setTeacherView] = useState('dashboard'); 

  // --- FUNGSI UPDATE PROFIL ---
  const handleUpdateProfil = (dataBaru) => {
    setLoading(true);
    setTimeout(() => {
        setProfilGuru(dataBaru);
        localStorage.setItem('profilGuruApp', JSON.stringify(dataBaru));
        setLoading(false);
    }, 500);
  };
  // -----------------------------

  // SESUDAHNYA:
  const handleLogin = (userRole, userData) => {
    setLoading(true);
    setTimeout(() => {
      setRole(userRole);
      localStorage.setItem('userRole', userRole);

      // INI KUNCINYA: Menyimpan profil dari database ke state dan browser!
      if (userData) {
          setProfilGuru(userData);
          localStorage.setItem('profilGuruApp', JSON.stringify(userData));
      }

      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setRole(null);
      localStorage.removeItem('userRole');
      setTeacherView('dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleTambahKelas = (kelasBaru) => {
    setLoading(true);
    setTimeout(() => {
        const updatedKelas = [...daftarKelas, kelasBaru];
        setDaftarKelas(updatedKelas);
        localStorage.setItem('dataKelasApp', JSON.stringify(updatedKelas));
        setTeacherView('kelas');
        setLoading(false);
    }, 500);
  };

  const navigateTeacher = (pageName) => {
    setLoading(true); 
    setTimeout(() => {
        setTeacherView(pageName);
        setLoading(false);
    }, 300); 
  };

  // --- RENDER HALAMAN ---

  if (loading) {
    return <LoadingScreen />; // <-- Panggil komponen animasi di sini
  }

  if (!role) return <Login onLogin={handleLogin} />;

  // 👇 INI YANG SAYA UBAH: Menambahkan (|| role === 'guru')
  if (role === 'koordinator' || role === 'guru') {
    // ROUTING GURU
    if (teacherView === 'profil') {
        return (
            <ProfilGuru 
                dataProfil={profilGuru} // Kirim data Arya ke halaman profil
                onSave={handleUpdateProfil} // Fungsi simpan
                onNavigate={navigateTeacher}
                onLogout={handleLogout}
            />
        );
    }
    if (teacherView === 'kelas') {
      return <KelasAjar dataKelas={daftarKelas} onLogout={handleLogout} onNavigate={navigateTeacher} />;
    }
    if (teacherView === 'buat-kelas') {
      return <BuatKelas onSave={handleTambahKelas} onNavigate={navigateTeacher} />;
    }
    
    // Dashboard Utama
    return (
      <TeacherDash 
        dataKelas={daftarKelas} 
        userProfil={profilGuru} // <-- PENTING: Kirim data profil ke dashboard
        onLogout={handleLogout} 
        onNavigate={navigateTeacher} 
      />
    );
  }

  if (role === 'siswa') return <StudentDash onLogout={handleLogout} />;

  // Tampilan darurat jika rolenya tidak terdaftar sama sekali
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Akses Ditolak!</h2>
        <p>Role "{role}" tidak dikenali oleh sistem.</p>
        <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Kembali ke Login
        </button>
    </div>
  );
};

export default App;