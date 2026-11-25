import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease, tapScale } from "../../../lib/motion";
import {
  IconPlusCircle,
  IconClose,
  IconMic,
  IconSend,
  IconCamera,
  IconGallery,
  IconDocument,
} from "../../../lib/icons";

export default function ChatInput({ input, setInput, onSend }) {
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handleSendWithAttachments = () => {
    if (!input.trim() && attachedFiles.length === 0) return;
    onSend(attachedFiles);
    setAttachedFiles([]);
    setIsAttachmentsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendWithAttachments();
    }
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newAttachments = files.map((f) => ({
        name: f.name,
        type,
        size: `${(f.size / 1024).toFixed(1)} KB`,
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
    <div className="p-4 md:px-6 md:pb-5 pt-2 w-full bg-bg-base shrink-0">
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

      <div className="w-full bg-bg-surface rounded-[1.5rem] border border-border shadow-[var(--shadow-card)] p-3.5 md:p-4 flex flex-col justify-between transition-colors focus-within:border-primary-600">
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2.5 pb-2 border-b border-border-subtle">
            {attachedFiles.map((file, idx) => (
              <span
                key={`${file.name}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-elevated text-text-main text-xs font-medium"
              >
                <span className="truncate max-w-[140px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  aria-label={`Hapus lampiran ${file.name}`}
                  className="text-text-muted hover:text-text-main p-0.5 rounded-full cursor-pointer"
                >
                  <IconClose className="text-xs" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        )}

        <label htmlFor="tanya-input" className="sr-only">
          Tulis pertanyaan
        </label>
        <textarea
          id="tanya-input"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis pertanyaan seputar kegiatan Ramadan..."
          className="w-full bg-transparent border-none outline-none text-text-main placeholder:text-text-muted text-sm md:text-base resize-none leading-relaxed"
        />

        <div className="flex items-center justify-end gap-2 mt-2">
          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={() => setIsAttachmentsOpen((prev) => !prev)}
            className="w-12 h-12 text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors rounded-full cursor-pointer flex items-center justify-center"
            aria-label={isAttachmentsOpen ? "Tutup lampiran" : "Tambah lampiran"}
            title={isAttachmentsOpen ? "Tutup pilihan" : "Tambah lampiran"}
          >
            {isAttachmentsOpen ? (
              <IconClose className="text-xl" aria-hidden="true" />
            ) : (
              <IconPlusCircle className="text-2xl" aria-hidden="true" />
            )}
          </motion.button>

          <motion.button
            whileTap={tapScale}
            type="button"
            className="w-12 h-12 text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors rounded-full cursor-pointer flex items-center justify-center"
            aria-label="Rekam suara"
            title="Rekam suara"
          >
            <IconMic className="text-xl" aria-hidden="true" />
          </motion.button>

          <motion.button
            whileTap={tapScale}
            type="button"
            disabled={!hasContent}
            onClick={handleSendWithAttachments}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              hasContent
                ? "bg-primary-600 hover:bg-primary-700 text-on-primary shadow-[var(--shadow-card)] cursor-pointer"
                : "bg-bg-elevated text-text-muted cursor-not-allowed"
            }`}
            aria-label="Kirim pertanyaan"
            title="Kirim"
          >
            <IconSend className="text-xl" aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* Attachment Options */}
      <AnimatePresence>
        {isAttachmentsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease }}
            className="grid grid-cols-3 gap-3 mt-3"
          >
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="min-h-[84px] bg-bg-surface border border-border rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 shadow-[var(--shadow-card)] hover:border-primary-300 hover:bg-bg-elevated transition-colors cursor-pointer select-none"
            >
              <IconCamera className="text-2xl text-primary-600" aria-hidden="true" />
              <span className="text-xs font-medium text-text-main">Kamera</span>
            </motion.button>

            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="min-h-[84px] bg-bg-surface border border-border rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 shadow-[var(--shadow-card)] hover:border-primary-300 hover:bg-bg-elevated transition-colors cursor-pointer select-none"
            >
              <IconGallery className="text-2xl text-primary-600" aria-hidden="true" />
              <span className="text-xs font-medium text-text-main">Galeri</span>
            </motion.button>

            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => documentInputRef.current?.click()}
              className="min-h-[84px] bg-bg-surface border border-border rounded-2xl py-3.5 px-3 flex flex-col items-center justify-center gap-1.5 shadow-[var(--shadow-card)] hover:border-primary-300 hover:bg-bg-elevated transition-colors cursor-pointer select-none"
            >
              <IconDocument className="text-2xl text-primary-600" aria-hidden="true" />
              <span className="text-xs font-medium text-text-main">Dokumen</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
