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
} from "@/shared/application/components";
import {
  DeviceList,
  DeviceCreateDialog,
  DeviceListFilters,
  DeviceListSort,
} from "@/Device/application/components";
import { useListDevice } from "@/Device/infrastructure";
import { useDeviceListFilter, useDeviceSort } from "@/Device/application/hooks";

export const DevicesPage = () => {
  const {
    data,
    isLoading: isLoadingDeviceList,
    isError,
    refetch,
  } = useListDevice();
  const {
    systemNameFilter,
    setSystemNameFilter,
    deviceTypesFilter,
    setDeviceTypesFilter,
    devicesFiltered,
  } = useDeviceListFilter(data);
  const { sortValue, setSortValue, devicesSorted } =
    useDeviceSort(devicesFiltered);
  const { open: isCreateDialogOpen, onToggle: toggleCreateDialog } =
    useDisclosure();

  return (
    <>
      <NavBar />
      <Box as="main" p={6}>
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
        <HStack
          pb={2}
          flexDirection="column"
          alignItems="flex-end"
          lg={{ flexDirection: "row" }}
        >
          <DeviceListFilters
            setSystemName={setSystemNameFilter}
            deviceTypes={deviceTypesFilter}
            setDeviceTypes={setDeviceTypesFilter}
          />
          <DeviceListSort sortValue={sortValue} setSortValue={setSortValue} />
          <Spacer />
          <ToggleTip content="Results refreshed!">
            <Button
              visual="ghost"
              onClick={() => refetch()}
              aria-label="Refresh results"
            >
              <IconRefresh boxSize="14px" />
            </Button>
          </ToggleTip>
        </HStack>
        {isLoadingDeviceList && !isError && (
          <Center>
            <Spinner
              color="{colors.blue.400}"
              size="xl"
              data-testid="loading-list"
            />
          </Center>
        )}
        {!isLoadingDeviceList && isError && (
          <Center py={4}>
            <Box>Something went wrong to load the devices</Box>
          </Center>
        )}
        {!isLoadingDeviceList && !isError && (
          <DeviceList
            devices={devicesSorted}
            systemNameHighlightQuery={systemNameFilter}
          />
        )}
        <DeviceCreateDialog
          isOpen={isCreateDialogOpen}
          onToggle={toggleCreateDialog}
        />
      </Box>
    </>
  );
};
