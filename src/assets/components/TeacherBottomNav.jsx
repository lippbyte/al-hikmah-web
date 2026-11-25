import DraggableBottomNav from "./DraggableBottomNav";
import {
  IconUsers,
  IconUsersFill,
  IconHeart,
  IconHeartFill,
  IconClipboard,
} from "../../lib/icons";

const TEACHER_TABS = [
  {
    id: "kelas",
    label: "Kelas",
    path: "/guru",
    icon: IconUsers,
    activeIcon: IconUsersFill,
    match: (p) =>
      p === "/guru" ||
      p === "/guru/kelas" ||
      p.startsWith("/guru/siswa"),
  },
  {
    id: "sapa",
    label: "Perlu Disapa",
    path: "/guru/sapa",
    icon: IconHeart,
    activeIcon: IconHeartFill,
    match: (p) => p.startsWith("/guru/sapa"),
  },
  {
    id: "rekap",
    label: "Rekap",
    path: "/guru/rekap",
    icon: IconClipboard,
    activeIcon: IconClipboard,
    match: (p) => p.startsWith("/guru/rekap"),
  },
];

export default function TeacherBottomNav() {
  return (
    <DraggableBottomNav
      tabs={TEACHER_TABS}
      layoutId="teacher-tab-pill"
      ariaLabel="Navigasi utama guru (ketuk atau geser untuk berpindah)"
    />
  );
}
