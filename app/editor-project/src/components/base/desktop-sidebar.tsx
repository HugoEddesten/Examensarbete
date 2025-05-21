import { cn } from "@/lib/utils";
import { ArrowLeftToLine, Home, Info } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DesktopSidebar(
  {visible, setVisible}: 
  {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}
){

  useEffect(() => {
    setVisible(true)
  }, [setVisible])

  return (
    <div className={cn(
      "text-accent bg-primary min-w-76 w-xs h-full overflow-hidden",
      !visible && 'hidden',
    )}>
      <div className="flex p-8 relative">
        <h2 className="text-4xl">Project</h2>
        <ArrowLeftToLine onClick={() => setVisible(false)} className="absolute right-3 top-3 bg-accent rounded-md p-1 w-8 h-8 text-accent-foreground cursor-pointer" />
      </div>
      <ul className="pr-2">
        <Link className="flex items-center gap-4 w-full p-5 text-lg hover:bg-accent hover:text-primary transition-colors duration-150 " to={'/home'}>
          <Home />
          Home
        </Link>
        <Link className="flex items-center gap-4 w-full p-5 text-lg hover:bg-accent hover:text-primary " to={'/'}>
          <Info />
          About
        </Link>
      </ul>
    </div>
  );
}