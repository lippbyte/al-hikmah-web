import { IconSearch } from "../../../lib/icons";

export default function SearchBar({ value = "", onChange }) {
  return (
    <div className="w-full min-h-12 bg-bg-base flex items-center gap-2.5 px-3.5 rounded-2xl border border-border focus-within:border-primary-600 transition-colors">
      <IconSearch
        className="text-text-muted text-lg shrink-0"
        aria-hidden="true"
      />
      <label htmlFor="tanya-search" className="sr-only">
        Cari riwayat Tanya
      </label>
      <input
        id="tanya-search"
        type="search"
        inputMode="search"
        value={value}
        onChange={onChange}
        placeholder="Cari riwayat Tanya..."
        className="w-full bg-transparent border-none outline-none text-text-main placeholder:text-text-muted text-sm"
      />
    </div>
  );
}
