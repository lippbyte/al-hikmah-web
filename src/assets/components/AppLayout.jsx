// Content container wrapper for pages inside the persistent AppShell.
export default function AppLayout({ children }) {
  return <div className="w-full flex-1 flex flex-col min-w-0">{children}</div>;
}
