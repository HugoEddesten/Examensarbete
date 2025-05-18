import Content from "@/components/base/content";
import Sidebar from "@/components/base/sidebar";
import { useState } from "react";


export default function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  

  return (
    <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
      <Sidebar visible={isSidebarVisible} setVisible={setIsSidebarVisible}/>
    
      <Content isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
    </div>
  )
}