import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Board } from "../types"

const QUERY_KEY = "boards"

const getBoards = async (workspaceId: string): Promise<Board[]> => {
  const response = await axios.get(`https://localhost:7266/board/from-workspace/${workspaceId}`)
  return response.data;
}

export const useBoards = (workspaceId: string) => {
    return useQuery({
      queryKey: [QUERY_KEY, workspaceId],
      queryFn: () => getBoards(workspaceId),
      enabled: !!workspaceId,
    })
}