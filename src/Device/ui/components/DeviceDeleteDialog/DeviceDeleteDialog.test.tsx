import { http, HttpResponse } from "msw";

import { render, screen, userEvent } from "@/testUtils";
import { server } from "@/mocks/server";
import { createDevice } from "@/Device/__factories__";

import { DeviceDeleteDialog } from "./DeviceDeleteDialog";

const handlers = [
  http.delete<{ deviceId: string }>("/devices/:deviceId", ({ params }) => {
    if (params.deviceId === "not-found") {
      return HttpResponse.json(0, { status: 200 });
    }

    return HttpResponse.json(1, { status: 200 });
  }),
];

describe("DeviceDeleteDialog component", () => {
  beforeEach(() => {
    server.use(...handlers);
  });

  it("deletes the device successfully", async () => {
    const onToggle = jest.fn();
    const device = createDevice();

    render(
      <DeviceDeleteDialog isOpen={true} onToggle={onToggle} device={device} />
    );

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);

    const toastMessage = await screen.findByText(
      `Device "${device.system_name}" deleted`
    );
    expect(toastMessage).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalled();
  });

  it("shows an error message when the delete request fails", async () => {
    const onToggle = jest.fn();
    const device = createDevice();
    device.id = "not-found";

    render(
      <DeviceDeleteDialog isOpen={true} onToggle={onToggle} device={device} />
    );

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);

    const toastMessage = await screen.findByText(
      `Failed to delete device "${device.system_name}". Try again later`
    );
    expect(toastMessage).toBeInTheDocument();
    expect(onToggle).not.toHaveBeenCalled();
  });
});
