import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Workspace } from "../types"

const QUERY_KEY = "workspace"

const getWorkspace = async (id: string): Promise<Workspace>  => {
  const response = await axios.get(`https://localhost:7266/workspace/${id}`)
  return response.data;
}

export const useWorkspace = (id: string) => {
    return useQuery({
      queryKey: [QUERY_KEY, id],
      queryFn: () => getWorkspace(id),
      enabled: !!id,
    })
}