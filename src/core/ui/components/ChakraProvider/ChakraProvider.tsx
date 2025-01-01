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
      backgroundColor: "white",
      color: "{colors.blue.900}",
    },
  },
  theme: {
    tokens: {
      colors: {
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
        },
        orange: {
          400: { value: "#FFA500" },
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red.400}" },
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
