import { Box, Text } from "@chakra-ui/react";

import { DeviceListItem } from "@/Device/ui/components";
import type { Device } from "@/Device/domain";

type DevicesListProps = {
  devices: Device[];
};

export const DevicesList = ({ devices }: DevicesListProps) => {
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
            console.log("Delete device");
          }}
        />
      ))}
    </Box>
  );
};
