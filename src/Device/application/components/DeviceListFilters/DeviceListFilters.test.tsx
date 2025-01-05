import { render, screen, userEvent, waitFor } from "@/testUtils";
import { DeviceType } from "@/Device/domain";

import { DeviceListFilters } from "./DeviceListFilters";

describe("DeviceListFilters component", () => {
  it("calls setSystemName with debounced value", async () => {
    const setSystemName = jest.fn();
    const setDeviceTypes = jest.fn();

    render(
      <DeviceListFilters
        setSystemName={setSystemName}
        deviceTypes={[]}
        setDeviceTypes={setDeviceTypes}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    await userEvent.type(searchInput, "Device");

    await waitFor(() => {
      expect(setSystemName).toHaveBeenCalledTimes(1);
      expect(setSystemName).toHaveBeenCalledWith("Device");
    });
  });

  it("calls setDeviceTypes with multiple selected device types", async () => {
    const setSystemName = jest.fn();
    const setDeviceTypes = jest.fn();
    let deviceTypes: DeviceType[] = [];

    const { rerender } = render(
      <DeviceListFilters
        setSystemName={setSystemName}
        deviceTypes={deviceTypes}
        setDeviceTypes={setDeviceTypes}
      />
    );

    const typeInput = screen.getByRole("combobox");
    await userEvent.click(typeInput);

    let deviceOption = screen.getByText("Windows");
    await userEvent.click(deviceOption);
    deviceTypes = ["WINDOWS"];

    expect(setDeviceTypes).toHaveBeenLastCalledWith(deviceTypes);

    rerender(
      <DeviceListFilters
        setSystemName={setSystemName}
        deviceTypes={deviceTypes}
        setDeviceTypes={setDeviceTypes}
      />
    );

    deviceOption = screen.getByText("Linux");
    await userEvent.click(deviceOption);
    deviceTypes = ["WINDOWS", "LINUX"];

    expect(setDeviceTypes).toHaveBeenLastCalledWith(deviceTypes);

    rerender(
      <DeviceListFilters
        setSystemName={setSystemName}
        deviceTypes={deviceTypes}
        setDeviceTypes={setDeviceTypes}
      />
    );

    deviceOption = screen.getByText("Mac");
    await userEvent.click(deviceOption);
    deviceTypes = ["WINDOWS", "LINUX", "MAC"];

    expect(setDeviceTypes).toHaveBeenLastCalledWith(deviceTypes);
  });
});
