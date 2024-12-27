export type DeviceType = "WINDOWS" | "LINUX" | "MAC";

export type Device = {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: string;
};

export type NewDevice = {
  system_name: string;
  type: DeviceType;
  hdd_capacity: string;
};
