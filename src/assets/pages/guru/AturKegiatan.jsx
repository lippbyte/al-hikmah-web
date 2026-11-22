import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuArrowLeft,
  LuCalendar,
  LuTriangleAlert,
  LuCheck,
  LuSparkles,
} from "react-icons/lu";
import AppLayout from "../../components/AppLayout";

export default function AturKegiatan() {
  const navigate = useNavigate();

  // Date and Settings State
  const [startDate, setStartDate] = useState("2027-02-08"); // 02/08/2027
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 5 Active Activity Toggles
  const [activities, setActivities] = useState([
    { id: "shaum", title: "Shaum", active: true },
    { id: "sholat", title: "Sholat Wajib 5 Waktu", active: true },
    { id: "tarawih", title: "Tarawih", active: true },
    { id: "infaq", title: "Infaq Harian", active: true },
    { id: "ceramah", title: "Ringkasan Ceramah", active: true },
  ]);

  const toggleActivity = (id) => {
    setActivities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate("/guru");
    }, 1200);
  };

  return (
    <AppLayout>
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-20 lg:pb-12 gap-5 md:gap-6">
        
        {/* ===================== TOP HEADER (G-05 MOCKUP) ===================== */}
        <header className="flex items-center gap-3.5 select-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/guru")}
            className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
            aria-label="Kembali ke Kelas Saya"
          >
            <LuArrowLeft className="text-xl" />
          </motion.button>

          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
              Atur Kegiatan
            </h1>
            <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
              Kalender & kegiatan aktif sekolah
            </p>
          </div>
        </header>

        {/* ===================== RESPONSIVE 2-COLUMN LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT MAIN FORM (7/12 & 8/12) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5 select-none">
            
            {/* CARD 1: TANGGAL AWAL RAMADAN 1448 H */}
            <div className="bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xs space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs md:text-sm font-bold text-text-main block">
                  Tanggal Awal Ramadan 1448 H
                </label>

                {/* Date Input with Calendar Icon */}
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-text-main shadow-2xs focus:outline-none focus:border-primary"
                  />
                </div>

                <p className="text-xs text-text-muted font-normal pt-0.5">
                  Menunggu ketetapan sidang isbat
                </p>
              </div>

              {/* Amber Callout Box (Zero Emoji: Using LuTriangleAlert) */}
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
                <LuTriangleAlert className="text-lg text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">
                  <span className="font-bold">Perhatian:</span> Siswa sudah mulai mengisi catatan. Mengubah tanggal awal Ramadan akan menggeser penomoran hari pada kalender siswa dan rekap kelas.
                </p>
              </div>
            </div>

            {/* CARD 2: KEGIATAN YANG AKTIF */}
            <div className="bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xs space-y-3.5">
              <h2 className="text-xs md:text-sm font-bold text-text-main">
                Kegiatan yang aktif
              </h2>

              <div className="flex flex-col gap-2.5">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleActivity(item.id)}
                    className="bg-bg-surface border border-border rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <span className="text-xs md:text-sm font-semibold text-text-main">
                      {item.title}
                    </span>

                    {/* Modern iOS-style Switch Toggle */}
                    <div
                      className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                        item.active ? "bg-primary" : "bg-bg-elevated border border-border"
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`w-5 h-5 rounded-full bg-white shadow-xs ${
                          item.active ? "ml-auto" : "mr-auto"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: JADWAL KEGIATAN KHUSUS */}
            <div className="bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xs space-y-3">
              <h2 className="text-xs md:text-sm font-bold text-text-main">
                Jadwal Kegiatan khusus
              </h2>

              <div className="bg-bg-surface border border-border rounded-xl p-3.5 flex items-center justify-between">
                <span className="text-xs md:text-sm font-bold text-text-main">
                  Nuzulul Qur'an
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-bg-elevated/70 border border-border/60 text-text-main">
                  17 Ramadan (24 Feb 2027)
                </span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSave}
                className="w-full h-12 md:h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm md:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <LuCheck className="text-lg font-bold" />
                    <span>Pengaturan Disimpan</span>
                  </>
                ) : (
                  <span>Simpan Pengaturan</span>
                )}
              </motion.button>
            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            
            {/* Widget 1: Preview Pengaruh ke Tampilan Siswa */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <LuSparkles className="text-sm" />
                <span>Pengaruh Pengaturan</span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Setiap item kegiatan yang dinonaktifkan di sini otomatis disembunyikan dari formulir <strong>Isi Catatan Harian (S-02)</strong> seluruh siswa di kelas Anda.
              </p>

              <div className="p-3 rounded-2xl bg-bg-base/70 border border-border/60 space-y-1.5 text-xs">
                <span className="font-semibold text-text-main block">
                  Status Form Siswa:
                </span>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <LuCheck className="text-xs font-bold" />
                  <span>5 amaliyah wajib aktif dipantau</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </AppLayout>
  );
}
