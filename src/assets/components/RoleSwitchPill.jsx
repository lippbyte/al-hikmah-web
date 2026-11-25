import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/authStore";
import { tapScale } from "../../lib/motion";
import BottomSheet from "./BottomSheet";
import {
  IconTeacher,
  IconStudent,
  IconParent,
  IconChevronRight,
  IconSwitchRole,
  IconCheck,
} from "../../lib/icons";

export default function RoleSwitchPill() {
  const { currentUser, loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (location.pathname === "/login") return null;

  const handleSelectRole = (role) => {
    loginAs(role);
    if (role === "guru") navigate("/guru");
    else if (role === "siswa") navigate("/");
    else navigate("/orang-tua");
    setIsOpen(false);
  };

  const role = currentUser?.role || "siswa";
  const roleLabel =
    role === "guru"
      ? "Mode Guru"
      : role === "orang-tua"
      ? "Mode Wali"
      : "Mode Siswa";

  const roleOptions = [
    {
      key: "siswa",
      match: "siswa",
      label: "Akun Siswa (Rafi · Demo)",
      icon: IconStudent,
    },
    {
      key: "guru",
      match: "guru",
      label: "Akun Guru (Wali Kelas · Demo)",
      icon: IconTeacher,
    },
    {
      key: "ortu",
      match: "orang-tua",
      label: "Akun Orang Tua (Wali · Demo)",
      icon: IconParent,
    },
  ];

  return (
    <>
      <motion.button
        whileTap={tapScale}
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 min-h-12 px-4 rounded-full bg-bg-surface border border-border hover:bg-bg-elevated text-text-main text-xs font-semibold shadow-[var(--shadow-card)] transition-colors cursor-pointer"
        aria-label="Ganti akun demo"
      >
        <IconSwitchRole className="text-base text-primary-600" aria-hidden="true" />
        <span>{roleLabel}</span>
      </motion.button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Ganti Akun Demo"
        subtitle="Seluruh data berikut adalah contoh fiktif untuk pratinjau."
      >
        <div className="flex flex-col gap-2.5">
          {roleOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = role === opt.match;
            return (
              <motion.button
                key={opt.key}
                whileTap={tapScale}
                type="button"
                onClick={() => handleSelectRole(opt.key)}
                className={`w-full min-h-12 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer border ${
                  isActive
                    ? "bg-primary-600 border-primary-600 text-on-primary"
                    : "bg-bg-base border-border text-text-main hover:bg-bg-elevated"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="text-lg shrink-0" aria-hidden="true" />
                  <span>{opt.label}</span>
                </span>
                {isActive && <IconCheck className="text-lg shrink-0" aria-hidden="true" />}
              </motion.button>
            );
          })}

          <div className="pt-3 mt-1 border-t border-border-subtle">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="w-full min-h-12 px-4 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Ke Halaman Masuk</span>
              <IconChevronRight className="text-base" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
