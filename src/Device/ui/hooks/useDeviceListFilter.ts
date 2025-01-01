import { useMemo, useState } from "react";

import { Device, DeviceType } from "@/Device/domain";

export const useDeviceListFilter = (devices: Device[]) => {
  const [systemNameFilter, setSystemNameFilter] = useState("");
  const [deviceTypesFilter, setDeviceTypesFilter] = useState<DeviceType[]>([
    "WINDOWS",
    "LINUX",
    "MAC",
  ]);

  const devicesFiltered = useMemo(() => {
    return devices.filter((device) => {
      const systemNameMatch = device.system_name
        ? device.system_name
            .toLowerCase()
            .includes(systemNameFilter.toLowerCase())
        : false;
      const deviceTypeMatch =
        deviceTypesFilter.length > 0
          ? deviceTypesFilter.includes(device.type)
          : true;
      return systemNameMatch && deviceTypeMatch;
    });
  }, [devices, systemNameFilter, deviceTypesFilter]);

  return {
    systemNameFilter,
    setSystemNameFilter,
    deviceTypesFilter,
    setDeviceTypesFilter,
    devicesFiltered,
  };
};
