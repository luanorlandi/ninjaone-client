import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  errorText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, errorText, invalid, ...rest } = props;
    return (
      <ChakraField.Root
        ref={ref}
        gap={1}
        pb={invalid && errorText ? 1 : 6}
        invalid={invalid}
        {...rest}
      >
        {label && (
          <ChakraField.Label>
            {label}
            <ChakraField.RequiredIndicator color="unset" />
          </ChakraField.Label>
        )}
        {children}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
