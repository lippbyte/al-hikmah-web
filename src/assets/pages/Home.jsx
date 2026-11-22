import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuCalendarDays,
  LuArrowUpRight,
  LuSparkles,
  LuMoon,
  LuClock,
  LuStar,
  LuHeart,
  LuSmartphone,
  LuCheck,
  LuHouse,
  LuMessageSquare,
  LuUser,
  LuSunset,
  LuBot,
  LuBookOpen,
  LuCircleHelp,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";

const INITIAL_ACTIVITIES = [
  {
    id: "shaum",
    title: "Shaum",
    subtitle: "Puasa hari ini",
    icon: LuMoon,
    completed: true,
  },
  {
    id: "sholat",
    title: "Sholat wajib",
    subtitle: "3/5 waktu",
    icon: LuClock,
    completed: true,
  },
  {
    id: "tarawih",
    title: "Tarawih",
    subtitle: "Sholat malam",
    icon: LuStar,
    completed: false,
  },
  {
    id: "infaq",
    title: "Infaq",
    subtitle: "Sedekah harian",
    icon: LuHeart,
    completed: true,
  },
  {
    id: "ceramah",
    title: "Ceramah",
    subtitle: "Kultum / kajian",
    icon: LuSmartphone,
    completed: false,
  },
];

const PRAYER_SCHEDULE = [
  { name: "Imsak", time: "04:32" },
  { name: "Subuh", time: "04:42" },
  { name: "Dzuhur", time: "12:05" },
  { name: "Ashar", time: "15:15" },
  { name: "Maghrib", time: "18:12", isNext: true, label: "Buka Puasa" },
  { name: "Isya", time: "19:22" },
];

export default function Home() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Calculate dynamic progress
  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;
  const statusLabel =
    completedCount === totalCount
      ? "Selesai"
      : completedCount === 0
      ? "Belum dimulai"
      : "Sebagian";

  const toggleActivity = (id) => {
    setActivities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT AREA ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 gap-6">
        
        {/* ===================== TOP PAGE HEADER ===================== */}
        <header className="flex items-center justify-between select-none">
          <div>
            <p className="text-xs md:text-sm text-text-muted font-normal">
              Assalamu'alaikum, Rakan
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-text-main mt-0.5">
              Hari Ini
            </h1>
          </div>
        </header>

        {/* ===================== RESPONSIVE GRID ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT / PRIMARY COLUMN ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {/* Banner / Hero Card (Catatan hari ini) */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-primary rounded-3xl p-5 md:p-6 lg:p-7 text-white shadow-md flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="bg-white text-primary text-xs font-semibold px-2.5 py-1 rounded-md shadow-2xs">
                    {statusLabel}
                  </span>
                  <span className="bg-black/15 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {completedCount} dari {totalCount} selesai
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={() => navigate("/catatan")}
                  className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs cursor-pointer"
                  aria-label="Lihat catatan"
                >
                  <LuArrowUpRight className="text-base font-bold" />
                </motion.button>
              </div>

              <div className="z-10 mt-1">
                <h2 className="text-xl md:text-2xl font-bold">
                  Catatan hari ini
                </h2>
                <p className="text-xs md:text-sm text-white/85 font-normal mt-0.5">
                  Selasa, 24 Feb · 17 Ramadan 1448 H
                </p>
              </div>

              {/* Segmented Progress Bar */}
              <div className="flex items-center gap-1.5 z-10 my-1">
                {Array.from({ length: totalCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-md flex-1 transition-all duration-300 ${
                      idx < completedCount ? "bg-white" : "bg-white/25"
                    }`}
                  />
                ))}
              </div>

              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/catatan")}
                className="w-full py-3.5 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-slate-50 transition-colors shadow-xs cursor-pointer z-10"
              >
                Lanjutkan
              </motion.button>
            </motion.section>

            {/* Special Activity / Highlight Card (Nuzulul Qur'an) - HIGH CONTRAST */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              onClick={() => navigate("/kegiatan-khusus/nuzulul-quran")}
              className="w-full bg-accent-surface border border-accent/30 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                  <LuSparkles />
                </div>

                <div>
                  <h3 className="text-sm md:text-base font-bold text-[#451A03] leading-snug">
                    Kegiatan khusus · Nuzulul Qur'an (17 Ramadan)
                  </h3>
                  <p className="text-xs md:text-sm text-[#78350F] font-medium mt-0.5">
                    Panduan amaliyah malam ke-17
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-white/90 text-[#451A03] flex items-center justify-center text-sm shrink-0 ml-2 shadow-2xs">
                <LuArrowUpRight className="font-bold" />
              </div>
            </motion.section>

            {/* Activities List Section */}
            <section className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs px-1 select-none">
                <h2 className="text-base md:text-lg font-bold text-text-main">
                  Kegiatan hari ini
                </h2>
                <span className="text-text-muted text-xs md:text-sm font-medium">
                  {totalCount} amaliyah
                </span>
              </div>

              {/* Cards Grid: 1 col on mobile, 2 cols on tablet & desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {activities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleActivity(item.id)}
                      className="bg-bg-surface border border-border rounded-2xl p-3.5 md:p-4 flex items-center justify-between shadow-2xs hover:border-primary/40 transition-all cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors ${
                            item.completed
                              ? "bg-primary-surface text-primary"
                              : "bg-bg-elevated text-text-muted"
                          }`}
                        >
                          <Icon />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-text-main leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div>
                        {item.completed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-surface text-primary border border-primary/20 shadow-2xs">
                            <LuCheck className="text-xs" />
                            Sudah
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-bg-elevated text-text-muted border border-border">
                            Belum
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ================= RIGHT / COMPANION COLUMN (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5">
            
            {/* Widget 1: Jadwal Sholat & Waktu Buka Puasa */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div className="flex items-center gap-2 text-text-main font-bold text-sm">
                  <LuSunset className="text-primary text-lg" />
                  <span>Jadwal Sholat & Buka Puasa</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {PRAYER_SCHEDULE.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      p.isNext
                        ? "bg-primary-surface border-primary/40 text-primary font-bold shadow-2xs"
                        : "bg-bg-elevated/50 border-border/50 text-text-main"
                    }`}
                  >
                    <div className="text-[11px] text-text-muted">{p.name}</div>
                    <div className="text-sm font-bold mt-0.5">{p.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Pintasan AI Assistant */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-surface text-primary flex items-center justify-center text-xl shrink-0">
                  <LuBot />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main">
                    Al-Hikmah AI Assistant
                  </h3>
                  <p className="text-xs text-text-muted font-normal">
                    Konsultasi fikih & amaliyah Ramadan
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="w-full text-left p-2.5 rounded-xl bg-bg-elevated/60 hover:bg-bg-elevated border border-border/50 text-xs text-text-main transition-colors cursor-pointer truncate flex items-center gap-2"
                >
                  <LuCircleHelp className="text-primary text-sm shrink-0" />
                  <span className="truncate">"Apa hukumnya wudhu pakai air kopi?"</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="w-full text-left p-2.5 rounded-xl bg-bg-elevated/60 hover:bg-bg-elevated border border-border/50 text-xs text-text-main transition-colors cursor-pointer truncate flex items-center gap-2"
                >
                  <LuSparkles className="text-accent text-sm shrink-0" />
                  <span className="truncate">"Amalan utama pada malam Nuzulul Qur'an"</span>
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/chat")}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <LuMessageSquare className="text-sm" />
                <span>Mulai Tanya AI Sekarang</span>
              </motion.button>
            </div>

            {/* Widget 3: Mutiara Ramadan - HIGH CONTRAST */}
            <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                <LuBookOpen className="text-sm text-[#451A03]" />
                <span>Mutiara Ramadan</span>
              </div>
              <p className="text-xs md:text-sm text-[#78350F] font-medium leading-relaxed italic">
                "Barangsiapa yang berpuasa Ramadan karena iman dan mengharap pahala dari Allah, maka akan diampuni dosa-dosanya yang telah lalu."
              </p>
              <span className="text-[11px] text-[#92400E] font-semibold">
                (HR. Bukhari no. 38 & Muslim no. 760)
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* ===================== FLOATING BOTTOM NAVIGATION BAR (MOBILE) ===================== */}
      <nav className="lg:hidden fixed bottom-3 md:bottom-5 inset-x-0 max-w-sm md:max-w-md mx-auto px-2 py-1.5 bg-bg-surface/90 backdrop-blur-md border border-border rounded-2xl shadow-lg flex items-center justify-between z-30 select-none">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-medium shadow-xs cursor-pointer transition-colors"
        >
          <LuHouse className="text-base" />
          <span>Hari Ini</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/ramadan")}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
        >
          <LuCalendarDays className="text-base" />
          <span>Ramadan</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/chat")}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
          title="Buka AI Chat"
        >
          <LuMessageSquare className="text-base" />
          <span>Tanya</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
        >
          <LuUser className="text-base" />
          <span>Profil</span>
        </button>
      </nav>
    </AppLayout>
  );
}
