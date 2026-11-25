import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sheetBackdrop, sheetPanel, tapScale } from "../../lib/motion";
import { IconClose } from "../../lib/icons";

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidthClass = "sm:max-w-lg",
  children,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleDragEnd = (_event, info) => {
    if (info.offset.y > 80 || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title || "Dialog"}
        >
          {/* Backdrop */}
          <motion.div
            {...sheetBackdrop}
            onClick={onClose}
            className="fixed inset-0 bg-scrim/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Draggable Sheet / Modal Container */}
          <motion.div
            {...sheetPanel}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={handleDragEnd}
            className={`relative z-10 w-full ${maxWidthClass} bg-bg-surface border border-border rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-[var(--shadow-elevated)] max-h-[90vh] flex flex-col overflow-hidden`}
          >
            {/* Mobile Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1.5 rounded-full bg-border" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-3 sm:pt-5 pb-4 border-b border-border-subtle shrink-0">
              <div className="min-w-0">
                {title && (
                  <h2 className="font-display text-lg sm:text-xl font-bold text-text-main leading-snug">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={onClose}
                className="w-12 h-12 -mr-2 -mt-2 rounded-full flex items-center justify-center text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
                aria-label="Tutup dialog"
              >
                <IconClose className="text-xl" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Scrollable Body */}
            <div className="px-5 sm:px-6 py-5 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
