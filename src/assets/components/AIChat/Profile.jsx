import { motion } from "motion/react";
import { useAuth } from "../../../context/authStore";
import { tapScale } from "../../../lib/motion";
import { IconMore } from "../../../lib/icons";

export default function Profile({ onOpenSettings }) {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center gap-3 w-full py-1">
      <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 text-primary-700 font-semibold flex items-center justify-center text-sm shrink-0 select-none">
        {currentUser?.avatar || "D"}
      </div>
      <div className="min-w-0 flex-1 select-none">
        <p className="text-xs font-semibold text-text-main truncate">
          {currentUser?.name || "Akun Demo"}
        </p>
        <p className="text-[11px] text-text-muted truncate">
          {currentUser?.title || "Data Contoh"}
        </p>
      </div>
      <motion.button
        whileTap={tapScale}
        type="button"
        onClick={onOpenSettings}
        className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors rounded-2xl shrink-0 cursor-pointer"
        aria-label="Info akun dan aplikasi"
        title="Info akun"
      >
        <IconMore className="text-xl" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
