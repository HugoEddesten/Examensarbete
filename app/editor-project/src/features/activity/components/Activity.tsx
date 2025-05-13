import { Button } from "@/components/ui/button";
import { Activity as ActivityType } from "../../workspace/types";
import { MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";
import { useUpdateActivity } from "../api/useUpdateActivity";
import { useSidebar } from "@/contexts/SidebarContext";
import { useActivity } from "../api/useActivity";
import { Input } from "@/components/ui/input";
import { useWorkspaceStore } from "@/hooks/useWorkspaceStore";

export default function Activity({ activity }: { activity: ActivityType }) {
  const { data } = useActivity(activity.id)


  const { openSidebar } = useSidebar();

  const handleUpdate = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const updatedActivity = {...activity, [event.target.name]: event.target.value};
    
  }

  return (
    <div
      onClick={(e) => {
        openSidebar({ type: "activity", data: activity });
        e.stopPropagation();
      }}
      className={cn(
        "flex justify-between rounded-sm w-full items-center bg-accent" 
      )}
    >
      <Input name={'title'} value={data?.title ?? ""} onChange={(e) => handleUpdate(e)} />
      <Button>
        <MinusCircle />
      </Button>
    </div>
  );
}
