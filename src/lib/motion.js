// Motion presets for Al Hikmah (opacity & transform only, <= 500ms except progress ring).
// Always wrapped with <MotionConfig reducedMotion="user"> at root.

export const ease = [0.22, 1, 0.36, 1];

export const page = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease },
  },
};

export const listItem = {
  initial: (i = 0) => (i < 10 ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }),
  animate: (i = 0) =>
    i < 10
      ? {
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.05, duration: 0.3, ease },
        }
      : { opacity: 1, y: 0 },
};

export const tapScale = { scale: 0.97 };

export const calendarCellHover = { y: -2 };

export const statusCheck = {
  initial: { scale: 0.6, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease },
  },
  exit: {
    scale: 0.6,
    opacity: 0,
    transition: { duration: 0.15, ease },
  },
};

export const tabPillTransition = {
  duration: 0.25,
  ease,
};

export const sheetBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease } },
  exit: { opacity: 0, transition: { duration: 0.18, ease } },
};

export const sheetPanel = {
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
  exit: {
    opacity: 0,
    y: 36,
    transition: { duration: 0.2, ease },
  },
};

export const toastMotion = {
  initial: { opacity: 0, y: -12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease },
  },
};

export const chatMessage = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease },
  },
};

export const progressRingTransition = {
  duration: 0.7,
  ease,
};
