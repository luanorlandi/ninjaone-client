import { http, HttpResponse } from "msw";

import { render, screen, userEvent } from "@/testUtils";
import { server } from "@/mocks/server";
import { Device } from "@/Device/domain";
import { createDevice } from "@/Device/__factories__";

import { DeviceEditDialog } from "./DeviceEditDialog";

const handlers = [
  http.put<{}, Device>("/devices/:deviceId", async ({ request }) => {
    const requestBody = await request.json();

    if (requestBody.system_name === "error") {
      return HttpResponse.json(0, { status: 200 });
    }

    return HttpResponse.json(requestBody, { status: 200 });
  }),
];

describe("DeviceEditDialog component", () => {
  beforeEach(() => {
    server.use(...handlers);
  });

  it("edits the device successfully", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    const deviceA = createDevice();
    const deviceB = createDevice();

    render(
      <DeviceEditDialog device={deviceA} isOpen={true} onToggle={onToggle} />
    );

    const systemNameInput = screen.getByLabelText("System name");
    await user.clear(systemNameInput);
    await userEvent.type(systemNameInput, `${deviceB.system_name}`);

    const typeInput = screen.getByRole("combobox");
    await userEvent.click(typeInput);

    const deviceTypeCapitalized =
      deviceB.type.charAt(0).toUpperCase() +
      deviceB.type.slice(1).toLowerCase();
    const option = await screen.findAllByText(deviceTypeCapitalized);
    await userEvent.click(option[option.length - 1]);

    const hddCapacityInput = screen.getByLabelText("HDD capacity (GB)");
    await userEvent.type(hddCapacityInput, deviceB.hdd_capacity);

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    const toastMessage = await screen.findByText(
      `Device "${deviceB.system_name}" edited`
    );
    expect(toastMessage).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalled();
  });

  it("shows an error message when the edit request fails", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    const device = createDevice();

    render(
      <DeviceEditDialog device={device} isOpen={true} onToggle={onToggle} />
    );

    const systemNameInput = screen.getByLabelText("System name");
    await user.clear(systemNameInput);
    await userEvent.type(systemNameInput, "error");

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    const toastMessage = await screen.findByText(
      `Failed to edit device "error". Try again later`
    );
    expect(toastMessage).toBeInTheDocument();
  });
});
