import { useState } from "react";
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
import {
  DevicesList,
  DeviceAddDialog,
  DeviceListFilters,
} from "@/Device/ui/components";
import { useListDevice } from "@/Device/infra";
import { Device, DeviceType } from "@/Device/domain";

export const DevicesPage = () => {
  const {
    data,
    isLoading: isLoadingDeviceList,
    isError,
    refetch,
  } = useListDevice();
  const [devicesFiltered, setDevicesFiltered] = useState<
    Device[] | undefined
  >();
  const { open: isCreateDialogOpen, onToggle: toggleCreateDialog } =
    useDisclosure();

  const handleFiltersChange = (filters: {
    systemName: string;
    deviceTypes: DeviceType[];
  }) => {
    const filteredDevices = data.filter((device) => {
      const systemNameMatch = device.system_name
        ? device.system_name
            .toLowerCase()
            .includes(filters.systemName.toLowerCase())
        : false;
      const deviceTypeMatch =
        filters.deviceTypes.length > 0
          ? filters.deviceTypes.includes(device.type)
          : true;
      return systemNameMatch && deviceTypeMatch;
    });
    setDevicesFiltered(filteredDevices);
  };

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
        <HStack pb={2}>
          <DeviceListFilters onChange={handleFiltersChange} />
          <Spacer />
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
        {!isLoadingDeviceList && !isError && (
          <DevicesList devices={devicesFiltered ?? data} />
        )}
        <DeviceAddDialog
          isOpen={isCreateDialogOpen}
          onToggle={toggleCreateDialog}
        />
      </Box>
    </>
  );
};
