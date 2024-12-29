import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { api } from "@/core/infra";
import type { Device } from "@/Device/domain";

export const useDeleteDevice = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await api.delete<AxiosResponse>(`/devices/${id}`);
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
