import { renderHook, act } from "@/testUtils";
import { Device } from "@/Device/domain";

import { useDeviceSort } from "./useDeviceSort";

const devices: Device[] = [
  { id: "1", system_name: "Device A", type: "WINDOWS", hdd_capacity: "256" },
  { id: "2", system_name: "Device B", type: "LINUX", hdd_capacity: "512" },
  { id: "3", system_name: "Device C", type: "MAC", hdd_capacity: "1024" },
];

describe("useDeviceSort hook", () => {
  it("sorts devices by system name ascending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("system_name_ascending");
    });

    expect(result.current.devicesSorted[0].system_name).toBe("Device A");
    expect(result.current.devicesSorted[1].system_name).toBe("Device B");
    expect(result.current.devicesSorted[2].system_name).toBe("Device C");
  });

  it("sorts devices by system name descending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("system_name_descending");
    });

    expect(result.current.devicesSorted[0].system_name).toBe("Device C");
    expect(result.current.devicesSorted[1].system_name).toBe("Device B");
    expect(result.current.devicesSorted[2].system_name).toBe("Device A");
  });

  it("sorts devices by type ascending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("type_ascending");
    });

    expect(result.current.devicesSorted[0].type).toBe("LINUX");
    expect(result.current.devicesSorted[1].type).toBe("MAC");
    expect(result.current.devicesSorted[2].type).toBe("WINDOWS");
  });

  it("sorts devices by type descending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("type_descending");
    });

    expect(result.current.devicesSorted[0].type).toBe("WINDOWS");
    expect(result.current.devicesSorted[1].type).toBe("MAC");
    expect(result.current.devicesSorted[2].type).toBe("LINUX");
  });

  it("sorts devices by hdd capacity ascending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("hdd_capacity_ascending");
    });

    expect(result.current.devicesSorted[0].hdd_capacity).toBe("256");
    expect(result.current.devicesSorted[1].hdd_capacity).toBe("512");
    expect(result.current.devicesSorted[2].hdd_capacity).toBe("1024");
  });

  it("sorts devices by hdd capacity descending", () => {
    const { result } = renderHook(() => useDeviceSort(devices));

    act(() => {
      result.current.setSortValue("hdd_capacity_descending");
    });

    expect(result.current.devicesSorted[0].hdd_capacity).toBe("1024");
    expect(result.current.devicesSorted[1].hdd_capacity).toBe("512");
    expect(result.current.devicesSorted[2].hdd_capacity).toBe("256");
  });
});
