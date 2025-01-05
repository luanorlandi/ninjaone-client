import { HStack, Input, createListCollection } from "@chakra-ui/react";

import {
  InputGroup,
  IconSearch,
  SelectRoot,
  SelectTrigger,
  SelectMultipleValueText,
  SelectContent,
  SelectItem,
} from "@/shared/application/components";
import { DeviceType } from "@/Device/domain";
import { useDebounce } from "@/shared/application/hooks";

const devicesCollection = createListCollection<{
  label: string;
  value: DeviceType;
}>({
  items: [
    { label: "Windows", value: "WINDOWS" },
    { label: "Linux", value: "LINUX" },
    { label: "Mac", value: "MAC" },
  ],
});

type DeviceListFiltersProps = {
  setSystemName: (systemName: string) => void;
  deviceTypes: DeviceType[];
  setDeviceTypes: (deviceTypes: DeviceType[]) => void;
};

export const DeviceListFilters = ({
  setSystemName,
  deviceTypes,
  setDeviceTypes,
}: DeviceListFiltersProps) => {
  const setSystemNameDebounced = useDebounce({ func: setSystemName });

  return (
    <HStack
      flexDirection="column"
      width="100%"
      lg={{ flexDirection: "row", width: "unset" }}
    >
      <InputGroup
        startElement={<IconSearch boxSize="16px" />}
        width="100%"
        lg={{ width: "unset" }}
      >
        <Input
          placeholder="Search"
          onChange={(event) => {
            setSystemNameDebounced(event.target.value);
          }}
          minWidth="270px"
        />
      </InputGroup>
      <SelectRoot
        multiple
        collection={devicesCollection}
        value={deviceTypes}
        onValueChange={(values) => {
          setDeviceTypes(values.value as DeviceType[]);
        }}
        minWidth="270px"
      >
        <SelectTrigger>
          <SelectMultipleValueText placeholder="Device type" />
        </SelectTrigger>
        <SelectContent>
          {devicesCollection.items.map((device) => (
            <SelectItem item={device} key={device.value}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </HStack>
  );
};
