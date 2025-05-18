import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"


export default function Header(
  {sidebarVisible, setSidebarVisible}: 
  {sidebarVisible: boolean, setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>}
) {

  return (
    <div className="flex bg-zinc-700 p-2 py-6 gap-12">
      <Menu onClick={(e) =>  {
        e.stopPropagation()
        setSidebarVisible(true)
      }} className={cn("text-accent p-0 w-12 cursor-pointer", sidebarVisible && 'lg:hidden')} />
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <div className="p-2 bg-accent rounded-md w-12"></div>
          <div className="p-2 bg-accent rounded-md w-12"></div>
        </div>

        <div className="flex gap-4">
          <div className="p-2 bg-accent rounded-md w-12"></div>
          <div className="p-2 bg-accent rounded-md w-12"></div>
          <div className="p-2 bg-accent rounded-md w-12"></div>
          <div className="p-2 bg-accent rounded-md w-12"></div>
        </div>

        <div className="flex gap-4">
          <div className="p-2 bg-lime-500 rounded-md w-12"></div>
          <div className="p-2 bg-cyan-500 rounded-md w-12"></div>
          <div className="p-2 bg-destructive rounded-md w-12 "></div>
        </div>
      </div>
    </div>

  )
}