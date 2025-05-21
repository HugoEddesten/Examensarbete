import { useWorkspaceStore } from "@/store/workspaceStore";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListPlus } from "lucide-react";

export default function ActivityBlock() {
  const activities = useWorkspaceStore((state) => state.activities);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: activities.length + 1,
    data: {
      position: 0,
      boardId: 0,
      type: "activity",
      model: {
        id: `${activities.length + 1}`,
        boardId: '0',
        index: 0,
        createdDate: new Date(Date.now()),
        title: "",
        description: "",
      }
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      key={activities.length +1}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        boxShadow: "1px 2px 4px #5565",
      }}
      className="flex gap-2 items-center p-4 rounded-xl col-span-1"
    >
      <ListPlus />
      <span>Activity</span>
    </div>
  );
}
