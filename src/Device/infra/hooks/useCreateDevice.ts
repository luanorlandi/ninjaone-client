import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { api } from "@/core/infra";
import type { NewDevice, Device } from "@/Device/domain";

export const useCreateDevice = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: NewDevice) => {
      const data = await api.post<AxiosResponse<Device>>("/devices", body);
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
