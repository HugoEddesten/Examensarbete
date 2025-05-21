import { cn } from "@/lib/utils";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Menu } from "lucide-react";
import { Activity as ActivityType } from "../../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns"
import { ClosedInput } from "@/components/ui/closed-input";
import { useSidebarStore } from "@/contexts/SidebarContext";

export default function Activity({ activity }: { activity: ActivityType }) {
  const setSidebar = useSidebarStore(state => state.setSidebar);
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
      model: activity,
      type: "activity",
    },
  });

  return (
    <Accordion type="single" collapsible
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: "none",
      }}
      ref={setNodeRef}
      key={activity.id}
      onClick={(e) => {
        setSidebar(e, { type: "activity", data: activity });
      }}
      {...attributes}
      className={cn(
        "flex w-full gap-4 items-center bg-accent rounded-md"
      )}
    >
      <AccordionItem value={activity.id} className="w-full p-0 px-4" >
        <div className="flex items-center w-full gap-4">
          <Menu {...listeners} className="cursor-grab"/>
          <ClosedInput
            onChange={(e) =>
              updateActivity({ ...activity, title: e.target.value })
            }
            value={activity.title}
          />
          <AccordionTrigger className=""></AccordionTrigger>
        </div>
        <AccordionContent className="grid grid-cols-3 grid-rows-3 gap-2 max-h-48 ">
            <div className="col-span-2 row-span-3 flex flex-col">
              <label className="font-semibold">Description</label>
              <Textarea className="pointer-events-none overflow-hidden bg-gray-200 w-full flex-1 font-semibold" value={activity.description} />
            </div>
            <div className="row-span-1 flex flex-col">
              <label className="font-semibold">Created</label>
              <span className="w-full p-2 px-3 h-9 border bg-gray-200 border-gray-300 font-semibold rounded-md">{format(activity.createdDate, "yyyy-MM-dd")}</span>
            </div>
            
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
