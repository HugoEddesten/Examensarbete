import Home from "@/features/home/Home";
import Workspace from "@/features/workspace/components/workspace/workspace";
import Layout from "@/layouts/main";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path='/workspace/:workspaceId' element={<Workspace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;