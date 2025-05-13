import { Board } from "@/features/workspace/types";
import { create } from "zustand";
import { produce } from "immer";

interface WorkspaceState {
  boards: Board[];
  updateBoard: (id: string, changes: Partial<Board>) => void;
  setBoards: (boards: Board[]) => void;

}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  boards: [],


  updateBoard: (id, changes) => 
    set(
      produce((state: WorkspaceState) => {
        if (state.boards.some(b => b.id === id)) {
          state.boards.forEach(b => {
            if (b.id === id) {
              Object.assign(b, changes)
            }
          }) 
        }
      })
    ),

  setBoards: (boards) =>
    set({ boards: boards }),
}));


export const useBoardState = (boardId: string) => 
  useWorkspaceStore((state) => state.boards.find(b => b.id == boardId));
