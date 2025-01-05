import * as React from "react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import {
  defineRecipe,
  useRecipe,
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      solid: {
        backgroundColor: "{colors.blue.400}",
        borderColor: "{colors.blue.400}",
        color: "white",
        _hover: {
          backgroundColor: "{colors.blue.500}",
        },
        _focusVisible: {
          outlineColor: "{colors.blue.500}",
        },
        _expanded: {
          backgroundColor: "{colors.blue.500}",
        },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "#48446940",
        backgroundColor: "transparent",
        color: "{colors.blue.400}",
        _hover: {
          backgroundColor: "#E6E6E6",
        },
        _focusVisible: {
          outlineColor: "#48446940",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        _hover: {
          backgroundColor: "#E6E6E6",
        },
        _focusVisible: {
          outlineColor: "{colors.blue.100}",
        },
        _expanded: {
          backgroundColor: "#E6E6E6",
        },
      },
      plain: {
        backgroundColor: "transparent",
        _hover: {
          backgroundColor: "#E6E6E6",
        },
        _focusVisible: {
          outlineColor: "{colors.blue.100}",
        },
      },
      danger: {
        backgroundColor: "{colors.danger}",
        borderColor: "{colors.danger}",
        color: "white",
        _hover: {
          backgroundColor: "{colors.red.500}",
        },
        _focusVisible: {
          outlineColor: "{colors.red.500}",
        },
      },
    },
    size: {
      sm: {
        padding: 0,
        height: "36px",
        fontSize: "14px",
        fontWeight: "medium",
      },
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
  visual?:
    | "solid"
    | "subtle"
    | "surface"
    | "outline"
    | "ghost"
    | "plain"
    | "danger";
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
              <Spinner
                aria-label="Loading icon"
                size="inherit"
                color="inherit"
              />
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
