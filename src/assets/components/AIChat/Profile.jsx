import { motion } from "motion/react";
import { LuEllipsis } from "react-icons/lu";

export default function Profile({ onOpenSettings }) {
  return (
    <div className="flex items-center gap-3 w-full py-1">
      {/* Orange/Accent circle avatar with letter F */}
      <div className="w-9 h-9 rounded-full bg-accent text-white font-semibold flex items-center justify-center text-sm shrink-0 select-none shadow-xs">
        F
      </div>
      <p className="text-sm font-medium text-text-main truncate flex-1 select-none">
        Faris Faizulhaq Alakiyas
      </p>
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={onOpenSettings}
        className="p-1.5 text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors rounded-lg shrink-0 cursor-pointer"
        aria-label="Pengaturan aplikasi"
        title="Pengaturan"
      >
        <LuEllipsis className="text-xl" />
      </motion.button>
    </div>
  );
}
