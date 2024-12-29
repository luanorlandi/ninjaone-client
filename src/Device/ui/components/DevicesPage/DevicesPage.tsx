import { Box, Heading, HStack, Spacer, useDisclosure } from "@chakra-ui/react";

import { NavBar, Button, IconPlusSign } from "@/shared/ui/components";
import { useListDevice } from "@/Device/infra";
import { DeviceAddDialog, DevicesList } from "@/Device/ui/components";

export const DevicesPage = () => {
  const { data, isLoading } = useListDevice();
  const { open: isAddDialogOpen, onToggle: toggleAddDialog } = useDisclosure();

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
          <Button onClick={toggleAddDialog}>
            <IconPlusSign boxSize="14px" />
            Add device
          </Button>
        </HStack>
        <DevicesList devices={data} />
        <DeviceAddDialog isOpen={isAddDialogOpen} onToggle={toggleAddDialog} />
      </Box>
    </>
  );
};
