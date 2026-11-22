import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuCirclePlus,
  LuX,
  LuMic,
  LuSend,
  LuCamera,
  LuImages,
  LuFileUp,
} from "react-icons/lu";

export default function ChatInput({ input, setInput, onSend }) {
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendWithAttachments();
    }
  };

  const handleSendWithAttachments = () => {
    if (!input.trim() && attachedFiles.length === 0) return;
    onSend(attachedFiles);
    setAttachedFiles([]);
    setIsAttachmentsOpen(false);
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newAttachments = files.map((f) => ({
        name: f.name,
        type,
        size: (f.size / 1024).toFixed(1) + " KB",
      }));
      setAttachedFiles((prev) => [...prev, ...newAttachments]);
      setIsAttachmentsOpen(false);
    }
  };

  const removeAttachment = (indexToRemove) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const hasContent = Boolean(input.trim()) || attachedFiles.length > 0;

  return (
    <div className="p-4 md:p-6 pt-1 w-full bg-transparent shrink-0">
      {/* Hidden file inputs for functional triggers */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileChange(e, "camera")}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileChange(e, "gallery")}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={(e) => handleFileChange(e, "document")}
      />

      {/* Floating rounded card box */}
      <div className="w-full bg-bg-surface rounded-2xl border border-border shadow-xs p-3.5 md:p-4 flex flex-col justify-between min-h-[96px] md:min-h-[105px] transition-all focus-within:border-primary/60 focus-within:shadow-md">
        {/* Attached files preview tags */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2 pb-1 border-b border-border/50">
            {attachedFiles.map((file, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-elevated text-text-main text-xs"
              >
                <span className="truncate max-w-[140px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  className="text-text-muted hover:text-text-main p-0.5 rounded-full"
                >
                  <LuX className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        )}

        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan atau tahan untuk berbicara"
          className="w-full bg-transparent border-none outline-none text-text-main placeholder:text-text-muted text-sm md:text-base resize-none leading-relaxed"
        />

        {/* Bottom actions: Toggle Attachments & Mic icons */}
        <div className="flex items-center justify-end gap-2.5 mt-2">
          {/* Toggle button: CirclePlus when closed, X when open */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setIsAttachmentsOpen((prev) => !prev)}
            className="text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors p-1 rounded-full cursor-pointer"
            aria-label={isAttachmentsOpen ? "Tutup lampiran" : "Buka pilihan lampiran"}
            title={isAttachmentsOpen ? "Tutup pilihan" : "Tambah lampiran"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isAttachmentsOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <LuX className="text-[22px]" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <LuCirclePlus className="text-[22px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors p-1 rounded-full cursor-pointer"
            aria-label="Tahan untuk berbicara"
            title="Tahan untuk berbicara"
          >
            <LuMic className="text-[22px]" />
          </motion.button>

          {hasContent && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handleSendWithAttachments}
              className="bg-primary hover:bg-primary-hover text-white p-1.5 rounded-xl cursor-pointer shadow-xs transition-colors ml-1"
              aria-label="Kirim pesan"
              title="Kirim Pesan"
            >
              <LuSend className="text-lg" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Attachment Options Row (Kamera, Galeri, Dokumen) matching design image */}
      <AnimatePresence>
        {isAttachmentsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid grid-cols-3 gap-3 md:gap-4 mt-3 overflow-hidden"
          >
            {/* 1. Kamera */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="bg-bg-surface border border-border rounded-2xl py-4 px-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-primary/50 hover:bg-bg-elevated transition-all cursor-pointer select-none"
            >
              <LuCamera className="text-2xl md:text-3xl text-text-muted" />
              <span className="text-sm font-normal text-text-muted">Kamera</span>
            </motion.button>

            {/* 2. Galeri */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="bg-bg-surface border border-border rounded-2xl py-4 px-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-primary/50 hover:bg-bg-elevated transition-all cursor-pointer select-none"
            >
              <LuImages className="text-2xl md:text-3xl text-text-muted" />
              <span className="text-sm font-normal text-text-muted">Galeri</span>
            </motion.button>

            {/* 3. Dokumen */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => documentInputRef.current?.click()}
              className="bg-bg-surface border border-border rounded-2xl py-4 px-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-primary/50 hover:bg-bg-elevated transition-all cursor-pointer select-none"
            >
              <LuFileUp className="text-2xl md:text-3xl text-text-muted" />
              <span className="text-sm font-normal text-text-muted">Dokumen</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
