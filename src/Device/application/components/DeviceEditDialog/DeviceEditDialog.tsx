import { useEffect } from "react";
import { Input, createListCollection } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

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
  Field,
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  toaster,
} from "@/shared/application/components";
import { NewDevice, Device, DeviceType } from "@/Device/domain";
import { useEditDevice } from "@/Device/infrastructure";

const devices = createListCollection<{ label: string; value: DeviceType }>({
  items: [
    { label: "Windows", value: "WINDOWS" },
    { label: "Linux", value: "LINUX" },
    { label: "Mac", value: "MAC" },
  ],
});

type DeviceEditDialogProps = {
  isOpen: boolean;
  onToggle: () => void;
  device: Device;
};

export const DeviceEditDialog = ({
  isOpen,
  onToggle,
  device,
}: DeviceEditDialogProps) => {
  const { mutate, isPending } = useEditDevice({
    onSuccess: () => {
      toaster.success({
        title: `Device "${form.getFieldValue("system_name")}" edited`,
      });
      onToggle();
    },
    onError: () => {
      toaster.error({
        title: `Failed to edit device "${form.getFieldValue(
          "system_name"
        )}". Try again later`,
      });
    },
  });
  const form = useForm<NewDevice>({
    defaultValues: {
      system_name: "",
      type: "WINDOWS",
      hdd_capacity: "",
    },
    onSubmit: ({ value }) => {
      mutate({
        id: device.id,
        ...value,
      });
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.setFieldValue("system_name", device.system_name);
      form.setFieldValue("type", device.type);
      form.setFieldValue("hdd_capacity", device.hdd_capacity);
    }
  }, [isOpen]);

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      onExitComplete={form.reset}
      onOpenChange={onToggle}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit device</DialogTitle>
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
                onBlur: ({ value }) =>
                  !value ? "A system name is required" : undefined,
              }}
              children={(field) => {
                return (
                  <>
                    <Field
                      label="System name"
                      required
                      invalid={field.state.meta.errors?.length > 0}
                      errorText={field.state.meta.errors?.join(",")}
                    >
                      <Input
                        aria-label="System name"
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
                onBlur: ({ value }) =>
                  !value ? "A device type is required" : undefined,
              }}
              children={(field) => {
                return (
                  <Field
                    required
                    invalid={field.state.meta.errors?.length > 0}
                    errorText={field.state.meta.errors?.join(",")}
                  >
                    <SelectRoot
                      collection={devices}
                      value={[field.state.value]}
                      onValueChange={(values) => {
                        field.handleChange(() => values.value[0] as DeviceType);
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
                onBlur: ({ value }) => {
                  if (!value) {
                    return "A HDD capacity is required";
                  }

                  if (isNaN(Number(value))) {
                    return "A HDD capacity must be a number";
                  }

                  return undefined;
                },
              }}
              children={(field) => {
                return (
                  <>
                    <Field
                      label="HDD capacity (GB)"
                      required
                      invalid={field.state.meta.errors?.length > 0}
                      errorText={field.state.meta.errors?.join(",")}
                    >
                      <Input
                        aria-label="HDD capacity (GB)"
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
