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
} from "@/shared/ui/components";
import { Device } from "@/Device/domain";
import { useDeleteDevice } from "@/Device/infra/hooks";

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
  const { mutate, isPending } = useDeleteDevice({
    onSuccess: () => {
      // TODO add toast
      onToggle();
    },
    onError: () => {
      // TODO add toast
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
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
