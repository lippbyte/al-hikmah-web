import React from "react";
import { motion, AnimatePresence } from "motion/react";

// Helper function to render text with **bold** and *italic* formatting
function renderFormattedText(text) {
  const paragraphs = text.split("\n\n");

  return paragraphs.map((paragraph, pIdx) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        parts.push(paragraph.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={`${pIdx}-${match.index}`} className="font-bold text-text-main">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("*") && token.endsWith("*")) {
        parts.push(
          <em key={`${pIdx}-${match.index}`} className="italic">
            {token.slice(1, -1)}
          </em>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < paragraph.length) {
      parts.push(paragraph.substring(lastIndex));
    }

    return (
      <p key={pIdx} className="text-text-main text-[13.5px] md:text-[15px] leading-relaxed">
        {parts}
      </p>
    );
  });
}

export default function ChatMessages({ messages = [], emptyStateText = "Ada yang mau kamu pelajari?" }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 scrollbar-none flex flex-col justify-start">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex-1 my-auto flex items-center justify-center select-none py-16"
          >
            <h2 className="text-text-main text-lg md:text-2xl font-normal text-center">
              {emptyStateText}
            </h2>
          </motion.div>
        ) : (
          <div className="space-y-4 w-full">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                {msg.role === "user" ? (
                  <div className="bg-border text-text-main px-4.5 py-2.5 rounded-2xl max-w-[85%] md:max-w-[70%] text-sm md:text-base leading-relaxed shadow-2xs font-normal">
                    {msg.content}
                  </div>
                ) : (
                  <div className="w-full bg-bg-surface border border-border rounded-2xl p-4.5 md:p-6 shadow-xs space-y-3.5">
                    {renderFormattedText(msg.content)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
