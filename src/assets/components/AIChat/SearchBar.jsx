import { LuSearch } from "react-icons/lu";

export default function SearchBar({ value = "", onChange }) {
  return (
    <div className="w-full bg-bg-surface flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border focus-within:border-primary/70 transition-colors shadow-2xs">
      <LuSearch className="text-text-muted text-lg shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Cari riwayat chat.."
        className="w-full bg-transparent border-none outline-none text-text-main placeholder:text-text-muted text-sm font-normal"
      />
    </div>
  );
}
