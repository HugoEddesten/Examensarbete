import { Activity as ActivityType } from "../types";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { Input } from "@/components/ui/input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Menu } from "lucide-react";

export default function Activity({ activity }: { activity: ActivityType }) {
  // const [title, setTitle] = useState(activity.title);
  const { openSidebar } = useSidebar();
  const updateActivity = useWorkspaceStore((state) => state.updateActivity);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: activity.id, 
    data: {
      position: activity.index,
      boardId: activity.boardId,
      model: activity ,
      type: 'activity',
    } 
  });

  // const updateActivity = useUpdateActivity(activity.boardId);

  // const debouncedUpdate = debounce((newTitle) => {
  //   updateActivity.mutate({ ...activity, title: newTitle });
  // }, 2000);

  // useEffect(() => {
  //   if (activity.title !== title) {
  //     debouncedUpdate(title);
  //   }
  //   return () => debouncedUpdate.cancel();
  // }, [title]);

  return (
    <div
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: "none",
      }}
      ref={setNodeRef}
      key={activity.id}
      onClick={(e) => {
        openSidebar({ type: "activity", data: activity });
      }}
      {...attributes}
      className={cn(
        "flex p-2 w-full h-12 gap-4 items-center bg-accent rounded-md"
      )}
    >
      <div {...listeners}>
        <Menu />
      </div>
      <div>
        <Input
          onChange={(e) =>
            updateActivity({ ...activity, title: e.target.value })
          }
          value={activity.title}
        />
      </div>
    </div>
  );
}
