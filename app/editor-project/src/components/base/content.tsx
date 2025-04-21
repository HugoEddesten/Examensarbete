import { Outlet } from "react-router-dom";
import Header from "./header";


export default function Content({isSidebarVisible, setIsSidebarVisible}: {isSidebarVisible: boolean, setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className="grid grid-rows-2 grow" style={{gridTemplateRows: '1fr 18fr'}}>
      <Header setSidebarVisible={setIsSidebarVisible} sidebarVisible={isSidebarVisible}/>
      <Outlet />
    </div>
  )
}