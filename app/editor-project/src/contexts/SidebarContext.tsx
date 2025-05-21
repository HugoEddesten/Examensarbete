import { Activity, Board, Workspace } from "@/features/workspace/types";
import { MouseEvent } from "react";
import { create } from "zustand";

type SidebarType = "activity" | "board" | "workspace";

type SidebarState = {
  type: SidebarType;
  data: Activity | Board | Workspace;
};

type SidebarStore = {
  sidebar: SidebarState | null;
  setSidebar: (event: MouseEvent, sidebar: SidebarState | null) => void;
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  sidebar: null,
  setSidebar: (event, sidebar) => {
    event.stopPropagation();
    const oldSidebar = get().sidebar;
    if (
      !oldSidebar ||
      sidebar?.type !== oldSidebar.type ||
      sidebar.data.id !== oldSidebar.data.id
    )
      set({
        sidebar: sidebar,
      });
  },
}));
