import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Activity } from "../../types";

const updateActivity = async (activity: Activity) => {
  console.log(activity);
  const response = await axios.put(`https://localhost:7266/activity`, activity);

  return response.data;
};

export const useUpdateActivity = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity, // PUT request to API
    onSuccess: (updatedActivity) => {
      queryClient.setQueryData(
        ["activities", boardId],
        (oldActivities: any[] | undefined) => {
          if (!oldActivities) return [];
          return oldActivities.map((activity) =>
            activity.id === updatedActivity.id ? updatedActivity : activity
          );
        }
      );
    },
  });
};
