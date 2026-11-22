import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Student Pages
import Home from "./assets/pages/Home";
import AIChat from "./assets/pages/AIChat";
import IsiCatatan from "./assets/pages/IsiCatatan";
import KalenderRamadan from "./assets/pages/KalenderRamadan";
import DetailHari from "./assets/pages/DetailHari";
import KegiatanKhusus from "./assets/pages/KegiatanKhusus";
import DetailKegiatanKhusus from "./assets/pages/DetailKegiatanKhusus";

// Teacher Pages (G-01 s/d G-05)
import KelasSaya from "./assets/pages/guru/KelasSaya";
import PerluDisapa from "./assets/pages/guru/PerluDisapa";
import DetailSiswa from "./assets/pages/guru/DetailSiswa";
import RekapCetak from "./assets/pages/guru/RekapCetak";
import AturKegiatan from "./assets/pages/guru/AturKegiatan";

// Parent Pages (O-01 & O-02)
import KonfirmasiOrangTua from "./assets/pages/orangtua/KonfirmasiOrangTua";

// Auth Page
import Login from "./assets/pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Student Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/catatan" element={<IsiCatatan />} />
          <Route path="/ramadan" element={<KalenderRamadan />} />
          <Route path="/ramadan/detail/:day" element={<DetailHari />} />
          <Route path="/kegiatan-khusus" element={<KegiatanKhusus />} />
          <Route path="/kegiatan-khusus/:id" element={<DetailKegiatanKhusus />} />

          {/* Teacher Routes (Section G-01 s/d G-05) */}
          <Route path="/guru" element={<KelasSaya />} />
          <Route path="/guru/kelas" element={<KelasSaya />} />
          <Route path="/guru/sapa" element={<PerluDisapa />} />
          <Route path="/guru/siswa/:id" element={<DetailSiswa />} />
          <Route path="/guru/rekap" element={<RekapCetak />} />
          <Route path="/guru/atur-kegiatan" element={<AturKegiatan />} />

          {/* Parent Routes (Section O-01 & O-02) */}
          <Route path="/orang-tua" element={<KonfirmasiOrangTua />} />
          <Route path="/orang-tua/:studentId" element={<KonfirmasiOrangTua />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
