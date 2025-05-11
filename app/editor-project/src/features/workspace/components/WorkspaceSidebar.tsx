import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { ArrowRightToLine } from "lucide-react";
import { SidebarTypesDisplay } from "../types";


export default function WorkspaceSidebar() {
  const {sidebar, closeSidebar} = useSidebar()

  if (!sidebar) return null

  const {type, data} = sidebar;

  return (
    <div className={cn(
      "text-accent absolute right-0 top-0 bg-primary w-xs h-full transition-normal duration-200 overflow-hidden",
    )}>
      <div className="flex py-12 px-4 relative">
        <ArrowRightToLine onClick={() => closeSidebar()} className="absolute left-3 top-3 bg-accent rounded-md p-1 w-8 h-8 text-accent-foreground cursor-pointer" />
        <div className="flex flex-col">
          <span className="text-2xl">{ SidebarTypesDisplay[type] }</span>
        </div>
      </div>
      <div className="pr-2">
        {type === "workspace" && (
          <div>



          </div>
        )}
      </div>
    </div>
  )
}