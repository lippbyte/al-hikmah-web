import { lazy, Suspense, useState, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { AuthProvider } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";
import { ToastProvider } from "./context/ToastProvider";
import { NavLayoutContext } from "./context/navStore";
import DesktopSidebar from "./assets/components/DesktopSidebar";
import StudentBottomNav from "./assets/components/StudentBottomNav";
import TeacherBottomNav from "./assets/components/TeacherBottomNav";
import PageSkeleton from "./assets/components/PageSkeleton";
import { page } from "./lib/motion";

// Route-level code splitting with React.lazy
const Login = lazy(() => import("./assets/pages/Login"));
const Home = lazy(() => import("./assets/pages/Home"));
const AIChat = lazy(() => import("./assets/pages/AIChat"));
const IsiCatatan = lazy(() => import("./assets/pages/IsiCatatan"));
const KalenderRamadan = lazy(() => import("./assets/pages/KalenderRamadan"));
const DetailHari = lazy(() => import("./assets/pages/DetailHari"));
const KegiatanKhusus = lazy(() => import("./assets/pages/KegiatanKhusus"));
const DetailKegiatanKhusus = lazy(() =>
  import("./assets/pages/DetailKegiatanKhusus")
);
const Profil = lazy(() => import("./assets/pages/Profil"));

// Teacher Pages (Atur Kegiatan dihapus sesuai permintaan)
const KelasSaya = lazy(() => import("./assets/pages/guru/KelasSaya"));
const PerluDisapa = lazy(() => import("./assets/pages/guru/PerluDisapa"));
const DetailSiswa = lazy(() => import("./assets/pages/guru/DetailSiswa"));
const RekapCetak = lazy(() => import("./assets/pages/guru/RekapCetak"));

// Parent Page
const KonfirmasiOrangTua = lazy(() =>
  import("./assets/pages/orangtua/KonfirmasiOrangTua")
);

function AppShell() {
  const location = useLocation();
  const pathname = location.pathname;

  const [isDesktopNavOpen, setDesktopNavOpen] = useState(true);
  const toggleDesktopNav = useCallback(
    () => setDesktopNavOpen((prev) => !prev),
    []
  );

  const isAuthPage = pathname === "/login";
  const isChatPage = pathname.startsWith("/chat");
  const isTeacherRoute = pathname.startsWith("/guru");
  const isParentRoute = pathname.startsWith("/orang-tua");

  const showStudentBottomNav =
    !isAuthPage &&
    !isChatPage &&
    !isTeacherRoute &&
    !isParentRoute &&
    (pathname === "/" ||
      pathname === "/home" ||
      pathname === "/ramadan" ||
      pathname === "/profil" ||
      pathname === "/kegiatan-khusus");

  const showTeacherBottomNav =
    pathname === "/guru" ||
    pathname === "/guru/kelas" ||
    pathname === "/guru/sapa" ||
    pathname === "/guru/rekap";

  if (isAuthPage) {
    return (
      <Suspense fallback={<PageSkeleton />}>
        <AnimatePresence mode="wait">
          <motion.div key={pathname} {...page} className="min-h-screen w-full">
            <Routes location={location}>
              <Route path="/login" element={<Login />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    );
  }

  return (
    <NavLayoutContext.Provider
      value={{
        isDesktopNavOpen,
        toggleDesktopNav,
        setDesktopNavOpen,
      }}
    >
      <div className="flex flex-row w-full min-h-screen bg-bg-base text-text-main selection:bg-primary-100 selection:text-primary-800 relative">
        {/* Persistent Collapsible Desktop Sidebar */}
        <DesktopSidebar isOpen={isDesktopNavOpen} onToggle={toggleDesktopNav} />

        {/* Main Content Viewport */}
        <div className="flex-1 min-w-0 min-h-screen flex flex-col">
          <Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                {...page}
                className="flex-1 flex flex-col min-w-0 w-full"
              >
                <Routes location={location}>
                  {/* Student Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/chat" element={<AIChat />} />
                  <Route path="/catatan" element={<IsiCatatan />} />
                  <Route path="/ramadan" element={<KalenderRamadan />} />
                  <Route path="/ramadan/detail/:day" element={<DetailHari />} />
                  <Route path="/kegiatan-khusus" element={<KegiatanKhusus />} />
                  <Route
                    path="/kegiatan-khusus/:id"
                    element={<DetailKegiatanKhusus />}
                  />
                  <Route path="/profil" element={<Profil />} />

                  {/* Teacher Routes */}
                  <Route path="/guru" element={<KelasSaya />} />
                  <Route path="/guru/kelas" element={<KelasSaya />} />
                  <Route path="/guru/sapa" element={<PerluDisapa />} />
                  <Route path="/guru/siswa/:id" element={<DetailSiswa />} />
                  <Route path="/guru/rekap" element={<RekapCetak />} />

                  {/* Parent Routes */}
                  <Route path="/orang-tua" element={<KonfirmasiOrangTua />} />
                  <Route
                    path="/orang-tua/:studentId"
                    element={<KonfirmasiOrangTua />}
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>

        {/* Draggable Mobile Bottom Navigation Bars */}
        {showStudentBottomNav && <StudentBottomNav />}
        {showTeacherBottomNav && <TeacherBottomNav />}
      </div>
    </NavLayoutContext.Provider>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <AppDataProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </ToastProvider>
        </AppDataProvider>
      </AuthProvider>
    </MotionConfig>
  );
}

export default App;
