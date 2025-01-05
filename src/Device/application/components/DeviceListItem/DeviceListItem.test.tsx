import { render, screen, userEvent } from "@/testUtils";

import { createDevice } from "@/Device/__factories__";

import { DeviceListItem } from "./DeviceListItem";

describe("DeviceListItem component", () => {
  const device = createDevice();

  it("renders correctly with props", () => {
    render(
      <DeviceListItem device={device} onEdit={jest.fn()} onDelete={jest.fn()} />
    );

    const systemName = screen.getByText(device.system_name);
    const type = screen.getByRole("cell", {
      name: new RegExp(`${device.type} workstation`, "i"),
    });
    const hddCapacity = screen.getByText(
      new RegExp(`${device.hdd_capacity} GB`, "i")
    );

    expect(systemName).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(hddCapacity).toBeInTheDocument();
  });

  it("calls onEdit handler when edit menu item is clicked", async () => {
    const handleEdit = jest.fn();
    render(
      <DeviceListItem
        device={device}
        onEdit={handleEdit}
        onDelete={jest.fn()}
      />
    );

    const menuButton = screen.getByRole("button", { name: "Options menu" });
    await userEvent.click(menuButton);

    const editMenuItem = screen.getByText("Edit");
    await userEvent.click(editMenuItem);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete handler when delete menu item is clicked", async () => {
    const handleDelete = jest.fn();
    render(
      <DeviceListItem
        device={device}
        onEdit={jest.fn()}
        onDelete={handleDelete}
      />
    );

    const menuButton = screen.getByRole("button", { name: "Options menu" });
    await userEvent.click(menuButton);

    const deleteMenuItem = screen.getByText("Delete");
    await userEvent.click(deleteMenuItem);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("highlights system name based on query", () => {
    const query = device.system_name.slice(0, 3);
    render(
      <DeviceListItem
        device={device}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        systemNameHighlightQuery={query}
      />
    );

    const highlightedText = screen.getByText(query);
    expect(highlightedText.tagName).toBe("MARK");
  });
});
