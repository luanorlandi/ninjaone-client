import { useState } from "react";
import { HStack, Input, createListCollection } from "@chakra-ui/react";

import {
  InputGroup,
  IconSearch,
  SelectRoot,
  SelectTrigger,
  SelectMultipleValueText,
  SelectContent,
  SelectItem,
} from "@/shared/ui/components";
import { DeviceType } from "@/Device/domain";

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
  onChange: (filters: {
    systemName: string;
    deviceTypes: DeviceType[];
  }) => void;
};

export const DeviceListFilters = ({ onChange }: DeviceListFiltersProps) => {
  const [systemName, setSystemName] = useState("");
  // TODO add debounce on systemName
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([
    "WINDOWS",
    "LINUX",
    "MAC",
  ]);

  return (
    <HStack>
      <InputGroup startElement={<IconSearch boxSize="16px" />}>
        <Input
          placeholder="Search"
          value={systemName}
          onChange={(event) => {
            setSystemName(event.target.value);
            onChange({ systemName: event.target.value, deviceTypes });
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
          onChange({ systemName, deviceTypes: values.value as DeviceType[] });
        }}
        minWidth="270px"
      >
        <SelectTrigger>
          <SelectMultipleValueText placeholder="Device type"></SelectMultipleValueText>
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
