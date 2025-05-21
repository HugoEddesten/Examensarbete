import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Board } from "../../types";
import { useWorkspaceStore } from "@/store/workspaceStore";

const updateBoards = async (boards: Board[]) => {
  const boardModels = boards.map((board) => ({
    id: board.id,
    workspaceId: board.workspaceId,
    title: board.title,
    positionX: board.positionX,
  }));

  console.log(boardModels);
  const response = await axios.post(
    `https://localhost:7266/board`,
    boardModels,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const useUpdateBoard = (boardId: string) => {
  const queryClient = useQueryClient();
  const setShouldSync = useWorkspaceStore((state) => state.setShouldSync);

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: (updatedBoard) => {
      queryClient.setQueryData(
        ["boards", updatedBoard.id],
        (oldBoards: any[] | undefined) => {
          if (!oldBoards) return [];
          return oldBoards.map((board) =>
            board.id === updatedBoard.id ? updatedBoard : board
          );
        }
      );
      setShouldSync(false);
    },
  });
};
