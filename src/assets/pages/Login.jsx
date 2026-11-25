import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/authStore";
import { useToast } from "../../context/toastStore";
import { DEMO_ACCOUNTS } from "../../data/demoData";
import { tabPillTransition, tapScale } from "../../lib/motion";
import logoAlHikmah from "../images/logo-al-hikmah.png";
import {
  IconArrowRight,
  IconTeacher,
  IconStudent,
  IconParent,
  IconEye,
  IconEyeSlash,
  IconWarningCircle,
} from "../../lib/icons";

const ROLE_TABS = [
  { key: "siswa", label: "Siswa", email: DEMO_ACCOUNTS.siswa.email, icon: IconStudent },
  { key: "guru", label: "Guru", email: DEMO_ACCOUNTS.guru.email, icon: IconTeacher },
  { key: "ortu", label: "Orang Tua", email: DEMO_ACCOUNTS.ortu.email, icon: IconParent },
];

export default function Login() {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState("siswa");
  const [username, setUsername] = useState(DEMO_ACCOUNTS.siswa.email);
  const [password, setPassword] = useState("demo-ramadan");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const navigateByRole = (role) => {
    if (role === "guru") navigate("/guru");
    else if (role === "ortu" || role === "orang-tua") navigate("/orang-tua");
    else navigate("/");
  };

  const handleRoleTabClick = (tab) => {
    setSelectedRole(tab.key);
    setUsername(tab.email);
    setErrors({ username: "", password: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const nextErrors = { username: "", password: "" };

    if (!username.trim()) {
      nextErrors.username = "Email atau nama pengguna wajib diisi.";
    }
    if (!password.trim() || password.trim().length < 4) {
      nextErrors.password = "Kata sandi minimal 4 karakter.";
    }

    if (nextErrors.username || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    setErrors({ username: "", password: "" });
    loginAs(selectedRole);
    showToast("Masuk menggunakan akun demo.");
    navigateByRole(selectedRole);
  };

  const handleQuickDemoLogin = (roleKey) => {
    const tab = ROLE_TABS.find((r) => r.key === roleKey) || ROLE_TABS[0];
    setSelectedRole(tab.key);
    setUsername(tab.email);
    setErrors({ username: "", password: "" });
    loginAs(tab.key);
    showToast(`Masuk sebagai ${tab.label} (Demo).`);
    navigateByRole(tab.key);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 bg-ivory-pattern relative overflow-x-clip">
      <section className="w-full max-w-md bg-bg-surface border border-border rounded-[1.75rem] shadow-[var(--shadow-elevated)] p-6 sm:p-8 relative z-10 flex flex-col items-center gap-6">
        {/* Brand Header with Logo Al-Hikmah */}
        <div className="flex flex-col items-center gap-2.5 text-center select-none">
          <div className="w-24 h-24 rounded-3xl bg-bg-base border border-border-subtle overflow-hidden flex items-center justify-center shadow-[var(--shadow-card)]">
            <img
              src={logoAlHikmah}
              alt="Logo Al Hikmah"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
            Al Hikmah
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Buku Catatan Amaliyah Ramadan 1448 H
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div
          role="tablist"
          aria-label="Pilih peran demo"
          className="w-full p-1.5 bg-bg-elevated rounded-2xl border border-border grid grid-cols-3 gap-1.5 select-none"
        >
          {ROLE_TABS.map((tab) => {
            const isActive = selectedRole === tab.key;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                whileTap={tapScale}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleRoleTabClick(tab)}
                className={`relative min-h-12 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isActive
                    ? "text-primary-700 font-bold"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="login-role-pill"
                    transition={tabPillTransition}
                    className="absolute inset-0 rounded-xl bg-bg-surface border border-border shadow-[var(--shadow-card)]"
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative z-10 text-base shrink-0" aria-hidden="true" />
                <span className="relative z-10 truncate">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Accessible Form */}
        <form onSubmit={handleLogin} noValidate className="w-full space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-semibold text-text-main block"
            >
              Email atau Nama Pengguna
            </label>
            <input
              id="login-email"
              name="username"
              type="email"
              inputMode="email"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors((prev) => ({ ...prev, username: "" }));
                }
              }}
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "login-email-error" : undefined}
              placeholder="nama@alhikmah.contoh"
              className={`w-full min-h-12 px-4 bg-bg-surface border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600 transition-colors ${
                errors.username ? "border-danger-600" : "border-border"
              }`}
            />
            {errors.username && (
              <p
                id="login-email-error"
                role="alert"
                className="text-xs font-medium text-danger-600 flex items-center gap-1.5 pt-0.5"
              >
                <IconWarningCircle className="text-sm shrink-0" aria-hidden="true" />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold text-text-main block"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                placeholder="Masukkan kata sandi"
                className={`w-full min-h-12 pl-4 pr-12 bg-bg-surface border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600 transition-colors ${
                  errors.password ? "border-danger-600" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                className="absolute right-0 top-0 w-12 h-12 flex items-center justify-center text-text-muted hover:text-text-main cursor-pointer rounded-2xl"
              >
                {showPassword ? (
                  <IconEyeSlash className="text-lg" aria-hidden="true" />
                ) : (
                  <IconEye className="text-lg" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="login-password-error"
                role="alert"
                className="text-xs font-medium text-danger-600 flex items-center gap-1.5 pt-0.5"
              >
                <IconWarningCircle className="text-sm shrink-0" aria-hidden="true" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <motion.button
            whileTap={tapScale}
            type="submit"
            className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>Masuk</span>
            <IconArrowRight className="text-base" aria-hidden="true" />
          </motion.button>
        </form>

        {/* 1-Click Fictional Demo Accounts */}
        <div className="w-full pt-5 border-t border-border-subtle space-y-2.5">
          <span className="text-xs font-semibold text-text-muted block text-center">
            Masuk Cepat dengan Data Demo Fiktif
          </span>

          <div className="flex flex-col gap-2">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => handleQuickDemoLogin("siswa")}
              className="w-full min-h-12 px-4 rounded-2xl bg-bg-base hover:bg-bg-elevated border border-border text-text-main text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <IconStudent className="text-base text-primary-600" aria-hidden="true" />
                <span>Siswa · Rafi Pratama (Demo)</span>
              </span>
              <IconArrowRight className="text-sm text-text-muted" aria-hidden="true" />
            </motion.button>

            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => handleQuickDemoLogin("guru")}
              className="w-full min-h-12 px-4 rounded-2xl bg-bg-base hover:bg-bg-elevated border border-border text-text-main text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <IconTeacher className="text-base text-primary-600" aria-hidden="true" />
                <span>Guru · Wali Kelas VIII-A (Demo)</span>
              </span>
              <IconArrowRight className="text-sm text-text-muted" aria-hidden="true" />
            </motion.button>

            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => handleQuickDemoLogin("ortu")}
              className="w-full min-h-12 px-4 rounded-2xl bg-accent-50 hover:bg-accent-100 border border-accent-200 text-accent-800 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <IconParent className="text-base text-accent-600" aria-hidden="true" />
                <span>Orang Tua · Wali Siswa (Demo)</span>
              </span>
              <IconArrowRight className="text-sm text-accent-600" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}
