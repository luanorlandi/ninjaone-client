import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { QueryProvider, ChakraProvider } from "@/core/application/components";
import { Toaster } from "@/shared/application/components";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ChakraProvider>
        {children}
        <Toaster />
      </ChakraProvider>
    </QueryProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
export { default as userEvent } from "@testing-library/user-event";
