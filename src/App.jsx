import React, { useState, useEffect } from 'react';
// IMPORT FIRESTORE
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase'; // Sesuaikan path ini dengan letak file konfigurasi firebase Anda

import Login from './pages/Login';
import TeacherDash from './pages/TeacherDash';
import StudentDash from './pages/StudentDash';
import KelasAjar from './pages/KelasAjar';
import BuatKelas from './pages/BuatKelas';
import ProfilGuru from './pages/ProfilGuru';
import LoadingScreen from './components/LoadingScreen';

// (Opsional) Jika masih mau dipakai untuk fallback/backup awal
import { initialProfile } from './data/userProfile'; 

const App = () => {
  // 1. STATE LOGIN (PERSISTEN)
  const [role, setRole] = useState(() => localStorage.getItem('userRole') || null);

  // 2. STATE DATA KELAS (Dikosongkan awalnya, karena akan diisi oleh Firestore)
  const [daftarKelas, setDaftarKelas] = useState([]);

  // 3. STATE PROFIL GURU (PERSISTEN)
  const [profilGuru, setProfilGuru] = useState(() => {
    const saved = localStorage.getItem('profilGuruApp');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [loading, setLoading] = useState(false);
  const [teacherView, setTeacherView] = useState('dashboard'); 

  // === INI KUNCI SINKRONISASINYA: AMBIL DATA DARI FIRESTORE SECARA REAL-TIME ===
  useEffect(() => {
    // Jangan ambil data kalau belum login
    if (!role) return;

    // Kita menargetkan koleksi 'kelas' di Firestore
    const kelasRef = collection(db, 'kelas');
    
    // onSnapshot akan terus "mendengarkan" database. Jika ada kelas baru ditambah, 
    // fungsi ini otomatis berjalan dan mengupdate tampilan layar seketika.
    const unsubscribe = onSnapshot(kelasRef, (snapshot) => {
      const dataDariFirestore = snapshot.docs.map(doc => ({
        id: doc.id, // Ambil ID unik dokumen Firestore
        ...doc.data() // Ambil seluruh isi datanya (subject, code, guruId, dll)
      }));
      
      setDaftarKelas(dataDariFirestore);
      
      // Simpan juga ke local storage sebagai backup (opsional)
      localStorage.setItem('dataKelasApp', JSON.stringify(dataDariFirestore));
      setLoading(false);
    }, (error) => {
      console.error("Gagal mengambil data dari Firestore:", error);
      setLoading(false);
    });

    // Membersihkan listener saat komponen dilepas (best practice React)
    return () => unsubscribe();
  }, [role]); // Hanya dijalankan ulang jika status 'role' berubah
  // =========================================================================

  // --- FUNGSI UPDATE PROFIL ---
  const handleUpdateProfil = (dataBaru) => {
    setLoading(true);
    setTimeout(() => {
        setProfilGuru(dataBaru);
        localStorage.setItem('profilGuruApp', JSON.stringify(dataBaru));
        setLoading(false);
    }, 500);
  };

  const handleLogin = (userRole, userData) => {
    setLoading(true);
    setTimeout(() => {
      setRole(userRole);
      localStorage.setItem('userRole', userRole);

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

  const navigateTeacher = (pageName) => {
    setLoading(true); 
    setTimeout(() => {
        setTeacherView(pageName);
        setLoading(false);
    }, 300); 
  };

  // --- RENDER HALAMAN ---

  if (loading && daftarKelas.length === 0) {
    return <LoadingScreen />; 
  }

  if (!role) return <Login onLogin={handleLogin} />;

  if (role === 'koordinator' || role === 'guru') {
    // ROUTING GURU
    if (teacherView === 'profil') {
        return (
            <ProfilGuru 
                dataProfil={profilGuru} 
                onSave={handleUpdateProfil} 
                onNavigate={navigateTeacher}
                onLogout={handleLogout}
            />
        );
    }
    
    if (teacherView === 'kelas') {
      return (
        <KelasAjar 
          dataKelas={daftarKelas} // Sekarang isinya langsung dari Firestore!
          userProfil={profilGuru} 
          onLogout={handleLogout} 
          onNavigate={navigateTeacher} 
        />
      );
    }
    
    if (teacherView === 'buat-kelas') {
      return (
        <BuatKelas 
          userProfil={profilGuru} 
          onNavigate={navigateTeacher} 
        />
      );
    }
    
    // Dashboard Utama
    return (
      <TeacherDash 
        dataKelas={daftarKelas} // Dashboard juga akan otomatis terupdate!
        userProfil={profilGuru} 
        onLogout={handleLogout} 
        onNavigate={navigateTeacher} 
      />
    );
  }

  if (role === 'siswa') return <StudentDash onLogout={handleLogout} />;

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