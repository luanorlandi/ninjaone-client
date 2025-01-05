import { renderHook, act } from "@/testUtils";

import { Device } from "@/Device/domain";

import { useDeviceListFilter } from "./useDeviceListFilter";

const devices: Device[] = [
  { id: "1", system_name: "Device A", type: "WINDOWS", hdd_capacity: "256" },
  { id: "2", system_name: "Device B", type: "LINUX", hdd_capacity: "512" },
  { id: "3", system_name: "Device C", type: "MAC", hdd_capacity: "1024" },
];

describe("useDeviceListFilter hook", () => {
  it("filters devices by system name", () => {
    const { result } = renderHook(() => useDeviceListFilter(devices));

    act(() => {
      result.current.setSystemNameFilter("Device A");
    });

    expect(result.current.devicesFiltered).toHaveLength(1);
    expect(result.current.devicesFiltered[0].system_name).toBe("Device A");
  });

  it("filters devices by type", () => {
    const { result } = renderHook(() => useDeviceListFilter(devices));

    act(() => {
      result.current.setDeviceTypesFilter(["LINUX"]);
    });

    expect(result.current.devicesFiltered).toHaveLength(1);
    expect(result.current.devicesFiltered[0].type).toBe("LINUX");
  });

  it("filters devices by system name and multiple types", () => {
    const { result } = renderHook(() => useDeviceListFilter(devices));

    act(() => {
      result.current.setSystemNameFilter("Device");
      result.current.setDeviceTypesFilter(["WINDOWS", "MAC"]);
    });

    expect(result.current.devicesFiltered).toHaveLength(2);
    expect(result.current.devicesFiltered[0].type).toBe("WINDOWS");
    expect(result.current.devicesFiltered[1].type).toBe("MAC");
  });

  it("returns all devices when no filters are applied", () => {
    const { result } = renderHook(() => useDeviceListFilter(devices));

    expect(result.current.devicesFiltered).toHaveLength(3);
  });
});
