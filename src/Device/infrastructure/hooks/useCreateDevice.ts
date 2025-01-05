import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/core/infrastructure";
import type { NewDevice, Device } from "@/Device/domain";

export const useCreateDevice = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (device: NewDevice) => {
      const data = await api.post<Device>("/devices", device);
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
