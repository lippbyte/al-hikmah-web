import { AnimatePresence, motion } from "motion/react";
import { chatMessage, tapScale } from "../../../lib/motion";
import { TANYA_HISTORY } from "../../../data/demoData";
import { IconBookOpenText, IconInfo } from "../../../lib/icons";

function TypingIndicator() {
  return (
    <motion.div
      {...chatMessage}
      className="flex justify-start"
      role="status"
      aria-label="Sedang menyiapkan jawaban contoh"
    >
      <div className="bg-bg-surface border border-border rounded-2xl px-4 py-3.5 shadow-[var(--shadow-card)] inline-flex items-center gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="w-2 h-2 rounded-full bg-primary-600"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SampleAnswerCard({ sample }) {
  return (
    <div className="w-full bg-bg-surface border border-border rounded-[1.5rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200">
          <IconBookOpenText className="text-sm text-accent-500" aria-hidden="true" />
          <span>{sample.badge || "Contoh tampilan"}</span>
        </span>
      </div>

      <p className="text-sm md:text-[15px] text-text-main leading-relaxed">
        {sample.summary}
      </p>

      {/* Dalil Block (Arabic RTL + Translation + Reference) */}
      <div className="bg-bg-base border border-border-subtle rounded-2xl p-4 space-y-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
          Rujukan Dalil
        </span>
        {sample.dalilArabic && (
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-xl md:text-2xl text-text-main leading-loose text-right"
          >
            {sample.dalilArabic}
          </p>
        )}
        <p className="text-xs md:text-sm text-text-main italic leading-relaxed">
          {sample.dalilTranslation}
        </p>
        <p className="text-xs font-semibold text-primary-700">
          {sample.dalilSource}
        </p>
      </div>

      {/* Reminder to consult teacher / parent */}
      <div className="flex items-start gap-2 text-xs text-text-muted pt-1 border-t border-border-subtle">
        <IconInfo className="text-sm text-accent-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{sample.note}</p>
      </div>
    </div>
  );
}

export default function ChatMessages({
  messages = [],
  isTyping = false,
  onQuickPrompt,
}) {
  const quickItems = TANYA_HISTORY[0]?.items || [];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4 scrollbar-none flex flex-col justify-start">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 my-auto flex flex-col items-center justify-center text-center gap-5 py-10 select-none"
          >
            <div className="space-y-1.5 max-w-md">
              <h2 className="font-display text-xl md:text-2xl font-bold text-text-main">
                Ada yang ingin kamu pelajari hari ini?
              </h2>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                Pilih salah satu topik contoh berikut atau tulis pertanyaanmu
                sendiri.
              </p>
            </div>

            {onQuickPrompt && (
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                {quickItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={tapScale}
                    type="button"
                    onClick={() => onQuickPrompt(item)}
                    className="min-h-12 px-4 py-2 rounded-full bg-bg-surface border border-border hover:border-primary-300 text-xs md:text-sm font-medium text-text-main shadow-[var(--shadow-card)] transition-colors cursor-pointer"
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <div key="messages-list" className="space-y-4 w-full">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                {...chatMessage}
                className={
                  msg.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                {msg.role === "user" ? (
                  <div className="bg-primary-600 text-on-primary px-4.5 py-3 rounded-2xl rounded-br-md max-w-[85%] md:max-w-[72%] text-sm md:text-base leading-relaxed shadow-[var(--shadow-card)]">
                    {msg.content}
                  </div>
                ) : (
                  <SampleAnswerCard sample={msg.sample} />
                )}
              </motion.div>
            ))}

            {isTyping && <TypingIndicator />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
