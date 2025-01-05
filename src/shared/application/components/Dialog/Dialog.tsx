import * as React from "react";
import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";

import { IconClose, Button } from "@/shared/application/components";

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  );
});

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <Button
        visual="plain"
        size="sm"
        p={0}
        ref={ref}
        aria-label="Close dialog"
      >
        <IconClose boxSize="12px" />
      </Button>
    </ChakraDialog.CloseTrigger>
  );
});

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  ChakraDialog.TitleProps
>(function DialogTitle(props, ref) {
  return (
    <ChakraDialog.Title
      ref={ref}
      fontWeight="medium"
      fontSize="24px"
      {...props}
    ></ChakraDialog.Title>
  );
});

export const DialogHeader = React.forwardRef<
  HTMLDivElement,
  ChakraDialog.HeaderProps
>(function DialogHeader(props, ref) {
  return (
    <ChakraDialog.Header
      ref={ref}
      px={6}
      pt={6}
      pb={3}
      {...props}
    ></ChakraDialog.Header>
  );
});

export const DialogBody = React.forwardRef<
  HTMLDivElement,
  ChakraDialog.BodyProps
>(function DialogBody(props, ref) {
  return (
    <ChakraDialog.Body ref={ref} px={6} py={3} {...props}></ChakraDialog.Body>
  );
});

export const DialogFooter = React.forwardRef<
  HTMLDivElement,
  ChakraDialog.FooterProps
>(function DialogFooter(props, ref) {
  return (
    <ChakraDialog.Footer
      ref={ref}
      px={6}
      pb={6}
      pt={5}
      {...props}
    ></ChakraDialog.Footer>
  );
});

export const DialogRoot = ChakraDialog.Root;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;
