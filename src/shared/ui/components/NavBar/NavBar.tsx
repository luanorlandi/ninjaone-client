import { Box } from "@chakra-ui/react";

import { IconNinjaOne } from "@/shared/ui/components";

export const NavBar = () => {
  return (
    <Box as="nav" px={6} py={3} backgroundColor="{colors.blue.600}">
      <IconNinjaOne height={26} width={120} />
    </Box>
  );
};
