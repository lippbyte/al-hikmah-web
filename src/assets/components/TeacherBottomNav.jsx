import { useNavigate } from "react-router-dom";
import { LuUsers, LuHeart, LuClipboardList } from "react-icons/lu";

export default function TeacherBottomNav({ activeTab = "kelas" }) {
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden fixed bottom-3 md:bottom-5 inset-x-0 max-w-sm md:max-w-md mx-auto px-2 py-1.5 bg-bg-surface border border-border rounded-lg shadow-md flex items-center justify-around z-30 select-none">
      {/* Tab 1: Kelas */}
      <button
        type="button"
        onClick={() => navigate("/guru")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
          activeTab === "kelas"
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold"
            : "text-text-muted hover:text-text-main font-medium"
        }`}
      >
        <LuUsers className="text-base" />
        <span>Kelas</span>
      </button>

      {/* Tab 2: Perlu Disapa */}
      <button
        type="button"
        onClick={() => navigate("/guru/sapa")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
          activeTab === "sapa"
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold"
            : "text-text-muted hover:text-text-main font-medium"
        }`}
      >
        <LuHeart className="text-base" />
        <span>Perlu Disapa</span>
      </button>

      {/* Tab 3: Rekap */}
      <button
        type="button"
        onClick={() => navigate("/guru/rekap")}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
          activeTab === "rekap"
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold"
            : "text-text-muted hover:text-text-main font-medium"
        }`}
      >
        <LuClipboardList className="text-base" />
        <span>Rekap</span>
      </button>
    </nav>
  );
}
