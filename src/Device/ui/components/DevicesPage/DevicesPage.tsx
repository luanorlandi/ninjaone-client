import { Box, Heading, HStack, Spacer } from "@chakra-ui/react";

import { NavBar, Button, IconPlusSign } from "@/shared/ui/components";
import { DevicesList } from "..";

export const DevicesPage = () => {
  return (
    <>
      <NavBar />
      <Box p={6}>
        <HStack mb={6}>
          <Heading
            as="h1"
            size="xl"
            fontWeight="medium"
            color="{colors.blue.900}"
          >
            Devices
          </Heading>
          <Spacer />
          <Button>
            <IconPlusSign boxSize="14px" />
            Add device
          </Button>
        </HStack>
        <DevicesList
          devices={[
            {
              id: "1",
              system_name: "DESKTOP-0VCBIFF",
              type: "WINDOWS",
              hdd_capacity: "128 GB",
            },
            {
              id: "2",
              system_name: "LINUX-SMITH-J",
              type: "LINUX",
              hdd_capacity: "64 GB",
            },
            {
              id: "3",
              system_name: "MAC-SMITH-JOHN",
              type: "MAC",
              hdd_capacity: "32 GB",
            },
          ]}
        />
      </Box>
    </>
  );
};
