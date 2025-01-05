import { useMemo, useState } from "react";

import { Device, DeviceSortValue } from "@/Device/domain";

export const useDeviceSort = (devices: Device[]) => {
  const [sortValue, setSortValue] = useState<DeviceSortValue>();

  const devicesSorted = useMemo(() => {
    const dataCopy = [...devices];

    return dataCopy.sort((deviceA, deviceB) => {
      switch (sortValue) {
        case "system_name_ascending":
          return deviceA.system_name.localeCompare(deviceB.system_name);
        case "system_name_descending":
          return deviceA.system_name.localeCompare(deviceB.system_name) * -1;
        case "type_ascending":
          return deviceA.type.localeCompare(deviceB.type);
        case "type_descending":
          return deviceA.type.localeCompare(deviceB.type) * -1;
        case "hdd_capacity_ascending":
          if (Number(deviceA.hdd_capacity) > Number(deviceB.hdd_capacity))
            return 1;
          if (Number(deviceA.hdd_capacity) < Number(deviceB.hdd_capacity))
            return -1;
          return 0;
        case "hdd_capacity_descending":
          if (Number(deviceA.hdd_capacity) < Number(deviceB.hdd_capacity))
            return 1;
          if (Number(deviceA.hdd_capacity) > Number(deviceB.hdd_capacity))
            return -1;
          return 0;
        default:
          return 0;
      }
    });
  }, [devices, sortValue]);

  return {
    sortValue,
    setSortValue,
    devicesSorted,
  };
};
