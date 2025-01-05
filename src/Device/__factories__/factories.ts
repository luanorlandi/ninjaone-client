import { faker } from "@faker-js/faker";

import { Device } from "@/Device/domain";

export const createDevice = (): Device => {
  return {
    id: faker.string.uuid(),
    system_name: `${faker.person
      .firstName()
      .toUpperCase()}-${faker.helpers.arrayElement([
      "SMART",
      "GUEST",
      "COMPUTER",
      "LOCAL",
      "HOST",
    ])}`,
    type: faker.helpers.arrayElement(["WINDOWS", "MAC", "LINUX"]),
    hdd_capacity: `${faker.number.int({ min: 1, max: 2048 })}`,
  };
};
