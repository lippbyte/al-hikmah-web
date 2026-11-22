import { motion, AnimatePresence } from "motion/react";
import { LuX, LuUser, LuInfo, LuShieldCheck } from "react-icons/lu";

export default function SettingsModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-bg-surface border border-border rounded-2xl shadow-xl p-6 relative z-10 space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-text-main">
                  Pengaturan & Profil
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Informasi akun siswa dan status aplikasi
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={onClose}
                className="p-1.5 text-text-muted hover:text-text-main hover:bg-bg-elevated rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <LuX className="text-xl" />
              </motion.button>
            </div>

            {/* Profile Highlight Card */}
            <div className="p-4 rounded-xl bg-primary-surface border border-primary/20 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-2xs">
                F
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-text-main truncate">
                  Faris Faizulhaq Alakiyas
                </h4>
                <p className="text-xs text-text-muted truncate">
                  Siswa Kelas 8-B · NIS: 202408112
                </p>
                <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-primary">
                  <LuShieldCheck className="text-xs" />
                  <span>Akun Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Account Info Section */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/50 text-text-muted">
                <span>Sekolah</span>
                <span className="font-semibold text-text-main">SMP Al-Hikmah Surabaya</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50 text-text-muted">
                <span>Tahun Ajaran</span>
                <span className="font-semibold text-text-main">1448 H / 2026–2027</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50 text-text-muted">
                <span>Versi Aplikasi</span>
                <span className="text-text-main">Al-Hikmah Web v1.0.0 (Mode Terang)</span>
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-1 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Selesai
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
