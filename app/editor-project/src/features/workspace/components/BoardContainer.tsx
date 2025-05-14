import { Button } from "@/components/ui/button";
import Board from "./Board";
import { Board as BoardType } from "@/features/workspace/types/index.ts";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
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
  // console.log(boards.map(x => (x.id)))


  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const { positionX: newPosX} = over?.data.current as BoardType;
    const { positionX: oldPosX} = active?.data.current as BoardType;

    if (!over?.id || over.id === active.id) return;

    moveBoard({...active.data.current, id: `${active.id}`, positionX: newPosX});

  };
  console.log(boards.map(b => b.positionX))
  return (
    <div className="overflow-hidden w-full h-full ">
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
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={boards}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${boards.length}, minmax(300px, 300px))`,
              gap: "1em",
              gridTemplateRows: '1fr',
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
