import { Button } from "@/components/ui/button";
import Board from "./Board";
import { Activity, Workspace } from "@/features/workspace/types/index.ts";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWorkspaceStore } from "@/store/workspaceStore";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import _ from "lodash";
import EditorSidebar from "@/features/editor-sidebar/EditorSidebar";

export default function BoardContainer({
  workspace,
}: {
  workspace: Workspace;
}) {
  const boards = useWorkspaceStore((state) => state.boards);
  const addBoard = useWorkspaceStore((state) => state.addBoard);
  const moveBoard = useWorkspaceStore((state) => state.moveBoard);
  const moveActivity = useWorkspaceStore((state) => state.moveActivity);
  const updateActivity = useWorkspaceStore((state) => state.updateActivity);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragMove = (event: DragMoveEvent) => {
    // https://github.com/chetanverma16/dndkit-guide/blob/main/pages/index.tsx#L384
    const { active, over } = event;

    if (active.data.current?.type === "activity") {
      if (active.data.current.boardId !== over?.data.current?.boardId) {
        const activity = active.data.current.model as Activity;
        updateActivity({
          ...activity,
          boardId: over?.data.current?.boardId,
        });
      }
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over?.id || over.id === active.id) return;

    if (active.data.current?.type === "board") {
      moveBoard({
        ...boards.find((b) => b.id === active.id),
        id: `${active.id}`,
        positionX: over.data.current?.position,
      });
    } else if (active.data.current?.type === "activity") {
      moveActivity({
        ...active.data.current.model,
        index: over.data.current?.model.index,
      });
    }
  };

  return (
    <div className="overflow-hidden w-full h-full">
      <div className="flex flex-col gap-8 text-2xl font-semibold border border-gray-400 justify-center bg-accent rounded-br-lg p-4 shadow-2xl w-86">
        {workspace && workspace.title}
        <div className="flex items-center">
          <Button
            className="p-5 text-[0.7em]"
            onClick={() =>
              addBoard({
                id: `${0 - boards.length}`,
                activities: [],
                positionX: boards.length + 1,
                positionY: 1,
                title: ``,
                workspaceId: workspace.id,
              })
            }
          >
            Add Board
          </Button>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        sensors={sensors}
      >
        <SortableContext items={boards}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${boards.length + 2}, minmax(400px, 400px))`,
              gap: "1em",
              alignItems: 'start',
              paddingLeft: '8em',
            }}
            className={cn(`p-4 h-full overflow-auto`)}
          >
            {(boards ?? []).map((board) => (
              <Board key={board.id} boardData={board} />
            ))}
          </div>
        </SortableContext>
        <EditorSidebar />
      </DndContext>
    </div>
  );
}
