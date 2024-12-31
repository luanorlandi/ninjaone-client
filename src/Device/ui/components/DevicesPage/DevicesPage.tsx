import {
  Box,
  Heading,
  HStack,
  Spacer,
  Center,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import {
  NavBar,
  Button,
  IconPlusSign,
  IconRefresh,
  ToggleTip,
} from "@/shared/ui/components";
import { DevicesList, DeviceAddDialog } from "@/Device/ui/components";
import { useListDevice } from "@/Device/infra";

export const DevicesPage = () => {
  const {
    data,
    isLoading: isLoadingDeviceList,
    isError,
    refetch,
  } = useListDevice();
  const { open: isCreateDialogOpen, onToggle: toggleCreateDialog } =
    useDisclosure();

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
        <HStack>
          {/* TODO add filters */}
          <ToggleTip content="Results refreshed!">
            <Button visual="ghost" onClick={() => refetch()}>
              <IconRefresh boxSize="14px" />
            </Button>
          </ToggleTip>
        </HStack>
        {isLoadingDeviceList && !isError && (
          <Center>
            <Spinner color="{colors.blue.400}" size="xl" />
          </Center>
        )}
        {!isLoadingDeviceList && isError && (
          <Center py={4}>
            <Box>Something went wrong to load the devices</Box>
          </Center>
        )}
        {!isLoadingDeviceList && !isError && <DevicesList devices={data} />}
        <DeviceAddDialog
          isOpen={isCreateDialogOpen}
          onToggle={toggleCreateDialog}
        />
      </Box>
    </>
  );
};
