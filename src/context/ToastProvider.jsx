import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ToastContext } from "./toastStore";
import { toastMotion } from "../lib/motion";
import { IconCheckCircleFill, IconInfo, IconWarningCircle } from "../lib/icons";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const dismissToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message, tone = "success") => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ id: Date.now(), message, tone });
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toneStyles = {
    success: "bg-bg-surface border-success-200 text-text-main",
    info: "bg-bg-surface border-border text-text-main",
    accent: "bg-accent-50 border-accent-200 text-accent-800",
  };

  const renderIcon = (tone) => {
    if (tone === "accent") {
      return <IconWarningCircle className="text-lg text-accent-600 shrink-0" aria-hidden="true" />;
    }
    if (tone === "info") {
      return <IconInfo className="text-lg text-primary-600 shrink-0" aria-hidden="true" />;
    }
    return <IconCheckCircleFill className="text-lg text-success-600 shrink-0" aria-hidden="true" />;
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none no-print"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              {...toastMotion}
              role="status"
              className={`pointer-events-auto flex items-center gap-2.5 max-w-md w-auto px-4 py-3 rounded-2xl border shadow-[var(--shadow-elevated)] text-sm font-medium ${
                toneStyles[toast.tone] || toneStyles.success
              }`}
            >
              {renderIcon(toast.tone)}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
