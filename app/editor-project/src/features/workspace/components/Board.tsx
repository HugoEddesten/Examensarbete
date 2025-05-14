import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/contexts/SidebarContext";
import { PlusCircle } from "lucide-react";
import ActivityContainer from "./ActivityContainer";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useWorkspaceStore } from "@/store/workspaceStore";

import { Board as BoardType } from "@/features/workspace/types/index";
import { useSortable } from "@dnd-kit/sortable";

export default function Board({
  boardData,
}: {
  boardData: BoardType;
}) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: boardData.id,
    data: {
      ...boardData,
    },
  });

  return (
    <Card
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        gridColumnStart: boardData.positionX,
        gridRowStart: 1,
      }}
      ref={setNodeRef}
      key={boardData.id}
      className={"col-span-1 h-fit"}
      {...listeners}
      {...attributes}
    >
      <CardTitle className="flex items-center justify-between px-2">
        <span>{boardData.title}</span>
        <Button>
          <PlusCircle />
        </Button>
      </CardTitle>
      <CardContent className="p-0">
        {/* <ActivityContainer boardId={boardData.id} /> */}
      </CardContent>
    </Card>
  );
}
