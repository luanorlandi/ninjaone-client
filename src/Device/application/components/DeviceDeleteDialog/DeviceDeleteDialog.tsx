import {
  Button,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  toaster,
} from "@/shared/application/components";
import { Device } from "@/Device/domain";
import { useDeleteDevice } from "@/Device/infrastructure/hooks";

type DeviceDeleteDialogProps = {
  isOpen: boolean;
  onToggle: () => void;
  device: Device;
};

export const DeviceDeleteDialog = ({
  isOpen,
  onToggle,
  device,
}: DeviceDeleteDialogProps) => {
  const { mutate, data, isPending } = useDeleteDevice({
    onSuccess: () => {
      toaster.success({ title: `Device "${device.system_name}" deleted` });
      onToggle();
    },
    onError: () => {
      toaster.error({
        title: `Failed to delete device "${device.system_name}". Try again later`,
      });
    },
  });

  return (
    <DialogRoot placement="center" open={isOpen} onOpenChange={onToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete device?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          You are about to delete the device {device.system_name}. This action
          cannot be undone.
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button visual="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            visual="danger"
            loading={isPending}
            onClick={() => mutate(device.id)}
            loadingText="Delete"
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
