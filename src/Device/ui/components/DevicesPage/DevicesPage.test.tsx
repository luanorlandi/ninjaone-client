import { http, HttpResponse } from "msw";

import { render, screen, userEvent, waitFor } from "@/testUtils";
import { server } from "@/mocks/server";
import { createDevice } from "@/Device/__factories__";

import { DevicesPage } from "./DevicesPage";

const deviceA = createDevice();
deviceA.system_name = `${deviceA.system_name} A`;
const deviceB = createDevice();
deviceB.system_name = `${deviceB.system_name} B`;
const deviceC = createDevice();
deviceB.system_name = `${deviceB.system_name} C`;
const devices = [deviceA, deviceB];
const devicesRefetch = [deviceA, deviceB, deviceC];

const handlersSuccess = [
  http.get("/devices", async () => {
    return HttpResponse.json(devices, { status: 200 });
  }),
];

const handlersSuccessRefetch = [
  http.get(
    "/devices",
    async () => {
      return HttpResponse.json(devices, { status: 200 });
    },
    { once: true }
  ),
  http.get("/devices", async () => {
    return HttpResponse.json(devicesRefetch, { status: 200 });
  }),
];

const handlersError = [
  http.get("/devices", async () => {
    return HttpResponse.json([], { status: 500 });
  }),
];

describe("DevicesPage component", () => {
  it("renders the list of devices", async () => {
    server.use(...handlersSuccess);

    render(<DevicesPage />);

    await waitFor(() => {
      devices.forEach((device) => {
        expect(screen.getByText(device.system_name)).toBeInTheDocument();
      });
    });
  });

  it("opens the create device dialog when the 'Add device' button is clicked", async () => {
    server.use(...handlersSuccess);
    render(<DevicesPage />);

    const addButton = screen.getByRole("button", { name: "Add device" });
    await userEvent.click(addButton);

    expect(
      screen.getByRole("heading", { name: "Add device" })
    ).toBeInTheDocument();
  });

  it("refetches the devices when the refresh button is clicked", async () => {
    server.use(...handlersSuccessRefetch);

    render(<DevicesPage />);

    const refreshButton = screen.getByRole("button", {
      name: "Refresh results",
    });
    await userEvent.click(refreshButton);

    devicesRefetch.forEach((device) => {
      expect(screen.getByText(device.system_name)).toBeInTheDocument();
    });
  });
});
