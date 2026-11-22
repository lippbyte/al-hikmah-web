import { motion } from "motion/react";
import { LuMenu, LuSquarePlus, LuHouse } from "react-icons/lu";

export default function ChatHeader({ onToggleSidebar, onNewChat, onHome }) {
  return (
    <header className="w-full px-4 md:px-6 py-3.5 flex items-center justify-between bg-bg-surface shrink-0 select-none z-10 border-b border-border/50">
      {/* Left: Hamburger menu icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        type="button"
        onClick={onToggleSidebar}
        className="p-1.5 -ml-1 text-text-main hover:text-text-muted hover:bg-bg-elevated transition-colors rounded-lg cursor-pointer"
        aria-label="Toggle menu riwayat"
        title="Toggle Riwayat Chat"
      >
        <LuMenu className="text-2xl" />
      </motion.button>

      {/* Right: Plus in square & Home icons */}
      <div className="flex items-center gap-2 md:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onNewChat}
          className="p-1.5 text-text-main hover:text-text-muted hover:bg-bg-elevated transition-colors rounded-lg cursor-pointer"
          aria-label="Chat baru"
          title="Chat Baru"
        >
          <LuSquarePlus className="text-2xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onHome}
          className="p-1.5 text-text-main hover:text-text-muted hover:bg-bg-elevated transition-colors rounded-lg cursor-pointer"
          aria-label="Beranda"
          title="Beranda"
        >
          <LuHouse className="text-2xl" />
        </motion.button>
      </div>
    </header>
  );
}
