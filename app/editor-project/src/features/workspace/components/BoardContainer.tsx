import { Button } from "@/components/ui/button";
import Board from "./Board";
import { Board as BoardType } from "@/features/workspace/types/index.ts";
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
  const boards = useWorkspaceStore(state => state.boards);
  const addBoard = useWorkspaceStore((state) => state.addBoard);
  const moveBoard = useWorkspaceStore((state) => state.moveBoard);

    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragMove = (event: DragMoveEvent) => {
    // https://github.com/chetanverma16/dndkit-guide/blob/main/pages/index.tsx#L384
    console.log(event.active)

    if (event.active.data.current?.type === 'activity') {
      if (event.active.data.current.boardId !== event.over?.data.current?.boardId) {
        console.log('oopsie')
      }
    }

  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over?.id || over.id === active.id) return;

    if (active.data.current?.type === 'board') {
      moveBoard({...boards.find(b => b.id === active.id), id: `${active.id}`, positionX: over.data.current?.position});
    } 
    else if (active.data.current?.type == 'activity') {
      console.log('hejsan')
    }
  };

  console.log(boards.map(b => b.id))
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
        <SortableContext items={boards.map(b => b.id)}>
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
