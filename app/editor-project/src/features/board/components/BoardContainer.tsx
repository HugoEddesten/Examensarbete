import { useEffect } from "react";
import { useBoards } from "../api/useBoards";
import Board from "./Board";
import { useWorkspaceStore } from "@/hooks/useWorkspaceStore";

export default function BoardContainer({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data, isSuccess } = useBoards(workspaceId)
  const boards = useWorkspaceStore(s => s.boards)
  const setBoards = useWorkspaceStore(s => s.setBoards)


  
  useEffect(() => {
    console.log('hej')
    setBoards(data ?? [])
  }, [isSuccess])

  return (
    <div>
      {boards.map((b) => (
        <Board key={b.id} boardId={b.id} />
      ))}
    </div>
  );
}