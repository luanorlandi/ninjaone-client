import { useState } from "react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";

import { DeviceListItem } from "@/Device/ui/components";
import type { Device } from "@/Device/domain";
import { DeviceDeleteDialog } from "@/Device/ui/components/DeviceDeleteDialog";

type DevicesListProps = {
  devices: Device[];
};

const EMPTY_DEVICE: Device = {
  id: "",
  system_name: "",
  type: "WINDOWS",
  hdd_capacity: "",
};

export const DevicesList = ({ devices }: DevicesListProps) => {
  const [deviceSelected, setDeviceSelected] = useState<Device>(EMPTY_DEVICE);
  const { open: isDeleteDialogOpen, onToggle: toggleDeleteDialog } =
    useDisclosure();

  return (
    <Box>
      <Text fontWeight="medium" px={3} py={2}>
        Device
      </Text>
      {devices.map((device) => (
        <DeviceListItem
          key={device.id}
          device={device}
          onEdit={() => {
            console.log("Edit device");
          }}
          onDelete={() => {
            setDeviceSelected(device);
            toggleDeleteDialog();
          }}
        />
      ))}
      <DeviceDeleteDialog
        isOpen={isDeleteDialogOpen}
        onToggle={toggleDeleteDialog}
        device={deviceSelected}
      />
    </Box>
  );
};
