import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { ArrowRightToLine } from "lucide-react";
import {
  Activity,
  Board,
  SidebarTypesDisplay,
  Workspace,
} from "../workspace/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useActivity } from "../activity/api/useActivity";
import { useUpdateActivity } from "../activity/api/useUpdateActivity";
import DynamicForm, { FieldTypes } from "@/components/form/dynamicForm";
import { useBoardState, useWorkspaceStore } from "@/hooks/useWorkspaceStore";

export default function EditorSidebar() {
  const { sidebar, closeSidebar } = useSidebar();

  if (!sidebar) return null;

  const { type, data } = sidebar;

  return (
    <div
      className={cn(
        "text-accent absolute right-0 top-0 h-full bg-primary w-xs p-2 transition-normal duration-200"
      )}
    >
      <div className="flex py-12 px-2 relative">
        <ArrowRightToLine
          onClick={() => closeSidebar()}
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
              return <WorkspaceSidebar workspace={data} />;
            case "board":
              return <BoardSidebar boardId={data.id} />;
            // case "activity":
            //   return <ActivitySidebar activityId={data.id} />;
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

// const ActivitySidebar = ({ activityId }: { activityId: string }) => {
//   const { tab, TabComponent } = useSidebarTabs();
//   const activity = useActivityState(activityId)
//   const updateActivity = useWorkspaceStore(s => s.updateActivity)

//   return (
//     <div className="flex flex-col p-4 gap-4">
//       {TabComponent}
//       {(() => {
//         switch (tab) {
//           case "view":
//             return (
//               <div className="text-primary flex flex-col gap-2 font-semibold">
//                 {!!activity && (
//                   <DynamicForm
//                     formModel={activity}
//                     onChange={(e) =>
//                       updateActivity(activityId, { title: e.target.value })
//                     }
//                     fieldDefinitions={[
//                       {
//                         key: "title",
//                         name: "Title",
//                         type: FieldTypes.INPUT,
//                       },
//                       {
//                         key: "description",
//                         name: "Description",
//                         type: FieldTypes.TEXTAREA,
//                       },
//                     ]}
//                   />
//                 )}
//               </div>
//             );
//           case "settings":
//             return <div></div>;
//           case "blocks":
//             return <div></div>;
//           default:
//             return null;
//         }
//       })()}
//     </div>
//   );
// };

const BoardSidebar = ({ boardId }: { boardId: string }) => {
  const { tab, TabComponent } = useSidebarTabs();
  const board = useBoardState(boardId)
  const updateBoard = useWorkspaceStore(s => s.updateBoard)
  
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
             
                      updateBoard(boardId, { [key]: value })
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
            return <div></div>;
          default:
            return null;
        }
      })()}
    </div>
  );
};

const WorkspaceSidebar = ({ workspace }: { workspace: Workspace }) => {
  return <div></div>;
};
