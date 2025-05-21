import { Activity, Board } from "@/features/workspace/types";
import { create, createStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type WorkspaceStore = {
  shouldSync: boolean
  setShouldSync: (shouldSync: boolean) => void

  boards: Board[];
  activities: Activity[];
  setBoards: (boards: Board[], shouldSync?: boolean) => void;
  setActivities: (activities: Activity[], shouldSync?: boolean) => void;

  addBoard: (board: Board) => void;
  updateBoard: (updatedBoard: Board) => void;
  moveBoard: (movedBoard: Board) => void;

  addActivity: (boardId: string) => void;
  updateActivity: (activity: Activity) => void;
  moveActivity: (movedActivity: Activity) => void;

  getActivities: (boardId: string) => Activity[];
};

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  shouldSync: false,
  setShouldSync: (shouldSync) => set({
    shouldSync: shouldSync
  }),

  boards: [],
  activities: [],
  
  setBoards: (boards, shouldSync = false) => {
    set({
      boards: boards,
      shouldSync: shouldSync
    })
  },
  setActivities: (activities, shouldSync = false) => set({
    activities: activities,
    shouldSync: shouldSync
  }),

  addBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, board],
      shouldSync: true,
    })),
  updateBoard: (updatedBoard) =>
    set((state) => ({
      boards: state.boards.map((b) => {
        if (b.id === updatedBoard.id) {
          return updatedBoard;
        }
        return b;
      }),
      shouldSync: true,
    })),
  moveBoard: (movedBoard) => {
    const prevIndex = get().boards.find(
      (b) => b.id === movedBoard.id
    )?.positionX;
    const newIndex = movedBoard.positionX;
    if (!prevIndex) return;

    set((state) => {
      const positionedBoardList = state.boards.map((b) => {
        if (b.id === movedBoard.id) {
          console.log(movedBoard)
          return movedBoard;
        }
        if (movedBoard.positionX > prevIndex) {
          if (b.positionX > prevIndex && b.positionX <= newIndex) {
            return { ...b, positionX: b.positionX - 1 };
          }
          return b;
        }
        if (movedBoard.positionX < prevIndex) {
          if (b.positionX < prevIndex && b.positionX >= newIndex) {
            return { ...b, positionX: b.positionX + 1 };
          }
          return b;
        }
        return b;
      });
      return {
        boards: positionedBoardList.sort((a, b) => a.positionX - b.positionX),
        shouldSync: true,
      };
    });
  },
  getActivities: (boardId) => {
    const activities = get().activities.filter((a) => a.boardId === boardId);
    return activities;
  },
  addActivity: (boardId) => {
    const activitiesLength = get().activities.length;
    const newActivity = {
      id: `${1 + activitiesLength}`,
      boardId: boardId,
      index: activitiesLength + 1,
      createdDate: new Date(Date.now()),
      title: "",
      description: "",
    };
    set((state) => ({
      activities: [...state.activities, newActivity],
      shouldSync: true,
    }));
    
  },
  updateActivity: (activity) =>
    set((state) => ({
      activities: state.activities.map((a) => {
        if (a.id === activity.id) {
          return activity;
        }
        return a;
      }),
      shouldSync: true,
    })),
  moveActivity: (movedActivity) => {
    const prevIndex = get().activities.find(
      (a) => a.id === movedActivity.id
    )?.index;
    const newIndex = movedActivity.index;
    if (!prevIndex) return;

    set((state) => {
      const positionedActivityList = state.activities.map((a) => {
        if (a.id === movedActivity.id) {
          return movedActivity;
        }
        if (movedActivity.index > prevIndex) {
          if (a.index > prevIndex && a.index <= newIndex) {
            return { ...a, index: a.index - 1 };
          }
          return a;
        }
        if (movedActivity.index < prevIndex) {
          if (a.index < prevIndex && a.index >= newIndex) {
            return { ...a, index: a.index + 1 };
          }
          return a;
        }
        return a;
      });
      return {
        activities: positionedActivityList.sort((a, b) => a.index - b.index),
        shouldSync: true,
      };
    });
  },
}));

export const useBoardStore = (boardId: string) => {
  const activities = useWorkspaceStore(
    useShallow((state) => state.getActivities(boardId))
  );
  const addActivity = useWorkspaceStore((state) => state.addActivity);
  const board = useWorkspaceStore(
    useShallow((state) => state.boards.find((b) => b.id === boardId))
  );
  return {
    activities: activities,
    addActivity: addActivity,
    board: board,
  };
};
