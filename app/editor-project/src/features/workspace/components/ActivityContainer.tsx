import { useActivities } from "../api/useActivities";
import Activity from "./Activity";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityContainer({boardId} : {boardId: string}) {
  const {data, isLoading} = useActivities(boardId)

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

        <div className="flex gap-1 flex-col justify-center p-4">
          <div>
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex gap-1 flex-col justify-center p-4">
          <div>
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex gap-1 flex-col justify-center p-4">
          <div>
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex gap-1 flex-col justify-center p-4">
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
    <div>
      {(data ?? []).map((item) => (
        <Activity activity={item} key={item.id} />
      ))}
    </div>
  )

}