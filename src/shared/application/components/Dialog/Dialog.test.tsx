import { render, screen } from "@/testUtils";
import {
  DialogRoot,
  DialogContent,
  DialogCloseTrigger,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "./Dialog";

describe("Dialog component", () => {
  it("renders correctly with default props", () => {
    render(
      <DialogRoot open>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogBody>Dialog Body</DialogBody>
          <DialogFooter>Dialog Footer</DialogFooter>
        </DialogContent>
      </DialogRoot>
    );

    const title = screen.getByText("Dialog Title");
    const body = screen.getByText("Dialog Body");
    const footer = screen.getByText("Dialog Footer");

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it("calls onClose handler when close button is clicked", async () => {
    const handleClose = jest.fn();
    render(
      <DialogRoot open onOpenChange={handleClose}>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogBody>Dialog Body</DialogBody>
        </DialogContent>
      </DialogRoot>
    );

    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    await closeButton.click();

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
