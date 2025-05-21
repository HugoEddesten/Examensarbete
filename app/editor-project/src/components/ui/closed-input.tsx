import { useState } from "react"
import { Input } from "./input";
import { cn } from "@/lib/utils";

export const ClosedInput = ({open = false, ...props}: React.ComponentProps<"input"> & {open?: boolean}) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    isOpen ? <Input autoFocus={true} onBlur={() => setIsOpen(false)} {...props}/> : <span className={cn("w-full p-2 px-3 h-9 border border-gray-300 font-semibold rounded-md")} onDoubleClick={() => setIsOpen(true)}>{props.value}</span>
  )
}