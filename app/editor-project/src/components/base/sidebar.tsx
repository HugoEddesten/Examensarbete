import { useMobile } from "@/hooks/useMobile";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";

export default function Sidebar(
  {visible, setVisible}: 
  {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}
){
  const isMobile = useMobile()

  return (
    <>
      {isMobile ? 
        <MobileSidebar visible={visible} setVisible={setVisible}/> 
      :
        <DesktopSidebar visible={visible} setVisible={setVisible} />
      }
    </>
  );
}


