import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/contexts/SidebarContext";

import { Board as BoardType } from "@/features/workspace/types";
import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import { Input } from "@/components/ui/input";
import { useBoardState, useWorkspaceStore } from "@/hooks/useWorkspaceStore";
import React from "react";



// const DEFAULT_ACTIVITY = {
//   id: '',
//   title: '',
//   description: '',
// }

export default function Board({ boardId }: { boardId: string }) {
  const { openSidebar } = useSidebar();
  const board = useBoardState(boardId)
  const updateBoard = useWorkspaceStore(s => s.updateBoard)
  console.log(boardId)
  if (board) {
    return (
      <Card
        key={board.id}
        style={{
          position: "absolute",
          top: board.positionY,
          left: board.positionX,
          width: board.width,
          height: board.height,
        }}
        onClick={(e) => {
          e.stopPropagation();
          openSidebar({ type: "board", data: board });
        }}
      >
        <CardTitle className="flex items-center justify-between px-2">
          <ToggleableInput onChange={(e: ChangeEvent<HTMLInputElement>) => updateBoard(boardId, {title: e.target.value})} defaultValue={board.title}/>
          <Button>New Activity</Button>
        </CardTitle>
        <CardContent className="p-0">
          {/* <ActivityContainer boardId={board.id} /> */}
        </CardContent>
      </Card>
    );
  }
}




export const ToggleableInput = (props: HtmlHTMLAttributes<HTMLInputElement>) => {
  const [isOpen, setIsOpen] = useState(false);


  if (isOpen) {
    return <Input autoFocus onBlur={() => setIsOpen(false)} {...props}/>
  } else {
    return <span onDoubleClick={() => setIsOpen(true)}>{props.defaultValue}</span>
  }

}