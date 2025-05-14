import { Board } from "@/features/workspace/types";
import { create } from "zustand";

type WorkspaceStore = {
  boards: Board[];
  addBoard: (board: Board) => void;
  updateBoard: (updatedBoard: Board) => void;
  moveBoard: (movedBoard: Board) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  boards: [],
  boardIds: [],
  addBoard: (board) => set((state) => ({
    boards: [...state.boards, board]
  })),
  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((b) => {
      if (b.id === updatedBoard.id) {
        return updatedBoard;
      }
      return b;
    })
  })),
  moveBoard: (movedBoard) => {
    const prevIndex = get().boards.find(b => b.id === movedBoard.id)?.positionX;
    const newIndex = movedBoard.positionX;
    if (!prevIndex) return;

    set((state) => {
      const positionedBoardList = state.boards.map((b) => {
        if (b.id === movedBoard.id) {
          return movedBoard;
        }
        if (movedBoard.positionX > prevIndex) {
          if (b.positionX > prevIndex && b.positionX <= newIndex) {
            return {...b, positionX: b.positionX -1}
          }
          return b
        }
        if (movedBoard.positionX < prevIndex) {
          if (b.positionX < prevIndex && b.positionX >= newIndex) {
            return {...b, positionX: b.positionX +1}
          }
          return b
        }
        return b
      });
      return {
        boards: positionedBoardList.sort((a, b) => a.positionX - b.positionX)
      };
    })
  }
}));
 