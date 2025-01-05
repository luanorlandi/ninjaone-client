import { http, HttpResponse } from "msw";

import { render, screen, userEvent } from "@/testUtils";
import { server } from "@/mocks/server";
import { Device } from "@/Device/domain";
import { createDevice } from "@/Device/__factories__";

import { DeviceCreateDialog } from "./DeviceCreateDialog";

const handlers = [
  http.post<{}, Device>("/devices", async ({ request }) => {
    const requestBody = await request.json();

    if (requestBody.system_name === "error") {
      return HttpResponse.json({}, { status: 500 });
    }

    return HttpResponse.json(requestBody, { status: 200 });
  }),
];

describe("DeviceCreateDialog component", () => {
  beforeEach(() => {
    server.use(...handlers);
  });

  it("creates the device successfully", async () => {
    const onToggle = jest.fn();
    const device = createDevice();

    render(<DeviceCreateDialog isOpen={true} onToggle={onToggle} />);

    const systemNameInput = screen.getByLabelText("System name");
    await userEvent.type(systemNameInput, device.system_name);

    const typeInput = screen.getByRole("combobox");
    await userEvent.click(typeInput);

    const deviceTypeCapitalized =
      device.type.charAt(0).toUpperCase() + device.type.slice(1).toLowerCase();
    const option = await screen.findAllByText(deviceTypeCapitalized);
    await userEvent.click(option[option.length - 1]);

    const hddCapacityInput = screen.getByLabelText("HDD capacity (GB)");
    await userEvent.type(hddCapacityInput, device.hdd_capacity);

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    const toastMessage = await screen.findByText(
      `Device "${device.system_name}" created`
    );
    expect(toastMessage).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalled();
  });

  it("shows an error message when the create request fails", async () => {
    const onToggle = jest.fn();
    const device = createDevice();
    device.system_name = "error";

    render(<DeviceCreateDialog isOpen={true} onToggle={onToggle} />);

    const systemNameInput = screen.getByLabelText("System name");
    await userEvent.type(systemNameInput, device.system_name);

    const typeInput = screen.getByRole("combobox");
    await userEvent.click(typeInput);

    const deviceTypeCapitalized =
      device.type.charAt(0).toUpperCase() + device.type.slice(1).toLowerCase();
    const option = await screen.findAllByText(deviceTypeCapitalized);
    await userEvent.click(option[option.length - 1]);

    const hddCapacityInput = screen.getByLabelText("HDD capacity (GB)");
    await userEvent.type(hddCapacityInput, device.hdd_capacity);

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    const toastMessage = await screen.findByText(
      `Failed to create device "${device.system_name}". Try again later`
    );
    expect(toastMessage).toBeInTheDocument();
  });
});
