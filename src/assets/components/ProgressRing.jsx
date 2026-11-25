import { motion } from "motion/react";
import { progressRingTransition } from "../../lib/motion";

export default function ProgressRing({
  value = 0,
  total = 5,
  size = 96,
  strokeWidth = 8,
  variant = "hero",
  label,
}) {
  const safeTotal = total > 0 ? total : 1;
  const clamped = Math.max(0, Math.min(value, safeTotal));
  const ratio = clamped / safeTotal;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - ratio);

  const isHero = variant === "hero";
  const trackClass = isHero ? "stroke-on-primary/20" : "stroke-bg-elevated";
  const indicatorClass = isHero ? "stroke-accent-200" : "stroke-primary-600";
  const textMainClass = isHero ? "text-on-primary" : "text-text-main";
  const textSubClass = isHero ? "text-on-primary/80" : "text-text-muted";

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={safeTotal}
      aria-label={label || `${clamped} dari ${safeTotal} selesai`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClass}
        />
        <motion.circle
          key={`${clamped}-${safeTotal}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={progressRingTransition}
          className={indicatorClass}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className={`font-display text-2xl font-bold leading-none ${textMainClass}`}>
          {clamped}
          <span className={`text-sm font-sans font-medium ${textSubClass}`}>
            /{safeTotal}
          </span>
        </span>
        <span className={`text-[11px] font-medium mt-1 ${textSubClass}`}>
          selesai
        </span>
      </div>
    </div>
  );
}
