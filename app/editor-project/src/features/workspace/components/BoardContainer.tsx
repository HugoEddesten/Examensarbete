import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useBoards } from "../api/useBoards";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActivityContainer from "./ActivityContainer";
import { useSidebar } from "@/contexts/SidebarContext";

export default function BoardContainer({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data, isFetching } = useBoards(workspaceId);
  const { sidebar, openSidebar } = useSidebar();

  if (isFetching) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      {(data ?? []).map((b) => (
        <Card
          key={b.id}
          style={{
            position: "absolute",
            top: b.positionY,
            left: b.positionY,
            width: b.width,
            height: b.height,
          }}
          onClick={() => openSidebar({type: "board", data: b})}
        >
          <CardTitle className="flex items-center justify-between px-2">
            <span>{b.title}</span>
            <Button>
              <PlusCircle />
            </Button>
          </CardTitle>
          <CardContent className="p-0">
            <ActivityContainer boardId={b.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
