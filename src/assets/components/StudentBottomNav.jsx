import DraggableBottomNav from "./DraggableBottomNav";
import {
  IconHome,
  IconHomeFill,
  IconCalendarDays,
  IconCalendarDaysFill,
  IconChat,
  IconChatFill,
  IconUser,
  IconUserFill,
} from "../../lib/icons";

const STUDENT_TABS = [
  {
    id: "hari-ini",
    label: "Hari Ini",
    path: "/",
    icon: IconHome,
    activeIcon: IconHomeFill,
    match: (p) =>
      p === "/" ||
      p === "/home" ||
      p.startsWith("/kegiatan-khusus") ||
      p.startsWith("/catatan"),
  },
  {
    id: "ramadan",
    label: "Ramadan",
    path: "/ramadan",
    icon: IconCalendarDays,
    activeIcon: IconCalendarDaysFill,
    match: (p) => p.startsWith("/ramadan"),
  },
  {
    id: "tanya",
    label: "Tanya",
    path: "/chat",
    icon: IconChat,
    activeIcon: IconChatFill,
    match: (p) => p.startsWith("/chat"),
  },
  {
    id: "profil",
    label: "Profil",
    path: "/profil",
    icon: IconUser,
    activeIcon: IconUserFill,
    match: (p) => p.startsWith("/profil"),
  },
];

export default function StudentBottomNav() {
  return (
    <DraggableBottomNav
      tabs={STUDENT_TABS}
      layoutId="student-tab-pill"
      ariaLabel="Navigasi utama siswa (ketuk atau geser untuk berpindah)"
    />
  );
}
