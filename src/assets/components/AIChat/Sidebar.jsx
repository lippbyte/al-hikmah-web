import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuSlidersHorizontal, LuMenu } from "react-icons/lu";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const DEFAULT_HISTORY = [
  {
    period: "Hari ini",
    hasFilterIcon: true,
    items: [
      { id: "h1", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h2", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h3", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h4", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h5", text: "Apa hukumnya wudu pake air kopi" },
    ],
  },
  {
    period: "8 Hari",
    hasFilterIcon: false,
    items: [
      { id: "h6", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h7", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h8", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h9", text: "Apa hukumnya wudu pake air kopi" },
    ],
  },
  {
    period: "Sep 2026",
    hasFilterIcon: false,
    items: [
      { id: "h10", text: "Apa hukumnya wudu pake air kopi" },
      { id: "h11", text: "Apa hukumnya wudu pake air kopi" },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, onSelectChat, isDesktop, onOpenSettings }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter history items by search query
  const filteredHistory = DEFAULT_HISTORY.map((group) => {
    const matchedItems = group.items.filter((item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, items: matchedItems };
  }).filter((group) => group.items.length > 0);

  // Common sidebar inner content
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-3 flex-1 overflow-hidden">
        {/* Search bar */}
        <div className="pt-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-none mt-1">
          {filteredHistory.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {/* Header row */}
              {group.hasFilterIcon ? (
                <div className="flex items-center justify-between text-xs text-text-muted px-1 py-1 select-none">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="text-text-muted hover:text-text-main transition-colors cursor-pointer"
                    title="Filter riwayat"
                    aria-label="Filter riwayat"
                  >
                    <LuSlidersHorizontal className="text-sm" />
                  </motion.button>
                  <span>{group.period}</span>
                </div>
              ) : (
                <div className="text-xs text-text-muted px-1 pt-2 pb-1 select-none">
                  {group.period}
                </div>
              )}

              {/* Chat items */}
              <div className="flex flex-col space-y-0.5">
                {group.items.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectChat(item.text)}
                    className="w-full text-left py-1.5 px-2 text-text-main hover:bg-bg-elevated rounded-lg text-[13.5px] truncate transition-colors cursor-pointer select-none"
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="py-6 text-center text-xs text-text-muted">
              Tidak ada riwayat chat ditemukan.
            </div>
          )}
        </div>
      </div>

      {/* Profile section at bottom */}
      <div className="pt-2 border-t border-border mt-2">
        <Profile onOpenSettings={onOpenSettings} />
      </div>
    </div>
  );

  // Desktop view: Docked collapsible sidebar
  if (isDesktop) {
    return (
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="h-full bg-bg-surface border-r border-border flex flex-col justify-between overflow-hidden shrink-0 z-20"
      >
        <div className="w-[280px] h-full p-4 flex flex-col justify-between">
          {sidebarContent}
        </div>
      </motion.aside>
    );
  }

  // Mobile/Tablet view: Animated Drawer overlay with backdrop
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-[1px]"
            aria-hidden={!isOpen}
          >
            {/* Hamburger icon on the exposed right strip to close the sidebar */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-4 p-1.5 text-text-main hover:text-text-muted transition-colors z-50 cursor-pointer"
              aria-label="Tutup menu riwayat"
            >
              <LuMenu className="text-2xl" />
            </motion.button>
          </motion.div>

          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 w-[82%] max-w-[340px] bg-bg-surface z-50 shadow-2xl flex flex-col justify-between p-4 border-r border-border h-full"
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
