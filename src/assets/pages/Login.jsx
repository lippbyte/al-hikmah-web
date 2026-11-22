import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuCheck,
  LuArrowRight,
  LuUserCheck,
  LuGraduationCap,
  LuHeartHandshake,
} from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { loginAs } = useAuth();

  const [username, setUsername] = useState("rakanshaka3@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState("guru");

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    loginAs(selectedRole);
    if (selectedRole === "guru") {
      navigate("/guru");
    } else if (selectedRole === "siswa") {
      navigate("/");
    } else {
      navigate("/orang-tua");
    }
  };

  const handleQuickDemoLogin = (role) => {
    setSelectedRole(role);
    if (role === "guru") {
      setUsername("rakanshaka3@gmail.com");
    } else if (role === "siswa") {
      setUsername("faris@alhikmah.id");
    } else {
      setUsername("wali.fauzan@gmail.com");
    }
    loginAs(role);
    if (role === "guru") {
      navigate("/guru");
    } else if (role === "siswa") {
      navigate("/");
    } else {
      navigate("/orang-tua");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC] relative overflow-hidden select-none">
      {/* Geometric Islamic Star Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#059669 1px, transparent 1px), radial-gradient(#D97706 1px, #F8FAFC 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-sm sm:max-w-md bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-6 sm:p-8 relative z-10 flex flex-col items-center"
      >
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Al-Hikmah Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#090D16] tracking-tight text-center">
            Al Hikmah
          </h1>
          <p className="text-xs text-[#475569] text-center">
            Buku Catatan Amaliyah Ramadan 1448 H
          </p>
        </div>

        {/* Quick Role Switcher (3 Roles) */}
        <div className="w-full mb-6 p-1 bg-[#F1F5F9] rounded-2xl border border-[#CBD5E1]/60 grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => {
              setSelectedRole("guru");
              setUsername("rakanshaka3@gmail.com");
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
              selectedRole === "guru"
                ? "bg-white text-[#059669] font-bold shadow-xs border border-[#CBD5E1]/80"
                : "text-[#475569] hover:text-[#090D16]"
            }`}
          >
            <LuUserCheck className="text-xs sm:text-sm" />
            <span>Guru</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole("siswa");
              setUsername("faris@alhikmah.id");
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
              selectedRole === "siswa"
                ? "bg-white text-[#059669] font-bold shadow-xs border border-[#CBD5E1]/80"
                : "text-[#475569] hover:text-[#090D16]"
            }`}
          >
            <LuGraduationCap className="text-xs sm:text-sm" />
            <span>Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole("ortu");
              setUsername("wali.fauzan@gmail.com");
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
              selectedRole === "ortu" || selectedRole === "orang-tua"
                ? "bg-white text-[#059669] font-bold shadow-xs border border-[#CBD5E1]/80"
                : "text-[#475569] hover:text-[#090D16]"
            }`}
          >
            <LuHeartHandshake className="text-xs sm:text-sm" />
            <span>Orang Tua</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#475569] block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#090D16] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all"
              placeholder="Username atau email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#475569] block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#090D16] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              className="text-xs font-medium text-[#475569] hover:text-[#059669] transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login CTA Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full h-12 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>Login</span>
            <LuArrowRight className="text-base" />
          </motion.button>
        </form>

        {/* Instant 1-Click Demo Section (3 Roles) */}
        <div className="w-full mt-6 pt-5 border-t border-[#CBD5E1]/60 space-y-2">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block text-center">
            Pilih Akun Demo (1-Click):
          </span>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("guru")}
              className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <LuUserCheck className="text-sm text-emerald-600" />
                <span>Masuk sebagai Guru (Ustadz Rakan)</span>
              </div>
              <LuArrowRight className="text-xs" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("siswa")}
              className="w-full py-2 px-3 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#090D16] text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <LuGraduationCap className="text-sm text-[#475569]" />
                <span>Masuk sebagai Siswa (Faris Faizulhaq)</span>
              </div>
              <LuArrowRight className="text-xs" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("ortu")}
              className="w-full py-2 px-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <LuHeartHandshake className="text-sm text-amber-600" />
                <span>Masuk sebagai Orang Tua (Wali Santri)</span>
              </div>
              <LuArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
