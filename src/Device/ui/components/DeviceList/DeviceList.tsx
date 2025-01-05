import { useState } from "react";
import { Box, Center, Text, useDisclosure } from "@chakra-ui/react";

import {
  DeviceListItem,
  DeviceEditDialog,
  DeviceDeleteDialog,
} from "@/Device/ui/components";
import type { Device } from "@/Device/domain";

type DeviceListProps = {
  devices: Device[];
  systemNameHighlightQuery?: string;
};

const EMPTY_DEVICE: Device = {
  id: "",
  system_name: "",
  type: "WINDOWS",
  hdd_capacity: "",
};

export const DeviceList = ({
  devices,
  systemNameHighlightQuery,
}: DeviceListProps) => {
  const [deviceSelected, setDeviceSelected] = useState<Device>(EMPTY_DEVICE);
  const { open: isDeleteDialogOpen, onToggle: toggleDeleteDialog } =
    useDisclosure();
  const { open: isEditDialogOpen, onToggle: toggleEditDialog } =
    useDisclosure();

  return (
    <Box>
      <Text fontWeight="medium" px={3} py={2}>
        Device
      </Text>
      <Box as="hr" borderColor="{colors.borderPrimary}"></Box>
      {devices.length === 0 && (
        <Center py={4}>
          <Box>No results</Box>
        </Center>
      )}
      {devices.length > 0 &&
        devices.map((device) => (
          <DeviceListItem
            key={device.id}
            device={device}
            onEdit={() => {
              setDeviceSelected(device);
              toggleEditDialog();
            }}
            onDelete={() => {
              setDeviceSelected(device);
              toggleDeleteDialog();
            }}
            systemNameHighlightQuery={systemNameHighlightQuery}
          />
        ))}
      <DeviceEditDialog
        isOpen={isEditDialogOpen}
        onToggle={toggleEditDialog}
        device={deviceSelected}
      />
      <DeviceDeleteDialog
        isOpen={isDeleteDialogOpen}
        onToggle={toggleDeleteDialog}
        device={deviceSelected}
      />
    </Box>
  );
};
