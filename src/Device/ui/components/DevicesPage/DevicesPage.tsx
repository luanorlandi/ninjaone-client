import { Box, Heading, HStack, Spacer } from "@chakra-ui/react";

import { NavBar, Button, IconPlusSign } from "@/shared/ui/components";
import { useListDevice } from "@/Device/infra";
import { DeviceAddDialog, DevicesList } from "@/Device/ui/components";

export const DevicesPage = () => {
  const { data, isLoading } = useListDevice();

  if (isLoading) {
    // TODO: add spinner or skeleton loading
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <Box p={6}>
        <HStack mb={6}>
          <Heading as="h1" size="xl" fontWeight="medium">
            Devices
          </Heading>
          <Spacer />
          {/* <Button>
            <IconPlusSign boxSize="14px" />
            Add device
          </Button> */}
          <DeviceAddDialog />
        </HStack>
        <DevicesList devices={data} />
      </Box>
    </>
  );
};
