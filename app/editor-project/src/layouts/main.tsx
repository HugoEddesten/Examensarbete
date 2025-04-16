import Content from "@/components/base/Content";
import Sidebar from "@/components/base/sidebar";
import { useState } from "react";


export default function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  

  return (
    <div className="flex h-screen">
      <Sidebar visible={isSidebarVisible} setVisible={setIsSidebarVisible}/>
    
      <Content isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
    </div>
  )
}