import { useParams } from "react-router-dom";
import { useWorkspace } from "../../api/workspace/useWorkspace";
import BoardContainer from "../board/BoardContainer";
import EditorSidebar from "@/features/editor-sidebar/EditorSidebar";
import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useBoards } from "../../api/board/useBoards";

export default function Workspace() {
  const { workspaceId } = useParams();

  const { data: workspace } = useWorkspace(workspaceId!);



  if (!workspace) {
    return <div>No workspace found</div>;
  }


  return (
    <div className="h-full w-full ">
      <div className="w-full h-full bg-dot-grid bg-accent relative">
        <BoardContainer workspace={workspace} />
      </div>
    </div>
  );
}
