import DesktopSidebar from "./DesktopSidebar";

export default function AppLayout({ children, onOpenSettings }) {
  return (
    <div className="flex flex-row w-full min-h-screen bg-bg-base text-text-main selection:bg-primary-surface selection:text-primary transition-colors duration-200 relative">
      {/* Desktop Persistent Left Sidebar */}
      <DesktopSidebar onOpenSettings={onOpenSettings} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 min-h-screen flex flex-col justify-between overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
