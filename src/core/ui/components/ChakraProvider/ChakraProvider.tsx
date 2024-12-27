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
          base: { value: "#D53948" },
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red.base}" },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
    </ChakraProvider>
  );
}

export default system;
