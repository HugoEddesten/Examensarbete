
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
  createdDate?: Date;
  updatedDate?: Date;
  boardId: string;
}

export interface BaseQueryOptions {
  debounceMs: number;
}

export const SidebarTypesDisplay = {
  workspace: 'Workspace',
  board: 'Board',
  activity: 'Activity'
}

export const QUERY_KEYS = {
  ACTIVITY: 'activity',
  BOARD: 'board',
  WORKSPACE: 'workspace',

}