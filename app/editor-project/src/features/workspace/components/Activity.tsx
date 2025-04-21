import { Button } from "@/components/ui/button";
import { Activity as ActivityType } from "../types";
import { MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useUpdateActivity } from "../api/useUpdateActivity";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Activity({ activity }: { activity: ActivityType }) {
  const [title, setTitle] = useState(activity.title);

  const { openSidebar } = useSidebar();

  const updateActivity = useUpdateActivity(activity.boardId);

  const debouncedUpdate = debounce((newTitle) => {
    updateActivity.mutate({ ...activity, title: newTitle });
  }, 2000);

  useEffect(() => {
    if (activity.title !== title) {
      debouncedUpdate(title);
    }
    return () => debouncedUpdate.cancel();
  }, [title]);

  return (
    <div
      onClick={(e) => {
        openSidebar({ type: "activity", data: activity });
        e.stopPropagation();
      }}
      className={cn(
        "flex justify-between p-2 w-full h-12 items-center border-t border-primary"
      )}
    >
      <input onChange={(e) => setTitle(e.target.value)} value={title} />
      <Button>
        <MinusCircle />
      </Button>
    </div>
  );
}
