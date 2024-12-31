import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { api } from "@/core/infra";
import type { NewDevice, Device } from "@/Device/domain";

export const useEditDevice = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (device: Device) => {
      const deviceWithoutId = {
        system_name: device.system_name,
        type: device.type,
        hdd_capacity: device.hdd_capacity,
      };
      const data = await api.put<AxiosResponse<Device>>(
        `/devices/${device.id}`,
        deviceWithoutId
      );
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
