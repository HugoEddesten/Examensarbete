import { Board } from "@/features/workspace/types";
import { create } from "zustand";

type WorkspaceStore = {
  boards: Record<number, Board>;
  boardIds: string[];
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  boards: {},
  boardIds: [],
  addBoard: (board) =>
    set((state) => ({
      boards: {
        ...state.boards,
        [board.positionX!]: board,
      },
      boardIds: [...state.boardIds, board.id]
    })),
  updateBoard: (updatedBoard) => set((state) => ({
    boards: {...state.boards, [updatedBoard.positionX!]: updatedBoard} 
  }))

}));
 