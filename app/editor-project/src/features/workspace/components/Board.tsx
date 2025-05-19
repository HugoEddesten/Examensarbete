import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ActivityContainer from "./ActivityContainer";
import { CSS } from "@dnd-kit/utilities";
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
      position: boardData.positionX,
      type: 'board',
      boardId: boardData.id,
    },
  });

  return (
    <Card
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        gridColumnStart: boardData.positionX,
        gridRowStart: 1,
        transition,
      }}
      ref={setNodeRef}
      key={boardData.id}
      className={"col-span-1 h-fit p-0"}
      
      {...attributes}
    >
      
      <CardContent className="flex flex-col p-4 gap-4">
        <CardTitle {...listeners} className="flex items-center justify-between">
          <span className="px-2 w-24 bg-gray-200 py-2 rounded-sm text-start">{boardData.title}</span>
        </CardTitle>
        <ActivityContainer boardId={boardData.id} />
      </CardContent>
    </Card>
  );
}
