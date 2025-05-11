import { Activity, Board, Workspace } from "@/features/workspace/types";
import { createContext, useContext, useState } from "react";

type SidebarType = "activity" | "board" | "workspace";

type SidebarState = {
  type: SidebarType;
  data: Activity | Board | Workspace;
};

type SidebarContextType = {
  sidebar: SidebarState | null;
  openSidebar: (sidebar: SidebarState) => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebar, setSidebar] = useState<SidebarState | null>(null);

  const openSidebar = (sidebar: SidebarState) => {
    setSidebar(sidebar);
  };

  const closeSidebar = () => setSidebar(null);

  return (
    <SidebarContext.Provider value={{ sidebar, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}
