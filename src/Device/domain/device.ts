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

export type DeviceSortValue =
  | undefined
  | "system_name_ascending"
  | "system_name_descending"
  | "type_ascending"
  | "type_descending"
  | "hdd_capacity_ascending"
  | "hdd_capacity_descending";
