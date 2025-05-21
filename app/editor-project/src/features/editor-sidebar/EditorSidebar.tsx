import { cn } from "@/lib/utils";
import { ArrowRightToLine } from "lucide-react";
import { SidebarTypesDisplay, Workspace } from "../workspace/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DynamicForm, { FieldTypes } from "@/components/form/dynamicForm";
import { useBoardStore, useWorkspaceStore } from "@/store/workspaceStore";
import { useShallow } from "zustand/shallow";
import ActivityBlock from "./blocks/ActivityBlock";
import { useSidebarStore } from "@/contexts/SidebarContext";

export default function EditorSidebar() {
  const { sidebar, setSidebar } = useSidebarStore(
    useShallow((state) => ({
      setSidebar: state.setSidebar,
      sidebar: state.sidebar,
    }))
  );
  console.log(sidebar?.data);
  if (!sidebar) return null;

  const { type, data } = sidebar;

  return (
    <div
      className={cn(
        "text-accent fixed right-0 top-0 h-full bg-primary w-xs p-2 transition-normal duration-200"
      )}
    >
      <div className="flex py-12 px-2 relative">
        <ArrowRightToLine
          onClick={(e) => setSidebar(e, null)}
          className="absolute left-3 top-3 bg-accent rounded-md p-1 w-8 h-8 text-accent-foreground cursor-pointer"
        />
        <div className="flex flex-col">
          <span className="text-2xl">{SidebarTypesDisplay[type]}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-white rounded-sm">
        {(() => {
          switch (type) {
            case "workspace":
              return <WorkspaceSidebar workspaceId={data.id} />;
            case "board":
              return <BoardSidebar boardId={data.id} />;
            case "activity":
              return <ActivitySidebar activityId={data.id} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

type SidebarTabTypes = "view" | "blocks" | "settings";

const useSidebarTabs = () => {
  const [tab, setTab] = useState<SidebarTabTypes>("view");

  const TabComponent = (
    <div className="grid grid-cols-3 gap-4 w-full">
      <Button
        variant={tab === "view" ? "default" : "secondary"}
        onClick={() => setTab("view")}
      >
        View
      </Button>
      <Button
        variant={tab === "blocks" ? "default" : "secondary"}
        onClick={() => setTab("blocks")}
      >
        Blocks
      </Button>
      <Button
        variant={tab === "settings" ? "default" : "secondary"}
        onClick={() => setTab("settings")}
      >
        Settings
      </Button>
    </div>
  );

  return { setTab, tab, TabComponent };
};

const ActivitySidebar = ({ activityId }: { activityId: string }) => {
  const { tab, TabComponent } = useSidebarTabs();
  const activity = useWorkspaceStore(
    useShallow((state) => state.activities.find((a) => a.id === activityId))
  );
  const updateActivity = useWorkspaceStore((s) => s.updateActivity);

  return (
    <div className="flex flex-col p-4 gap-4">
      {TabComponent}
      {(() => {
        switch (tab) {
          case "view":
            return (
              <div className="text-primary flex flex-col gap-2 font-semibold">
                {!!activity && (
                  <DynamicForm
                    formModel={activity}
                    onChange={(value, key) =>
                      updateActivity({ ...activity, [key]: value })
                    }
                    fieldDefinitions={[
                      {
                        key: "title",
                        name: "Title",
                        type: FieldTypes.INPUT,
                      },
                      {
                        key: "description",
                        name: "Description",
                        type: FieldTypes.TEXTAREA,
                      },
                    ]}
                  />
                )}
              </div>
            );
          case "settings":
            return <div></div>;
          case "blocks":
            return <div></div>;
          default:
            return null;
        }
      })()}
    </div>
  );
};

const BoardSidebar = ({ boardId }: { boardId: string }) => {
  const { tab, TabComponent } = useSidebarTabs();
  const { board } = useBoardStore(boardId);
  const updateBoard = useWorkspaceStore((state) => state.updateBoard);

  return (
    <div className="flex flex-col p-4 gap-4">
      {TabComponent}
      {(() => {
        switch (tab) {
          case "view":
            return (
              <div className="text-primary flex flex-col gap-2 font-semibold">
                {!!board && (
                  <DynamicForm
                    formModel={board}
                    onChange={(value, key) => {
                      updateBoard({ ...board, [key]: value });
                    }}
                    fieldDefinitions={[
                      {
                        key: "title",
                        name: "Title",
                        type: FieldTypes.INPUT,
                      },
                    ]}
                  />
                )}
              </div>
            );
          case "settings":
            return <div></div>;
          case "blocks":
            return (
              <div className="text-primary grid grid-cols-2 gap-2 font-semibold">
                <ActivityBlock />
                <ActivityBlock />
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

const WorkspaceSidebar = ({ workspaceId }: { workspaceId: string }) => {
  return <div></div>;
};
