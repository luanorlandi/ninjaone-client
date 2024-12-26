import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";

import { App, ChakraProvider } from "./core/ui/components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
