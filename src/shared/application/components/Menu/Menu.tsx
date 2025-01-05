import { Menu as ChakraMenu, MenuItemProps, Portal } from "@chakra-ui/react";
import * as React from "react";

interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} />
        </ChakraMenu.Positioner>
      </Portal>
    );
  }
);

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    return <ChakraMenu.Item ref={ref} {...props} cursor="pointer" />;
  }
);

export const MenuRoot = ChakraMenu.Root;
export const MenuTrigger = ChakraMenu.Trigger;
