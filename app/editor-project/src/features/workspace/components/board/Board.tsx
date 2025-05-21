import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";
import { Board as BoardType } from "@/features/workspace/types/index";
import { useSortable } from "@dnd-kit/sortable";
import ActivityContainer from "../activity/ActivityContainer";
import { Input } from "@/components/ui/input";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Menu } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSidebarStore } from "@/contexts/SidebarContext";

export default function Board({ boardData }: { boardData: BoardType }) {
  const setSidebar = useSidebarStore(state => state.setSidebar)
  const updateBoard = useWorkspaceStore(state => state.updateBoard);
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
      type: "board",
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
      onClick={(e) => setSidebar(e, {type: "board", data: boardData})}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={boardData.id}>
          <CardContent className="flex flex-col p-4 gap-4">
            <CardTitle className="flex gap-3 items-center justify-between ">
              <Input onChange={(e) => updateBoard({...boardData, title: e.target.value})} value={boardData.title} className="px-2 w-full max-w-68 bg-gray-200 py-2 rounded-sm" />       
              <AccordionTrigger></AccordionTrigger>
              <Menu className="cursor-grab" {...listeners}/>
            </CardTitle>
            <AccordionContent>
              <ActivityContainer boardId={boardData.id} />
            </AccordionContent>
          </CardContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
