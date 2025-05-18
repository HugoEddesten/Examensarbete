import { useBoardStore, useWorkspaceStore } from "@/store/workspaceStore";
import { useActivities } from "../api/useActivities";
import Activity from "./Activity";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useShallow } from "zustand/shallow";
import { useDroppable } from "@dnd-kit/core";
import { horizontalListSortingStrategy, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

export default function ActivityContainer({ boardId }: { boardId: string }) {
  const {activities, addActivity} = useBoardStore(boardId);
  // if (isLoading) {
  //   return (
  //     <>
  //       <div className="flex gap-1 flex-col justify-center px-4">
  //         <div>
  //           <Skeleton className="h-4 w-28" />
  //         </div>
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-full" />
  //       </div>

  //       <div className="flex gap-1 flex-col justify-center p-4">
  //         <div>
  //           <Skeleton className="h-4 w-28" />
  //         </div>
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-full" />
  //       </div>

  //       <div className="flex gap-1 flex-col justify-center p-4">
  //         <div>
  //           <Skeleton className="h-4 w-28" />
  //         </div>
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-full" />
  //       </div>

  //       <div className="flex gap-1 flex-col justify-center p-4">
  //         <div>
  //           <Skeleton className="h-4 w-28" />
  //         </div>
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-full" />
  //       </div>

  //       <div className="flex gap-1 flex-col justify-center p-4">
  //         <div>
  //           <Skeleton className="h-4 w-28" />
  //         </div>
  //         <Skeleton className="h-4 w-full" />
  //         <Skeleton className="h-4 w-full" />
  //       </div>

  //     </>
  //   )
  // }

  //const {setNodeRef, active, isOver} = useDroppable({id: boardId})

  return (
    <div  className="flex justify-center flex-col bg-gray-300 gap-4 min-h-38 p-1 rounded-md w-full">
      
      {activities?.length ?? -1 > 0 ? (
        <SortableContext items={activities.map(a => a.id)}>
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
