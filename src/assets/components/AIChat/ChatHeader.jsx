import { motion } from "motion/react";
import { tapScale } from "../../../lib/motion";
import { IconMenu, IconNewChat, IconHome } from "../../../lib/icons";

export default function ChatHeader({ onToggleSidebar, onNewChat, onHome }) {
  return (
    <header className="w-full px-3 md:px-6 py-2 flex items-center justify-between bg-bg-surface shrink-0 select-none z-10 border-b border-border">
      <div className="flex items-center gap-2">
        {/* Toggle Riwayat Tanya */}
        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={onToggleSidebar}
          className="w-12 h-12 flex items-center justify-center text-text-main hover:bg-bg-elevated transition-colors rounded-2xl cursor-pointer"
          aria-label="Buka atau tutup riwayat Tanya"
          title="Riwayat Tanya"
        >
          <IconMenu className="text-2xl" aria-hidden="true" />
        </motion.button>

        <div className="pl-1">
          <h1 className="font-display text-lg font-bold text-text-main leading-tight">
            Tanya
          </h1>
          <p className="text-[11px] text-text-muted leading-none mt-0.5">
            Rujukan awal kegiatan Ramadan
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={onNewChat}
          className="w-12 h-12 flex items-center justify-center text-text-main hover:bg-bg-elevated transition-colors rounded-2xl cursor-pointer"
          aria-label="Mulai percakapan baru"
          title="Percakapan baru"
        >
          <IconNewChat className="text-2xl" aria-hidden="true" />
        </motion.button>

        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={onHome}
          className="w-12 h-12 flex items-center justify-center text-text-main hover:bg-bg-elevated transition-colors rounded-2xl cursor-pointer"
          aria-label="Kembali ke beranda"
          title="Beranda"
        >
          <IconHome className="text-2xl" aria-hidden="true" />
        </motion.button>
      </div>
    </header>
  );
}
