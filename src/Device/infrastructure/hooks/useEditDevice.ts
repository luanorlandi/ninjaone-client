import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/core/infrastructure";
import type { Device } from "@/Device/domain";

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
      const data = await api.put<number>(
        `/devices/${device.id}`,
        deviceWithoutId
      );
      if (data?.data === 0) {
        throw Error(`Failed to edit device id ${device.id}`);
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
