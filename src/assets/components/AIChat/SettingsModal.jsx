import { motion } from "motion/react";
import BottomSheet from "../BottomSheet";
import { useAuth } from "../../../context/authStore";
import { DEMO_SCHOOL } from "../../../data/demoData";
import { tapScale } from "../../../lib/motion";

export default function SettingsModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Profil & Info Aplikasi"
      subtitle="Data berikut adalah contoh fiktif untuk pratinjau."
      maxWidthClass="sm:max-w-md"
    >
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-primary-50 border border-primary-200 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-primary-600 text-on-primary font-display font-bold flex items-center justify-center text-lg shrink-0">
            {currentUser?.avatar || "D"}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-text-main truncate">
              {currentUser?.name || "Akun Demo"}
            </h3>
            <p className="text-xs text-text-muted truncate">
              {currentUser?.title || "Data Contoh"}
            </p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-primary-700">
              Mode Terang · Data Demo
            </span>
          </div>
        </div>

        <dl className="space-y-2.5 text-xs">
          <div className="flex justify-between gap-2 py-2 border-b border-border-subtle text-text-muted">
            <dt>Sekolah (Contoh)</dt>
            <dd className="font-semibold text-text-main text-right">
              {currentUser?.school || DEMO_SCHOOL}
            </dd>
          </div>
          <div className="flex justify-between gap-2 py-2 border-b border-border-subtle text-text-muted">
            <dt>Tahun Ramadan</dt>
            <dd className="font-semibold text-text-main">1448 H / 2027</dd>
          </div>
          <div className="flex justify-between gap-2 py-2 border-b border-border-subtle text-text-muted">
            <dt>Catatan Fitur Tanya</dt>
            <dd className="font-medium text-text-main text-right">
              Contoh tampilan berdalil
            </dd>
          </div>
        </dl>

        <div className="pt-1 flex justify-end">
          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={onClose}
            className="min-h-12 px-6 bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            Selesai
          </motion.button>
        </div>
      </div>
    </BottomSheet>
  );
}
