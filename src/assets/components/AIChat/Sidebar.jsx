import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { TANYA_HISTORY } from "../../../data/demoData";
import { ease, sheetBackdrop, tapScale } from "../../../lib/motion";
import { IconClose } from "../../../lib/icons";

export default function Sidebar({
  isOpen,
  onClose,
  onSelectChat,
  isDesktop,
  hideFooterProfile = false,
  onOpenSettings,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = TANYA_HISTORY.map((group) => {
    const matchedItems = group.items.filter((item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, items: matchedItems };
  }).filter((group) => group.items.length > 0);

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full w-full gap-3">
      <div className="flex flex-col gap-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-display text-base font-bold text-text-main">
            Riwayat Contoh
          </span>
          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={onClose}
            className="w-11 h-11 -mr-1.5 rounded-2xl flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors cursor-pointer"
            aria-label="Tutup riwayat Tanya"
          >
            <IconClose className="text-xl" aria-hidden="true" />
          </motion.button>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-none">
          {filteredHistory.map((group) => (
            <div key={group.period} className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted px-2 select-none">
                {group.period}
              </div>

              <div className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={tapScale}
                    type="button"
                    onClick={() => onSelectChat(item)}
                    className="w-full min-h-12 text-left px-3 py-2 text-text-main hover:bg-bg-elevated rounded-xl text-xs md:text-sm truncate transition-colors cursor-pointer select-none"
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="py-6 text-center text-xs text-text-muted">
              Tidak ada riwayat yang cocok.
            </div>
          )}
        </div>
      </div>

      {!hideFooterProfile && (
        <div className="pt-2 border-t border-border-subtle">
          <Profile onOpenSettings={onOpenSettings} />
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease }}
            aria-label="Panel riwayat Tanya"
            className="w-[268px] h-full bg-bg-surface border-r border-border flex flex-col justify-between p-4 shrink-0 z-20"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            {...sheetBackdrop}
            onClick={onClose}
            className="fixed inset-0 bg-scrim/45 z-40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease }}
            aria-label="Drawer riwayat Tanya"
            className="fixed inset-y-0 left-0 w-[84%] max-w-[320px] bg-bg-surface z-50 shadow-[var(--shadow-elevated)] flex flex-col justify-between p-4 border-r border-border h-full"
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
