import { useParams } from "react-router-dom";
import { useWorkspace } from "../api/useWorkspace";
import BoardContainer from "./BoardContainer";
import WorkspaceSidebar from "./WorkspaceSidebar";

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
    <div className="h-full w-full bg-primary">
      <div className="w-full h-full bg-accent relative">
        {workspace.title}

        <BoardContainer workspaceId={workspaceId!}/>

        <WorkspaceSidebar />
      </div>
    </div>
  )
}