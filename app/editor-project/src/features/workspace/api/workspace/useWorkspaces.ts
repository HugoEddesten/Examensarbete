import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Workspace } from "../../types";

const QUERY_KEY = "workspaces";

const getWorkspaces = async (): Promise<Workspace[]> => {
  const response = await axios.get(`https://localhost:7266/workspace`);
  return response.data;
};

export const useWorkspaces = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getWorkspaces(),
    initialData: [],
  });
};
