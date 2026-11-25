import { motion } from "motion/react";
import { useNavLayout } from "../../../context/navStore";
import { tapScale } from "../../../lib/motion";
import {
  IconMenu,
  IconNewChat,
  IconHome,
  IconSidebar,
} from "../../../lib/icons";

export default function ChatHeader({ onToggleSidebar, onNewChat, onHome }) {
  const { isDesktopNavOpen, toggleDesktopNav } = useNavLayout();

  return (
    <header className="w-full px-3 md:px-6 py-2 flex items-center justify-between bg-bg-surface shrink-0 select-none z-10 border-b border-border">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Toggle Main Desktop Navbar */}
        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={toggleDesktopNav}
          className="hidden lg:flex w-12 h-12 items-center justify-center text-text-main hover:bg-bg-elevated transition-colors rounded-2xl cursor-pointer"
          aria-label={isDesktopNavOpen ? "Tutup menu utama" : "Buka menu utama"}
          title={isDesktopNavOpen ? "Tutup menu utama" : "Buka menu utama"}
        >
          <IconSidebar
            className={`text-xl ${
              isDesktopNavOpen ? "text-primary-600" : "text-text-main"
            }`}
            aria-hidden="true"
          />
        </motion.button>

        {/* Toggle Chatbot History Sidebar */}
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
          aria-label="Mulai pertanyaan baru"
          title="Pertanyaan baru"
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
