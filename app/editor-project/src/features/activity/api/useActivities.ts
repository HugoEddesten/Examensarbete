import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Activity } from "../types"

const QUERY_KEY = "activities"

const getActivities = async (boardId: string): Promise<Activity[]> => {
  const response = await axios.get(`https://localhost:7266/activity/from-board/${boardId}`)
  return response.data;
}

export const useActivities = (boardId: string) => {

  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [QUERY_KEY, boardId],
    queryFn: () => getActivities(boardId),
    enabled: !!boardId,
  }, queryClient)
}