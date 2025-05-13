
import { useBoardActivities, useWorkspaceStore } from "@/hooks/useWorkspaceStore";
import { useActivities } from "../api/useActivities";
import Activity from "./Activity";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export default function ActivityContainer({boardId} : {boardId: string}) {
  const activities = useBoardActivities(boardId);
  const setActivities = useWorkspaceStore(s => s.setActivities);
  const {data, isLoading, isSuccess} = useActivities(boardId);

  useEffect(() => {
    setActivities(data ?? [])
  }, [isSuccess])


  if (isLoading) {
    return (
      <>
        <div className="flex gap-1 flex-col justify-center px-4">
          <div>
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 ">
      {(activities ?? []).map((item) => (
        <Activity activity={item} key={item.id} />
      ))}
    </div>
  )

}