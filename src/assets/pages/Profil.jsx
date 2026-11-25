import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../../context/authStore";
import { useToast } from "../../context/toastStore";
import { DEMO_SCHOOL } from "../../data/demoData";
import { tapScale } from "../../lib/motion";
import {
  IconSparkleFill,
  IconCalendarDays,
  IconNotePencil,
  IconChat,
  IconChevronRight,
  IconStudent,
  IconTeacher,
  IconParent,
  IconSignOut,
  IconInfo,
  IconCheckBold,
} from "../../lib/icons";

export default function Profil() {
  const navigate = useNavigate();
  const { currentUser, loginAs } = useAuth();
  const { showToast } = useToast();

  const handleRoleSwitch = (roleKey, targetPath, label) => {
    loginAs(roleKey);
    showToast(`Beralih ke pratinjau ${label}.`, "info");
    navigate(targetPath);
  };

  const shortcuts = [
    {
      label: "Isi Catatan Harian",
      desc: "Lengkapi catatan shaum dan sholat hari ini",
      path: "/catatan",
      icon: IconNotePencil,
    },
    {
      label: "Kegiatan Khusus",
      desc: "Nuzulul Qur'an, Lailatul Qadr, dan agenda sekolah",
      path: "/kegiatan-khusus",
      icon: IconSparkleFill,
    },
    {
      label: "Kalender Ramadan",
      desc: "Lihat 30 hari catatan dan isi susulan",
      path: "/ramadan",
      icon: IconCalendarDays,
    },
    {
      label: "Tanya",
      desc: "Rujukan awal kegiatan Ramadan",
      path: "/chat",
      icon: IconChat,
    },
  ];

  const demoRoles = [
    {
      key: "siswa",
      match: "siswa",
      label: "Siswa (Rafi · Demo)",
      path: "/",
      icon: IconStudent,
    },
    {
      key: "guru",
      match: "guru",
      label: "Guru (Wali Kelas · Demo)",
      path: "/guru",
      icon: IconTeacher,
    },
    {
      key: "ortu",
      match: "orang-tua",
      label: "Orang Tua (Wali · Demo)",
      path: "/orang-tua",
      icon: IconParent,
    },
  ];

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        <header className="select-none">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main">
            Profil
          </h1>
          <p className="text-xs md:text-sm text-text-muted mt-0.5">
            Informasi akun demo dan pengaturan tampilan
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {/* Profile Identity Card */}
            <section className="bg-bg-surface border border-border rounded-[1.75rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-600 text-on-primary font-display text-2xl font-bold flex items-center justify-center shrink-0">
                  {currentUser?.avatar || "R"}
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                    Akun Demo Fiktif
                  </span>
                  <h2 className="font-display text-xl font-bold text-text-main truncate mt-1">
                    {currentUser?.name || "Rafi Pratama (Demo)"}
                  </h2>
                  <p className="text-xs md:text-sm text-text-muted truncate">
                    {currentUser?.title || "Siswa Kelas VIII-A · Akun Demo"}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-border-subtle text-sm">
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-text-muted">Sekolah</dt>
                  <dd className="font-semibold text-text-main text-right">
                    {currentUser?.school || DEMO_SCHOOL}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-text-muted">Kelas</dt>
                  <dd className="font-semibold text-text-main">
                    {currentUser?.class || "VIII-A"}
                  </dd>
                </div>
                {currentUser?.nis && (
                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <dt className="text-text-muted">Nomor Induk (Contoh)</dt>
                    <dd className="font-semibold text-text-main">
                      {currentUser.nis}
                    </dd>
                  </div>
                )}
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <dt className="text-text-muted">Tahun Ramadan</dt>
                  <dd className="font-semibold text-text-main">
                    1448 H / 2027
                  </dd>
                </div>
              </dl>
            </section>

            {/* Quick Navigation */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-text-main px-0.5">
                Pintasan Siswa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shortcuts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.path}
                      whileTap={tapScale}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className="w-full min-h-[72px] text-left bg-bg-surface border border-border hover:border-primary-300 rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center justify-between gap-3 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-lg shrink-0">
                          <Icon aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-text-main block truncate">
                            {item.label}
                          </span>
                          <span className="text-xs text-text-muted block truncate">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <IconChevronRight
                        className="text-text-muted text-base shrink-0"
                        aria-hidden="true"
                      />
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Switch Demo Role & About */}
          <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-3.5">
              <div>
                <h2 className="font-display text-base font-bold text-text-main">
                  Pratinjau Peran Demo
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Coba tampilan Siswa, Guru, atau Orang Tua menggunakan data
                  fiktif.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {demoRoles.map((r) => {
                  const Icon = r.icon;
                  const isActive = currentUser?.role === r.match;
                  return (
                    <motion.button
                      key={r.key}
                      whileTap={tapScale}
                      type="button"
                      onClick={() => handleRoleSwitch(r.key, r.path, r.label)}
                      className={`w-full min-h-12 px-4 rounded-2xl border text-xs md:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? "bg-primary-600 border-primary-600 text-on-primary"
                          : "bg-bg-base border-border text-text-main hover:bg-bg-elevated"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="text-lg shrink-0" aria-hidden="true" />
                        <span>{r.label}</span>
                      </span>
                      {isActive && (
                        <IconCheckBold className="text-sm" aria-hidden="true" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-border-subtle">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <IconSignOut className="text-base" aria-hidden="true" />
                  <span>Ke Halaman Masuk</span>
                </motion.button>
              </div>
            </section>

            <section className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                <IconInfo
                  className="text-base text-accent-500"
                  aria-hidden="true"
                />
                <span>Tentang Pencatatan</span>
              </div>
              <p className="text-xs text-accent-800 leading-relaxed">
                Al Hikmah dirancang untuk membantu konsistensi pencatatan
                harian, bukan membuktikan ibadah. Tidak ada papan peringkat
                antar siswa, dan alasan berhalangan tidak pernah diminta.
              </p>
            </section>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
}
