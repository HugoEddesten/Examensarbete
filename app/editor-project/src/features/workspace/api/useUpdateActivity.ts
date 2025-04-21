

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity } from '../types';
import axios from 'axios';

const updateActivity = async (activity: Activity) => {
  console.log(activity)
  const response = await axios.put(`https://localhost:7266/activity`, activity)

  return response.data;
}

export const useUpdateActivity = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity, // PUT request to API
    onSuccess: (updatedActivity) => {
      queryClient.setQueryData(['activities', boardId], (oldActivities: any[] | undefined) => {
        if (!oldActivities) return [];
        return oldActivities.map((activity) =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        );
      });
    },
  });
};