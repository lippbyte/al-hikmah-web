import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ease, tabPillTransition } from "../../lib/motion";

export default function DraggableBottomNav({ tabs, layoutId, ariaLabel }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const trackRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.match(pathname))
  );
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  const getIndexFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return activeIndex;
    const rect = el.getBoundingClientRect();
    const relX = Math.max(0, Math.min(clientX - rect.left, rect.width - 1));
    const idx = Math.floor((relX / rect.width) * tabs.length);
    return Math.max(0, Math.min(tabs.length - 1, idx));
  };

  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setHoverIndex(getIndexFromClientX(e.clientX));
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const nextIdx = getIndexFromClientX(e.clientX);
    if (nextIdx !== hoverIndex) {
      setHoverIndex(nextIdx);
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    const finalIdx = getIndexFromClientX(e.clientX);
    setIsDragging(false);
    setHoverIndex(null);
    const target = tabs[finalIdx];
    if (target && target.path !== pathname) {
      navigate(target.path);
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setHoverIndex(null);
  };

  const gridColsClass =
    tabs.length === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <nav
      aria-label={ariaLabel}
      className="lg:hidden fixed bottom-3 inset-x-3 max-w-md mx-auto px-2 py-1.5 bg-bg-surface/95 backdrop-blur-md border border-border rounded-[1.5rem] shadow-[var(--shadow-nav)] z-30 select-none no-print"
    >
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`grid ${gridColsClass} gap-2 touch-none cursor-grab active:cursor-grabbing`}
      >
        {tabs.map((tab, idx) => {
          const isFocused = displayIndex === idx;
          const isCurrentPage = activeIndex === idx;
          const Icon = isFocused ? tab.activeIcon : tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (!isDragging && tab.path !== pathname) {
                  navigate(tab.path);
                }
              }}
              aria-current={isCurrentPage ? "page" : undefined}
              className={`relative min-h-12 px-2 py-1.5 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-xs transition-colors cursor-pointer ${
                isFocused
                  ? "text-primary-700 font-semibold"
                  : "text-text-muted hover:text-text-main font-medium"
              }`}
            >
              {isFocused && (
                <motion.span
                  layoutId={layoutId}
                  transition={tabPillTransition}
                  className={`absolute inset-0 rounded-2xl border ${
                    isDragging
                      ? "bg-primary-100 border-primary-300 shadow-[var(--shadow-card)]"
                      : "bg-primary-100 border-primary-200/80"
                  }`}
                  aria-hidden="true"
                />
              )}

              <motion.span
                animate={
                  isDragging && isFocused
                    ? { y: -2, scale: 1.08 }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.16, ease }}
                className="relative z-10 flex flex-col items-center gap-0.5 pointer-events-none"
              >
                <Icon className="text-xl" aria-hidden="true" />
                <span className="leading-none truncate max-w-full">
                  {tab.label}
                </span>
              </motion.span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
