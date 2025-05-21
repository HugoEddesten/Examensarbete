import { useBoardStore, useWorkspaceStore } from "@/store/workspaceStore";
import Activity from "./Activity";
import { Button } from "@/components/ui/button";
import { SortableContext } from "@dnd-kit/sortable";

export default function ActivityContainer({ boardId }: { boardId: string }) {
  const { activities, addActivity } = useBoardStore(boardId);

  return (
    <div className="flex justify-center flex-col bg-gray-300 gap-4 min-h-38 p-1 rounded-md w-full">
      {activities?.length ?? -1 > 0 ? (
        <SortableContext items={activities.map((a) => a.id)}>
          {(activities ?? []).map((item) => (
            <Activity activity={item} key={item.id} />
          ))}
        </SortableContext>
      ) : (
        <div className="flex flex-col">
          <span className="pt-2 font-semibold">Nothing to show...</span>
        </div>
      )}
      <Button
        variant={"secondary"}
        onClick={(e) => {
          addActivity(boardId);
          e.stopPropagation();
        }}
      >
        Add one
      </Button>
    </div>
  );
}
