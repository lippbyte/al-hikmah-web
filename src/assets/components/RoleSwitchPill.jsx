import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuRepeat,
  LuGraduationCap,
  LuUserCheck,
  LuHeartHandshake,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

export default function RoleSwitchPill() {
  const { currentUser, loginAs, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide on login page
  if (location.pathname === "/login") return null;

  const handleSelectRole = (role) => {
    loginAs(role);
    if (role === "guru") navigate("/guru");
    else if (role === "siswa") navigate("/");
    else if (role === "orang-tua" || role === "ortu") navigate("/orang-tua");
    setIsExpanded(false);
  };

  const handleRotate = () => {
    const next = switchRole();
    if (next === "guru") navigate("/guru");
    else if (next === "siswa") navigate("/");
    else if (next === "orang-tua") navigate("/orang-tua");
    setIsExpanded(false);
  };

  const role = currentUser?.role || "guru";
  const roleLabel =
    role === "guru"
      ? "Mode Guru"
      : role === "siswa"
      ? "Mode Siswa"
      : "Mode Orang Tua";

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 z-40 select-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-2 bg-bg-surface border border-border rounded-2xl shadow-xl p-3.5 w-72 space-y-3"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Ganti Akun Demo
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 text-text-muted hover:text-text-main rounded-md cursor-pointer"
              >
                <LuX className="text-xs" />
              </button>
            </div>

            {/* Current Active Account Card */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-bg-base/70 border border-border/50">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-2xs ${
                  role === "guru"
                    ? "bg-primary"
                    : role === "siswa"
                    ? "bg-accent"
                    : "bg-emerald-700"
                }`}
              >
                {currentUser?.avatar || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-text-main truncate">
                  {currentUser?.name}
                </div>
                <div className="text-[11px] text-text-muted truncate">
                  {role === "guru"
                    ? "Guru / Wali Kelas"
                    : role === "siswa"
                    ? "Siswa"
                    : "Wali Santri"}
                </div>
              </div>
            </div>

            {/* 3 Role Selection Buttons */}
            <div className="flex flex-col gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleSelectRole("guru")}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  role === "guru"
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "bg-bg-elevated/70 text-text-main hover:bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LuUserCheck className="text-sm" />
                  <span>Akun Guru (Ustadz Rakan)</span>
                </div>
                {role === "guru" && <span className="text-[10px]">Aktif</span>}
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole("siswa")}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  role === "siswa"
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "bg-bg-elevated/70 text-text-main hover:bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LuGraduationCap className="text-sm" />
                  <span>Akun Siswa (Faris)</span>
                </div>
                {role === "siswa" && <span className="text-[10px]">Aktif</span>}
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole("ortu")}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  role === "orang-tua"
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "bg-bg-elevated/70 text-text-main hover:bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LuHeartHandshake className="text-sm" />
                  <span>Akun Orang Tua (Wali Santri)</span>
                </div>
                {role === "orang-tua" && <span className="text-[10px]">Aktif</span>}
              </button>
            </div>

            {/* Quick Login Link */}
            <div className="pt-1 border-t border-border/60">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-1.5 px-3 rounded-xl text-text-muted hover:text-text-main hover:bg-bg-elevated text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Ke Halaman Login</span>
                <LuChevronRight className="text-xs" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-surface/95 backdrop-blur-md border border-primary/30 shadow-md text-text-main text-xs font-bold hover:border-primary cursor-pointer transition-all"
        title="Klik untuk beralih antara Akun Siswa, Guru, dan Orang Tua"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-primary font-semibold">{roleLabel}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-bg-elevated text-text-muted font-medium">
          Ganti
        </span>
      </motion.button>
    </div>
  );
}
