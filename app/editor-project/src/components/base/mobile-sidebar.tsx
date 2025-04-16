import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine, Home, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function MobileSidebar(
  {visible, setVisible}: 
  {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}
) {

  const ref = useRef(null)
  useClickOutside(ref, () => {
    if (visible) {
      setVisible(false)
    }
    console.log('hej')
  })

  useEffect(() => {
    setVisible(false)
  }, [setVisible])
  
  return (
    <div ref={ref} className={cn(
      "absolute text-accent bg-primary opacity-[95%] w-0 h-full transition-normal duration-200 overflow-hidden",
      visible && 'w-xs',
      
    )}>
      <div className="flex p-8 relative">
        <h2 className="text-4xl">Project</h2>
        <ArrowLeftToLine onClick={() => setVisible(false)} className="absolute right-3 top-3 bg-accent rounded-md p-1 w-8 h-8 text-accent-foreground cursor-pointer" />
      </div>
      <ul className="pr-2">
        <Link className="flex items-center gap-4 w-full p-5 text-lg hover:bg-accent hover:text-primary transition-colors duration-150" to={'/home'} onClick={() => setVisible(false)}>
          <Home />
          Home
        </Link>
        <Link className="flex items-center gap-4 w-full p-5 text-lg hover:bg-accent hover:text-primary " to={'/'} onClick={() => setVisible(false)}>
          <Info />
          About
        </Link>
      </ul>
    </div>
  );
}