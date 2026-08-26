import { SidebarContent } from "./SidebarContent";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-background sm:flex">
      <SidebarContent />
    </aside>
  );
}
