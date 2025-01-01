import { Box, HStack, Spacer } from "@chakra-ui/react";

import {
  Button,
  IconNinjaOne,
  IconMoon,
  IconSun,
} from "@/shared/ui/components";
import { useColorMode } from "@/shared/ui/hooks";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" px={6} py={3} backgroundColor="{colors.blue.600}">
      <HStack>
        <IconNinjaOne height={26} width={120} />
        <Spacer />
        <Button
          onClick={toggleColorMode}
          visual="ghost"
          aria-label="Toggle color mode"
          size="sm"
          _hover={{
            backgroundColor: "{colors.blue.500}",
          }}
        >
          {colorMode === "light" ? (
            <IconSun boxSize="18px" />
          ) : (
            <IconMoon boxSize="18px" />
          )}
        </Button>
      </HStack>
    </Box>
  );
};
