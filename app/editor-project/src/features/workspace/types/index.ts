
export type Workspace = {
  id: string;
  title: string;
  boards: Board[];
}

export type Board = {
  id: string;
  title?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  workspaceId: string;
  activities: Activity[];
}

export type Activity = {
  id: string;
  title: string;
  description?: string;
  createdDate: Date;
  updatedDate?: Date;
  boardId: string;
}

export const SidebarTypesDisplay = {
  board: 'Board',
  activity: 'Activity'
}