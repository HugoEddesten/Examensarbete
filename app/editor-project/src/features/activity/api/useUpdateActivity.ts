import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity, BaseQueryOptions, QUERY_KEYS } from '../../workspace/types';
import axios from 'axios';

const updateActivity = async (activity: Activity) => {
  const response = await axios.put(`https://localhost:7266/activity`, activity)
  return response.data;
}

export const useUpdateActivity = (options?: BaseQueryOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateActivity,
  });

  const mutateOptimistic = async (activity: Activity) => {
    queryClient.setQueryData([QUERY_KEYS.ACTIVITY, activity.id], activity);
    await mutation.mutateAsync(activity)
  };

  return {
    ...mutation,
    mutateOptimistic,
  };
};