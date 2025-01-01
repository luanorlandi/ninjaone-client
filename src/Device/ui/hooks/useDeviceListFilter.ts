import { useMemo, useState } from "react";

import { Device, DeviceType } from "@/Device/domain";

export const useDeviceListFilter = (devices: Device[]) => {
  const [systemName, setSystemName] = useState("");
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([
    "WINDOWS",
    "LINUX",
    "MAC",
  ]);

  const devicesFiltered = useMemo(() => {
    return devices.filter((device) => {
      const systemNameMatch = device.system_name
        ? device.system_name.toLowerCase().includes(systemName.toLowerCase())
        : false;
      const deviceTypeMatch =
        deviceTypes.length > 0 ? deviceTypes.includes(device.type) : true;
      return systemNameMatch && deviceTypeMatch;
    });
  }, [devices, systemName, deviceTypes]);

  return {
    systemName,
    setSystemName,
    deviceTypes,
    setDeviceTypes,
    devicesFiltered,
  };
};
