import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Activity, QUERY_KEYS } from "../../workspace/types"

const getActivity = async (activityId: string): Promise<Activity> => {
  const response = await axios.get(`https://localhost:7266/activity/${activityId}`)
  return response.data;
}

export const useActivity = (activityId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY, activityId],
    queryFn: () => getActivity(activityId),
  })
}