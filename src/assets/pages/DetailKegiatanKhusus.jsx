import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import BottomSheet from "../components/BottomSheet";
import { useAppData } from "../../context/appDataStore";
import { useToast } from "../../context/toastStore";
import { page, statusCheck, tapScale } from "../../lib/motion";
import {
  IconArrowLeft,
  IconCheckBold,
  IconCircle,
  IconSparkleFill,
  IconClock,
  IconNotebook,
  IconPlus,
  IconTrash,
  IconChevronDown,
} from "../../lib/icons";

export default function DetailKegiatanKhusus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    kegiatanKhusus,
    saveKegiatanKhususResponse,
    addFieldToKegiatan,
    removeFieldFromKegiatan,
  } = useAppData();
  const { showToast } = useToast();

  const currentItem =
    kegiatanKhusus.find((item) => item.id === id) || kegiatanKhusus[0];

  const [participationStatus, setParticipationStatus] = useState(
    currentItem.status || "belum"
  );
  const [responses, setResponses] = useState(currentItem.responses || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Admin custom element builder modal
  const [isAdminFieldOpen, setIsAdminFieldOpen] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("textarea");

  const updateFieldValue = (fieldId, val) => {
    setResponses((prev) => ({ ...prev, [fieldId]: val }));
  };

  const toggleChip = (fieldId, chipVal) => {
    const existing = Array.isArray(responses[fieldId]) ? responses[fieldId] : [];
    const next = existing.includes(chipVal)
      ? existing.filter((x) => x !== chipVal)
      : [...existing, chipVal];
    updateFieldValue(fieldId, next);
  };

  const handleSave = () => {
    saveKegiatanKhususResponse(currentItem.id, participationStatus, responses);
    setSavedSuccess(true);
    showToast(`Catatan ${currentItem.title} berhasil disimpan.`);
  };

  const handleAddAdminField = (e) => {
    e.preventDefault();
    if (!newFieldLabel.trim()) return;
    addFieldToKegiatan(currentItem.id, {
      type: newFieldType,
      label: newFieldLabel.trim(),
      placeholder: "Isi sesuai arahan sekolah...",
    });
    setNewFieldLabel("");
    setIsAdminFieldOpen(false);
    showToast("Elemen formulir baru ditambahkan (Hak Admin).");
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-16 lg:pb-12 gap-6">
        <header className="flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3.5">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => navigate("/kegiatan-khusus")}
              className="w-12 h-12 rounded-2xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-[var(--shadow-card)] hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
              aria-label="Kembali ke Kegiatan Khusus"
            >
              <IconArrowLeft className="text-xl" aria-hidden="true" />
            </motion.button>

            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
                Detail Kegiatan
              </h1>
              <p className="text-xs md:text-sm text-text-muted mt-0.5">
                Elemen formulir disesuaikan oleh Admin Sekolah
              </p>
            </div>
          </div>

          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={() => setIsAdminFieldOpen(true)}
            className="min-h-12 px-4 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-xs font-semibold flex items-center gap-1.5 shadow-[var(--shadow-card)] transition-colors cursor-pointer shrink-0"
          >
            <IconPlus className="text-sm text-primary-600" aria-hidden="true" />
            <span className="hidden sm:inline">Tambah Elemen (Admin)</span>
          </motion.button>
        </header>

        <AnimatePresence mode="wait">
          {savedSuccess ? (
            <motion.section
              key="saved-confirm"
              {...page}
              className="w-full max-w-xl mx-auto bg-bg-surface border border-border rounded-[1.75rem] p-6 md:p-8 shadow-[var(--shadow-card)] flex flex-col items-center text-center gap-5 my-2"
            >
              <motion.div
                {...statusCheck}
                className="w-16 h-16 rounded-full bg-success-50 border-2 border-success-200 flex items-center justify-center text-success-600 text-3xl"
              >
                <IconCheckBold aria-hidden="true" />
              </motion.div>

              <div className="space-y-1.5">
                <h2 className="font-display text-xl md:text-2xl font-bold text-text-main">
                  Catatan Kegiatan Tersimpan
                </h2>
                <p className="text-sm text-text-muted max-w-sm mx-auto">
                  Catatan untuk{" "}
                  <span className="font-semibold text-text-main">
                    {currentItem.title}
                  </span>{" "}
                  sudah diperbarui.
                </p>
              </div>

              {currentItem.savedAt && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-base border border-border text-xs text-text-main font-medium">
                  <IconClock
                    className="text-primary-600 text-base"
                    aria-hidden="true"
                  />
                  <span>{currentItem.savedAt}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate("/kegiatan-khusus")}
                  className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold transition-colors cursor-pointer"
                >
                  Kembali ke Daftar
                </motion.button>
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => setSavedSuccess(false)}
                  className="w-full min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold transition-colors cursor-pointer"
                >
                  Ubah Lagi
                </motion.button>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="detail-form"
              {...page}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
                <div className="w-full bg-bg-surface border border-border rounded-[1.75rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-5">
                  <div className="space-y-1.5 select-none">
                    <span className="text-xs font-semibold text-accent-700">
                      {currentItem.tag}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-text-main leading-tight">
                      {currentItem.title}
                    </h2>
                    <p className="text-xs md:text-sm text-text-muted">
                      {currentItem.dateRange}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Arahan Sekolah
                    </span>
                    <p className="text-sm text-text-main leading-relaxed">
                      {currentItem.arahan}
                    </p>
                  </div>

                  {/* Dynamic Admin-Configured Fields */}
                  <div className="space-y-4 pt-2 border-t border-border-subtle">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Elemen Tinjauan Sekolah
                      </span>
                      <span className="text-[11px] text-text-muted">
                        Dikonfigurasi Admin
                      </span>
                    </div>

                    {(currentItem.fields || []).map((field) => {
                      if (field.type === "chips") {
                        const selected = Array.isArray(responses[field.id])
                          ? responses[field.id]
                          : field.options || [];
                        return (
                          <div
                            key={field.id}
                            className="bg-accent-50 border border-accent-200 rounded-2xl p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-accent-800 uppercase tracking-wider">
                                {field.label}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  removeFieldFromKegiatan(currentItem.id, field.id)
                                }
                                aria-label={`Hapus elemen ${field.label}`}
                                className="text-text-muted hover:text-danger-600 p-1 rounded-lg cursor-pointer"
                              >
                                <IconTrash className="text-sm" aria-hidden="true" />
                              </button>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                              {(field.options || [21, 23, 25, 27, 29]).map((night) => {
                                const isSelected = selected.includes(night);
                                return (
                                  <motion.button
                                    key={night}
                                    whileTap={tapScale}
                                    type="button"
                                    onClick={() => toggleChip(field.id, night)}
                                    aria-pressed={isSelected}
                                    className={`min-h-12 rounded-2xl text-sm font-bold text-center border transition-colors cursor-pointer ${
                                      isSelected
                                        ? "bg-accent-100 border-accent-500 text-accent-900"
                                        : "bg-bg-surface border-border text-text-muted"
                                    }`}
                                  >
                                    {night}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      if (field.type === "attendance") {
                        const val = responses[field.id] || "hadir";
                        return (
                          <div key={field.id} className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-text-main">
                                {field.label}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  removeFieldFromKegiatan(currentItem.id, field.id)
                                }
                                aria-label={`Hapus elemen ${field.label}`}
                                className="text-text-muted hover:text-danger-600 p-1 rounded-lg cursor-pointer"
                              >
                                <IconTrash className="text-sm" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: "hadir", label: "Hadir" },
                                { id: "berhalangan", label: "Berhalangan" },
                                { id: "tidak_hadir", label: "Tidak Hadir" },
                              ].map((opt) => (
                                <motion.button
                                  key={opt.id}
                                  whileTap={tapScale}
                                  type="button"
                                  onClick={() => updateFieldValue(field.id, opt.id)}
                                  className={`min-h-12 px-2 rounded-2xl border text-xs font-semibold transition-colors cursor-pointer ${
                                    val === opt.id
                                      ? "bg-primary-600 border-primary-600 text-on-primary"
                                      : "bg-bg-base border-border text-text-main hover:bg-bg-elevated"
                                  }`}
                                >
                                  {opt.label}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (field.type === "textarea") {
                        return (
                          <div key={field.id} className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <label
                                htmlFor={`field-${field.id}`}
                                className="text-xs font-semibold text-text-main"
                              >
                                {field.label}
                              </label>
                              <button
                                type="button"
                                onClick={() =>
                                  removeFieldFromKegiatan(currentItem.id, field.id)
                                }
                                aria-label={`Hapus elemen ${field.label}`}
                                className="text-text-muted hover:text-danger-600 p-1 rounded-lg cursor-pointer"
                              >
                                <IconTrash className="text-sm" aria-hidden="true" />
                              </button>
                            </div>
                            <textarea
                              id={`field-${field.id}`}
                              rows={3}
                              value={responses[field.id] || ""}
                              onChange={(e) =>
                                updateFieldValue(field.id, e.target.value)
                              }
                              placeholder={field.placeholder || "Tuliskan catatan..."}
                              className="w-full p-3.5 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={field.id} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <label
                              htmlFor={`field-${field.id}`}
                              className="text-xs font-semibold text-text-main"
                            >
                              {field.label}
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                removeFieldFromKegiatan(currentItem.id, field.id)
                              }
                              aria-label={`Hapus elemen ${field.label}`}
                              className="text-text-muted hover:text-danger-600 p-1 rounded-lg cursor-pointer"
                            >
                              <IconTrash className="text-sm" aria-hidden="true" />
                            </button>
                          </div>
                          <input
                            id={`field-${field.id}`}
                            type="text"
                            value={responses[field.id] || ""}
                            onChange={(e) =>
                              updateFieldValue(field.id, e.target.value)
                            }
                            placeholder={field.placeholder || "Tuliskan jawaban..."}
                            className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Participation Toggle */}
                  <div className="space-y-2.5 pt-2 border-t border-border-subtle">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Status Keikutsertaan
                    </span>

                    <div
                      role="radiogroup"
                      aria-label="Status keikutsertaan kegiatan"
                      className="bg-bg-base p-1.5 rounded-2xl border border-border-subtle grid grid-cols-2 gap-2"
                    >
                      <motion.button
                        whileTap={tapScale}
                        type="button"
                        role="radio"
                        aria-checked={participationStatus === "sudah"}
                        onClick={() => setParticipationStatus("sudah")}
                        className={`min-h-12 px-3 rounded-xl text-xs md:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border ${
                          participationStatus === "sudah"
                            ? "bg-success-600 text-on-primary border-success-600"
                            : "bg-transparent text-text-muted hover:text-text-main border-transparent"
                        }`}
                      >
                        <IconCheckBold className="text-sm" aria-hidden="true" />
                        <span>Sudah mengikuti</span>
                      </motion.button>

                      <motion.button
                        whileTap={tapScale}
                        type="button"
                        role="radio"
                        aria-checked={participationStatus === "belum"}
                        onClick={() => setParticipationStatus("belum")}
                        className={`min-h-12 px-3 rounded-xl text-xs md:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border ${
                          participationStatus === "belum"
                            ? "bg-bg-surface text-text-main border-border shadow-[var(--shadow-card)]"
                            : "bg-transparent text-text-muted hover:text-text-main border-transparent"
                        }`}
                      >
                        <IconCircle className="text-xs" aria-hidden="true" />
                        <span>Belum</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={handleSave}
                  className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm md:text-base shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <IconCheckBold className="text-base" aria-hidden="true" />
                  <span>Simpan Catatan Kegiatan</span>
                </motion.button>
              </div>

              {/* Desktop Right Column */}
              <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
                <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                      Status Saat Ini
                    </span>
                    {participationStatus === "sudah" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                        <IconCheckBold className="text-xs" aria-hidden="true" />
                        <span>Sudah</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-bg-elevated text-text-muted border border-border">
                        <IconCircle className="text-xs" aria-hidden="true" />
                        <span>Belum</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-text-main">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {currentItem.dateRange}
                    </p>
                  </div>
                </div>

                <div className="bg-bg-surface border border-border rounded-[1.5rem] p-4 shadow-[var(--shadow-card)] flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shrink-0">
                    <IconNotebook aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-main">
                      Disesuaikan oleh Sekolah
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5 leading-snug">
                      Admin sekolah dapat menambah atau menghapus elemen tinjauan
                      (kehadiran, ringkasan ceramah, atau catatan kegiatan).
                    </p>
                  </div>
                </div>

                <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                    <IconSparkleFill
                      className="text-base text-accent-500"
                      aria-hidden="true"
                    />
                    <span>Keutamaan Amaliyah</span>
                  </div>
                  <p className="text-xs text-accent-800 leading-relaxed italic">
                    &ldquo;Sebaik-baik kalian adalah orang yang belajar
                    Al-Qur&apos;an dan mengajarkannya.&rdquo;
                  </p>
                  <span className="text-xs text-accent-600 font-semibold">
                    HR. Bukhari no. 5027
                  </span>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Admin Add Field Modal */}
      <BottomSheet
        isOpen={isAdminFieldOpen}
        onClose={() => setIsAdminFieldOpen(false)}
        title="Tambah Elemen Formulir (Admin)"
        subtitle="Tambahkan kolom tinjauan baru pada kegiatan ini."
        maxWidthClass="sm:max-w-md"
      >
        <form onSubmit={handleAddAdminField} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-field-label" className="text-xs font-semibold text-text-main block">
              Judul Elemen
            </label>
            <input
              id="admin-field-label"
              type="text"
              required
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              placeholder="Contoh: Ringkasan Ceramah / Lokasi Kegiatan"
              className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main focus:border-primary-600"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-field-type" className="text-xs font-semibold text-text-main block">
              Jenis Isian
            </label>
            <div className="relative">
              <select
                id="admin-field-type"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-medium text-text-main focus:border-primary-600 cursor-pointer"
              >
                <option value="textarea">Ringkasan / Paragraf</option>
                <option value="text">Teks Singkat</option>
                <option value="attendance">Pilihan Kehadiran</option>
              </select>
              <IconChevronDown
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => setIsAdminFieldOpen(false)}
              className="min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold cursor-pointer"
            >
              Batal
            </motion.button>
            <motion.button
              whileTap={tapScale}
              type="submit"
              className="min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold cursor-pointer"
            >
              Tambah Elemen
            </motion.button>
          </div>
        </form>
      </BottomSheet>
    </AppLayout>
  );
}
