import { render, screen, userEvent, waitFor } from "@/testUtils";
import { DeviceList } from "./DeviceList";
import { createDevice } from "@/Device/__factories__";

describe("DeviceList component", () => {
  it("renders the list of devices", () => {
    const deviceA = createDevice();
    deviceA.system_name = `${deviceA.system_name} A`;
    const deviceB = createDevice();
    deviceB.system_name = `${deviceB.system_name} B`;
    const devices = [deviceA, deviceB];

    render(<DeviceList devices={devices} />);

    devices.forEach((device) => {
      expect(screen.getByText(device.system_name)).toBeInTheDocument();
    });
  });

  it("shows 'No results' when there are no devices", () => {
    render(<DeviceList devices={[]} />);

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("opens the edit dialog when the edit button is clicked", async () => {
    const devices = [createDevice()];

    render(<DeviceList devices={devices} />);

    const editButton = screen.getByText("Edit");
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Edit device")).toBeInTheDocument();
    });
  });

  it("opens the delete dialog when the delete button is clicked", async () => {
    const devices = [createDevice()];

    render(<DeviceList devices={devices} />);

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Delete device?")).toBeInTheDocument();
    });
  });
});
