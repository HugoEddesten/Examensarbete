import { useParams } from "react-router-dom";
import { useWorkspace } from "../api/useWorkspace";
import BoardContainer from "../../board/components/BoardContainer";
import { useSidebar } from "@/contexts/SidebarContext";
import EditorSidebar from "../../editor-sidebar/EditorSidebar";
import { useWorkspaceStore } from "@/hooks/useWorkspaceStore";
import { useEffect } from "react";

export default function Workspace() {
  const {workspaceId} = useParams()
  const {sidebar, openSidebar} = useSidebar();
  const {data: workspace, isSuccess} = useWorkspace(workspaceId!)




  if (!workspace) {
    return (
      <div>
        No workspace found
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-primary">
      <div className="w-full h-full bg-accent relative">
        <div onClick={(e) => {
          e.stopPropagation();
          openSidebar({type: "workspace", data: workspace});
        }}>
          {workspace.title}
          <BoardContainer workspaceId={workspaceId!}/>
        </div>
        <EditorSidebar />
      </div>
      
    </div>
  )
}