import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import ProgressRing from "../components/ProgressRing";
import BottomSheet from "../components/BottomSheet";
import { useAppData } from "../../context/appDataStore";
import { useToast } from "../../context/toastStore";
import { listItem, tapScale } from "../../lib/motion";
import {
  IconArrowLeft,
  IconChevronRight,
  IconCheckBold,
  IconCircle,
  IconSparkleFill,
  IconPlus,
  IconSettings,
} from "../../lib/icons";

export default function KegiatanKhusus() {
  const navigate = useNavigate();
  const { kegiatanKhusus, addKegiatanKhususItem } = useAppData();
  const { showToast } = useToast();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newDateRange, setNewDateRange] = useState("");
  const [newArahan, setNewArahan] = useState("");

  const completedCount = kegiatanKhusus.filter((k) => k.status === "sudah").length;
  const totalCount = kegiatanKhusus.length;

  const handleCreateKegiatan = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addKegiatanKhususItem({
      title: newTitle.trim(),
      tag: newTag.trim() || "Agenda Sekolah",
      description: newArahan.trim() || "Kegiatan khusus sesuai permintaan sekolah.",
      dateRange: newDateRange.trim() || "Ramadan 1448 H",
      arahan: newArahan.trim() || "Ikuti arahan pembimbing dan isi formulir keikutsertaan.",
    });
    setNewTitle("");
    setNewTag("");
    setNewDateRange("");
    setNewArahan("");
    setIsAddOpen(false);
    showToast("Kegiatan khusus baru ditambahkan (Admin Sekolah).");
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-6">
        <header className="flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3.5">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => navigate("/")}
              className="w-12 h-12 rounded-2xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-[var(--shadow-card)] hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
              aria-label="Kembali ke Hari Ini"
            >
              <IconArrowLeft className="text-xl" aria-hidden="true" />
            </motion.button>

            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
                Kegiatan Khusus
              </h1>
              <p className="text-xs md:text-sm text-text-muted mt-0.5">
                Disesuaikan oleh Admin Sekolah sesuai agenda Ramadan
              </p>
            </div>
          </div>

          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="min-h-12 px-4 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-xs font-semibold flex items-center gap-1.5 shadow-[var(--shadow-card)] transition-colors cursor-pointer shrink-0"
            title="Pratinjau hak admin sekolah menambah kegiatan khusus"
          >
            <IconPlus className="text-sm text-primary-600" aria-hidden="true" />
            <span className="hidden sm:inline">Tambah (Admin)</span>
          </motion.button>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            {kegiatanKhusus.map((item, idx) => {
              const isCompleted = item.status === "sudah";
              const fieldCount = item.fields?.length || 0;

              return (
                <motion.button
                  key={item.id}
                  custom={idx}
                  variants={listItem}
                  initial="initial"
                  animate="animate"
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate(`/kegiatan-khusus/${item.id}`)}
                  className="w-full text-left bg-bg-surface border border-border hover:border-primary-300 rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] transition-colors cursor-pointer select-none space-y-2.5 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-accent-700">
                      {item.tag}
                    </span>

                    {isCompleted ? (
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

                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-lg font-bold text-text-main group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h2>
                    <IconChevronRight
                      className="text-lg text-text-muted group-hover:text-primary-600 transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-[11px] text-text-muted">
                    <IconSettings className="text-xs text-primary-600" aria-hidden="true" />
                    <span>{fieldCount} elemen formulir sekolah</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Ringkasan Program
                  </span>
                  <h3 className="font-display text-lg font-bold text-text-main mt-0.5">
                    {completedCount} dari {totalCount} diikuti
                  </h3>
                </div>
                <ProgressRing
                  value={completedCount}
                  total={totalCount}
                  size={72}
                  strokeWidth={6}
                  variant="light"
                />
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Admin sekolah dapat menambahkan elemen yang ditinjau sesuai
                kebutuhan program, seperti formulir ringkasan ceramah, kehadiran,
                atau catatan kegiatan.
              </p>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                <IconSparkleFill
                  className="text-base text-accent-500"
                  aria-hidden="true"
                />
                <span>Malam Istimewa Ramadan</span>
              </div>
              <p
                lang="ar"
                dir="rtl"
                className="font-arabic text-xl text-accent-900 leading-loose text-right"
              >
                شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ
              </p>
              <p className="text-xs md:text-sm text-accent-800 leading-relaxed italic">
                &ldquo;Bulan Ramadan adalah bulan yang di dalamnya diturunkan
                Al-Qur&apos;an sebagai petunjuk bagi manusia.&rdquo;
              </p>
              <span className="text-xs text-accent-600 font-semibold">
                QS. Al-Baqarah: 185
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* Admin Add Special Activity Sheet */}
      <BottomSheet
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Kegiatan Khusus (Admin)"
        subtitle="Simulasi hak admin sekolah untuk menambah agenda khusus."
        maxWidthClass="sm:max-w-md"
      >
        <form onSubmit={handleCreateKegiatan} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-kegiatan-title" className="text-xs font-semibold text-text-main block">
              Nama Kegiatan
            </label>
            <input
              id="admin-kegiatan-title"
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Buka Bersama Kelas VIII"
              className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main focus:border-primary-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="admin-kegiatan-tag" className="text-xs font-semibold text-text-main block">
                Label Waktu
              </label>
              <input
                id="admin-kegiatan-tag"
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Contoh: 20 Ramadan"
                className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main focus:border-primary-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-kegiatan-date" className="text-xs font-semibold text-text-main block">
                Jadwal / Tempat
              </label>
              <input
                id="admin-kegiatan-date"
                type="text"
                value={newDateRange}
                onChange={(e) => setNewDateRange(e.target.value)}
                placeholder="Contoh: Aula Sekolah"
                className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main focus:border-primary-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-kegiatan-arahan" className="text-xs font-semibold text-text-main block">
              Arahan Sekolah
            </label>
            <textarea
              id="admin-kegiatan-arahan"
              rows={3}
              value={newArahan}
              onChange={(e) => setNewArahan(e.target.value)}
              placeholder="Arahan singkat untuk siswa..."
              className="w-full p-3.5 bg-bg-surface border border-border rounded-2xl text-sm text-text-main focus:border-primary-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold cursor-pointer"
            >
              Batal
            </motion.button>
            <motion.button
              whileTap={tapScale}
              type="submit"
              className="min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold cursor-pointer"
            >
              Tambahkan
            </motion.button>
          </div>
        </form>
      </BottomSheet>
    </AppLayout>
  );
}
