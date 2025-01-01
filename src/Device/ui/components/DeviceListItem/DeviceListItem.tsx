import { Box, HStack, Spacer, Text, Highlight } from "@chakra-ui/react";

import {
  IconApple,
  IconLinux,
  IconWindows,
  IconMenu,
  Button,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/shared/ui/components";
import type { DeviceType, Device } from "@/Device/domain";

const getLogo = (type: DeviceType): React.JSX.Element | null => {
  switch (type) {
    case "MAC":
      return <IconApple boxSize="16px" />;
    case "WINDOWS":
      return <IconWindows boxSize="16px" />;
    case "LINUX":
      return <IconLinux boxSize="16px" />;
    default:
      return null;
  }
};

type DeviceListItemProps = {
  device: Device;
  onEdit: () => void;
  onDelete: () => void;
  systemNameHighlightQuery?: string;
};

export const DeviceListItem = ({
  device,
  onEdit,
  onDelete,
  systemNameHighlightQuery = "",
}: DeviceListItemProps) => {
  return (
    <Box
      px={3}
      py={2}
      borderBottomWidth="1px"
      borderBottomColor="{colors.blue.300}"
      _hover={{
        backgroundColor: "#F4F4F5",
        "& [data-scope=menu]": {
          opacity: 100,
        },
      }}
    >
      <HStack>
        <Box>
          <Box gap={1} display="flex" alignItems="center">
            {getLogo(device.type)}
            <Text>
              <Highlight
                ignoreCase
                query={systemNameHighlightQuery}
                styles={{ backgroundColor: "{colors.orange.400}" }}
              >
                {device.system_name}
              </Highlight>
            </Text>
          </Box>
          <Box color="{colors.blue.100}">
            <Text as="span" textTransform="capitalize">
              {device.type.toLowerCase()}{" "}
              <Text as="span" textTransform="lowercase">
                workstation
              </Text>{" "}
              - {device.hdd_capacity} GB
            </Text>
          </Box>
        </Box>
        <Spacer />
        <MenuRoot>
          <MenuTrigger
            asChild
            opacity={0}
            _focusVisible={{ opacity: 100 }}
            _expanded={{ opacity: 100 }}
          >
            <Button visual="ghost" px="0px" py="2px">
              <IconMenu boxSize="14px" />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="edit" onClick={onEdit}>
              Edit
            </MenuItem>
            <MenuItem value="delete" color="{colors.danger}" onClick={onDelete}>
              Delete
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </HStack>
    </Box>
  );
};
