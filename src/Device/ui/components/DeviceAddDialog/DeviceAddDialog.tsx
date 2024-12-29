import { Input, createListCollection, useDisclosure } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

import {
  Button,
  IconPlusSign,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  Field,
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "@/shared/ui/components";
import { NewDevice, DeviceType } from "@/Device/domain";
import { useCreateDevice } from "@/Device/infra";

const devices = createListCollection<{ label: string; value: DeviceType }>({
  items: [
    { label: "Windows", value: "WINDOWS" },
    { label: "Linux", value: "LINUX" },
    { label: "Mac", value: "MAC" },
  ],
});

export const DeviceAddDialog = () => {
  const { open, onClose, onToggle } = useDisclosure();
  const { mutate, isPending } = useCreateDevice({
    onSuccess: () => {
      // TODO add toast feedback
      onClose();
    },
    onError: () => {
      // TODO add toast feedback
    },
  });
  const form = useForm<NewDevice>({
    defaultValues: {
      system_name: "",
      type: "WINDOWS",
      hdd_capacity: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={onToggle}
    >
      <DialogTrigger asChild>
        <Button>
          <IconPlusSign boxSize="14px" />
          Add device
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add device</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogBody>
            <form.Field
              name="system_name"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A system name is required" : undefined,
              }}
              children={(field) => {
                return (
                  <>
                    <Field
                      label="System name"
                      required
                      invalid={field.state.meta.errors.length > 0}
                      errorText={field.state.meta.errors.join(",")}
                    >
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                    </Field>
                  </>
                );
              }}
            />
            <form.Field
              name="type"
              validators={{
                onChange: ({ value }) =>
                  !value ? "A device type is required" : undefined,
              }}
              children={(field) => {
                return (
                  <Field
                    required
                    invalid={field.state.meta.errors.length > 0}
                    errorText={field.state.meta.errors.join(",")}
                  >
                    <SelectRoot
                      collection={devices}
                      value={[field.state.value]}
                      onValueChange={() => {
                        field.handleChange((value) => value);
                      }}
                      onInteractOutside={() => field.handleBlur()}
                    >
                      <SelectLabel>Device type</SelectLabel>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.items.map((device) => (
                          <SelectItem item={device} key={device.value}>
                            {device.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  </Field>
                );
              }}
            />
            <form.Field
              name="hdd_capacity"
              validators={{
                // TODO accept only numbers
                onChange: ({ value }) =>
                  !value ? "A HDD capacity (GB) is required" : undefined,
              }}
              children={(field) => {
                return (
                  <>
                    <Field
                      label="HDD capacity (GB)"
                      required
                      invalid={field.state.meta.errors.length > 0}
                      errorText={field.state.meta.errors.join(",")}
                    >
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  </>
                );
              }}
            />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button visual="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button type="submit" loading={isPending}>
              Submit
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
