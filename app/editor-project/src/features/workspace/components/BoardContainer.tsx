import { Button } from "@/components/ui/button";
import Board from "./Board";
import {
  Activity,
  Board as BoardType,
} from "@/features/workspace/types/index.ts";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useCallback, useState } from "react";
import {
  horizontalListSortingStrategy,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import _ from "lodash";

export default function BoardContainer({
  workspaceId,
}: {
  workspaceId: string;
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
    <div className="overflow-hidden w-full h-full p-4">
      <Button
        onClick={() =>
          addBoard({
            id: `${0 - boards.length}`,
            activities: [],
            positionX: boards.length + 1,
            positionY: 1,
            title: `${0 - boards.length}`,
            workspaceId: workspaceId,
          })
        }
      >
        Add Board
      </Button>

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
              gridTemplateColumns: `repeat(${boards.length}, minmax(500px, 500px))`,
              gap: "1em",
            }}
            className={cn(`p-4 h-full overflow-auto`)}
          >
            {(boards ?? []).map((board) => (
              <Board key={board.id} boardData={board} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
