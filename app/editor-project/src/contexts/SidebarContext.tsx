import { Activity, Board, Workspace } from "@/features/workspace/types";
import { createContext, useContext, useMemo, useState } from "react";

type SidebarActivity = {
  type: "activity";
  data: Activity;
};

type SidebarBoard = {
  type: "board";
  data: Board;
};

type SidebarWorkspace = {
  type: "workspace";
  data: Workspace;
};

export type SidebarState = SidebarActivity | SidebarBoard | SidebarWorkspace;

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
    setSidebar(prev => prev && prev.data.id === sidebar.data.id ? prev : sidebar);
  };

  const closeSidebar = () => setSidebar(null);

  const contextValue = useMemo(() => ({
    sidebar,
    openSidebar,
    closeSidebar
  }), [sidebar]);
  
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};
