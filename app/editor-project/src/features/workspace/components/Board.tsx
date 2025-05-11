import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/contexts/SidebarContext";
import { PlusCircle } from "lucide-react";
import ActivityContainer from "./ActivityContainer";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useSortable } from "@dnd-kit/sortable";
import { Board as BoardType } from "@/features/workspace/types/index";

export default function Board({
  boardData,
  index,
}: {
  boardData: BoardType;
  index: number;
}) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: index,
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
      key={index}
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
        <ActivityContainer boardId={boardData.id} />
      </CardContent>
    </Card>
  );
}
