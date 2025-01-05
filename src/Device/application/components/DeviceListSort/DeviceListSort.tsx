import { createListCollection, HStack } from "@chakra-ui/react";

import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  SelectItemGroup,
} from "@/shared/application/components";
import { DeviceSortValue } from "@/Device/domain";

const sortCollection = createListCollection<{
  label: string;
  labelField: string;
  value: DeviceSortValue;
  group: string;
}>({
  items: [
    {
      labelField: "Ascending",
      label: "Sort by: System Name (Ascending)",
      value: "system_name_ascending",
      group: "System Name",
    },
    {
      labelField: "Descending",
      label: "Sort by: System Name (Descending)",
      value: "system_name_descending",
      group: "System Name",
    },
    {
      labelField: "Ascending",
      label: "Sort by: Type (Ascending)",
      value: "type_ascending",
      group: "Type",
    },
    {
      labelField: "Descending",
      label: "Sort by: Type (Descending)",
      value: "type_descending",
      group: "Type",
    },
    {
      labelField: "Ascending",
      label: "Sort by: HDD Capacity (Ascending)",
      value: "hdd_capacity_ascending",
      group: "HDD Capacity",
    },
    {
      labelField: "Descending",
      label: "Sort by: HDD Capacity (Descending)",
      value: "hdd_capacity_descending",
      group: "HDD Capacity",
    },
  ],
});

const sortCategories = [
  {
    group: "System Name",
    items: sortCollection.items.filter((item) => item.group === "System Name"),
  },
  {
    group: "Type",
    items: sortCollection.items.filter((item) => item.group === "Type"),
  },
  {
    group: "HDD Capacity",
    items: sortCollection.items.filter((item) => item.group === "HDD Capacity"),
  },
];

type DeviceListSortProps = {
  sortValue: DeviceSortValue;
  setSortValue: (sorValue: DeviceSortValue) => void;
};

export const DeviceListSort = ({
  sortValue,
  setSortValue,
}: DeviceListSortProps) => {
  return (
    <HStack width="100%" lg={{ width: "unset" }}>
      <SelectRoot
        collection={sortCollection}
        value={sortValue ? [sortValue] : []}
        onValueChange={(values) => {
          setSortValue(values.value[0] as DeviceSortValue);
        }}
        minWidth="330px"
      >
        <SelectTrigger clearable>
          <SelectValueText placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortCategories.map((category) => (
            <SelectItemGroup key={category.group} label={category.group}>
              {category.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.labelField}
                </SelectItem>
              ))}
            </SelectItemGroup>
          ))}
        </SelectContent>
      </SelectRoot>
    </HStack>
  );
};
