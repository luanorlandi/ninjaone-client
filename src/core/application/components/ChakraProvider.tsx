import {
  ChakraProvider,
  defineConfig,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";

const customConfig = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  strictTokens: true,
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      backgroundColor: "{colors.backgroundColor}",
      color: "{colors.text}",
    },
  },
  theme: {
    tokens: {
      colors: {
        gray: {
          200: { value: "#CECAC3" },
          300: { value: "#9F978A" },
          350: { value: "#CBCFD3" },
          400: { value: "#6E6D7A" },
          500: { value: "#595766" },
          600: { value: "#363b3d" },
        },
        blue: {
          100: { value: "#6E6D7A" },
          200: { value: "#595766" },
          300: { value: "#E7E8EB" },
          400: { value: "#337AB7" },
          500: { value: "#2e6ea5" },
          600: { value: "#002A42" },
          900: { value: "#211F33" },
        },
        red: {
          400: { value: "#D53948" },
          500: { value: "#C82B3A" },
          600: { value: "#a1222e" },
        },
        orange: {
          400: { value: "#FFA500" },
          500: { value: "#CC8400" },
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: {
          value: { base: "{colors.red.400}", _dark: "{colors.red.600}" },
        },
        backgroundColor: {
          value: { base: "#FFFFFF", _dark: "#181a1b" },
        },
        text: {
          value: { base: "{colors.blue.900}", _dark: "{colors.gray.200}" },
        },
        textSecondary: {
          value: { base: "{colors.gray.400}", _dark: "{colors.gray.300}" },
        },
        textHighlight: {
          value: { base: "{colors.orange.400}", _dark: "{colors.orange.500}" },
        },
        borderPrimary: {
          value: { base: "{colors.gray.350}", _dark: "{colors.gray.600}" },
        },
        borderSecondary: {
          value: { base: "{colors.blue.300}", _dark: "{colors.gray.600}" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export const Provider = (props: ThemeProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
    </ChakraProvider>
  );
};

export default system;
