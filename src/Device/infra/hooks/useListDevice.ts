import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { api } from "@/core/infra";
import type { Device } from "@/Device/domain";

export const useListDevice = () => {
  const { data, ...result } = useQuery<AxiosResponse<Device[]>>({
    queryKey: ["list-device"],
    queryFn: () => api.get("/devices"),
  });

  return {
    data: data?.data || [],
    ...result,
  };
};
