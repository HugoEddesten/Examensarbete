import { Outlet } from "react-router-dom";
import Header from "./header";


export default function Content({isSidebarVisible, setIsSidebarVisible}: {isSidebarVisible: boolean, setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className="flex flex-col w-full">
      <Header setSidebarVisible={setIsSidebarVisible} sidebarVisible={isSidebarVisible}/>
      <Outlet />
    </div>
  )
}