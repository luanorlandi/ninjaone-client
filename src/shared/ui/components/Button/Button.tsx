import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import {
  defineRecipe,
  useRecipe,
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from "@chakra-ui/react";
import * as React from "react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      solid: {
        backgroundColor: {
          base: "{colors.blue.400}",
          _hover: "{colors.blue.500}",
        },
        color: "white",
        outlineColor: {
          _focusVisible: "{colors.blue.500}",
        },
      },
      outline: { borderWidth: "1px", borderColor: "{colors.blue.400}" },
      ghost: {
        backgroundColor: "transparent",
        _hover: {
          backgroundColor: "#E8E8EA",
        },
        outlineColor: {
          _focusVisible: "{colors.blue.100}",
        },
        _expanded: {
          backgroundColor: "#E8E8EA",
        },
      },
    },
    size: {
      md: { padding: 3, fontSize: "14px", fontWeight: "medium" },
    },
  },
  defaultVariants: {
    size: "md",
    visual: "solid",
  },
});

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {
  visual?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, visual, size, ...rest } =
      props;

    const recipe = useRecipe({ recipe: buttonRecipe });
    const styles = recipe({ visual, size });

    return (
      <ChakraButton
        css={styles}
        disabled={loading || disabled}
        ref={ref}
        {...rest}
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  }
);
