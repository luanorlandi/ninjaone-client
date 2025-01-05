import { render, screen, userEvent } from "@/testUtils";

import { DeviceListSort } from "./DeviceListSort";

describe("DeviceListSort component", () => {
  it("calls setSortValue when an option is selected", async () => {
    const setSortValue = jest.fn();
    render(
      <DeviceListSort
        sortValue="system_name_ascending"
        setSortValue={setSortValue}
      />
    );

    const selectTrigger = screen.getByRole("combobox");
    await userEvent.click(selectTrigger);

    const option = screen.getAllByText("Descending")[0];
    await userEvent.click(option);

    expect(setSortValue).toHaveBeenCalledWith("system_name_descending");
  });

  it("displays the selected value", () => {
    const setSortValue = jest.fn();
    render(
      <DeviceListSort
        sortValue="hdd_capacity_ascending"
        setSortValue={setSortValue}
      />
    );

    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger).toHaveTextContent(
      "Sort by: HDD Capacity (Ascending)"
    );
  });
});
