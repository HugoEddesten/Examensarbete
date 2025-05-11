import { useParams } from "react-router-dom";
import { useWorkspace } from "../api/useWorkspace";
import BoardContainer from "./BoardContainer";
import WorkspaceSidebar from "./WorkspaceSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Workspace() {
  const {workspaceId} = useParams()
  
  const {data: workspace} = useWorkspace(workspaceId!)



  if (!workspace) {
    return (
      <div>
        No workspace found
      </div>
    )
  }

  return (
    <div className="h-full w-full ">
      <div className="w-full h-full bg-dot-grid bg-accent relative">
        {workspace.title}
        <BoardContainer workspaceId={workspaceId!}/>

        <WorkspaceSidebar />
      </div>
    </div>
  )
}