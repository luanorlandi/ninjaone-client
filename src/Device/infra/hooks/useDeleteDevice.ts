import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/core/infra";

export const useDeleteDevice = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await api.delete<number>(`/devices/${id}`);
      if (data?.data === 0) {
        throw Error(`Failed to delete device id ${id}`);
      }
      return data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-device"] });
      options?.onSuccess?.();
    },
    onError: () => {
      options?.onError?.();
    },
  });
};
