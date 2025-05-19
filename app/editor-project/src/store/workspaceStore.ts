import { Activity, Board } from "@/features/workspace/types";
import { create, createStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type WorkspaceStore = {
  boards: Board[];
  activities: Activity[];
  addBoard: (board: Board) => void;
  updateBoard: (updatedBoard: Board) => void;
  moveBoard: (movedBoard: Board) => void;

  addActivity: (boardId: string) => void;
  updateActivity: (activity: Activity) => void;
  moveActivity : (movedActivity: Activity) => void;

  getActivities: (boardId: string) => Activity[];
};

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  boards: [],
  activities: [],
  addBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, board],
    })),
  updateBoard: (updatedBoard) =>
    set((state) => ({
      boards: state.boards.map((b) => {
        if (b.id === updatedBoard.id) {
          return updatedBoard;
        }
        return b;
      }),
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
    })),
  moveActivity: (movedActivity) => {
    const prevIndex = get().activities.find((a) => a.id === movedActivity.id)?.index;
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
      };
    });
  }
}));

export const useBoardStore = (boardId: string) => {
  const activities = useWorkspaceStore(
    useShallow((state) => state.getActivities(boardId))
  );
  const addActivity = useWorkspaceStore(state => state.addActivity)
  return {
    activities: activities,
    addActivity: addActivity,
  }
};
