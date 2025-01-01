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

export const MenuArrow = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.ArrowProps
>(function MenuArrow(props, ref) {
  return (
    <ChakraMenu.Arrow ref={ref} {...props}>
      <ChakraMenu.ArrowTip />
    </ChakraMenu.Arrow>
  );
});

export const MenuItemGroup = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.ItemGroupProps
>(function MenuItemGroup(props, ref) {
  const { title, children, ...rest } = props;
  return (
    <ChakraMenu.ItemGroup ref={ref} {...rest}>
      {title && (
        <ChakraMenu.ItemGroupLabel userSelect="none">
          {title}
        </ChakraMenu.ItemGroupLabel>
      )}
      {children}
    </ChakraMenu.ItemGroup>
  );
});

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    return <ChakraMenu.Item ref={ref} {...props} cursor="pointer" />;
  }
);

export const MenuContextTrigger = ChakraMenu.ContextTrigger;
export const MenuRoot = ChakraMenu.Root;
export const MenuSeparator = ChakraMenu.Separator;

export const MenuItemText = ChakraMenu.ItemText;
export const MenuTrigger = ChakraMenu.Trigger;
