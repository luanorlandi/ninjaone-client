import { Box, Heading, HStack, Spacer, useDisclosure } from "@chakra-ui/react";

import { NavBar, Button, IconPlusSign } from "@/shared/ui/components";
import { DevicesList, DeviceAddDialog } from "@/Device/ui/components";
import { useListDevice } from "@/Device/infra";

export const DevicesPage = () => {
  const { data, isLoading: isLoadingDeviceList } = useListDevice();
  const { open: isCreateDialogOpen, onToggle: toggleCreateDialog } =
    useDisclosure();

  if (isLoadingDeviceList) {
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
          <Button onClick={toggleCreateDialog}>
            <IconPlusSign boxSize="14px" />
            Add device
          </Button>
        </HStack>
        <DevicesList devices={data} />
        <DeviceAddDialog
          isOpen={isCreateDialogOpen}
          onToggle={toggleCreateDialog}
        />
      </Box>
    </>
  );
};
