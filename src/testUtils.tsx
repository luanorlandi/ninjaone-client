import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { QueryProvider } from "@/core/infra/QueryProvider";
import { Provider } from "@/core/ui/components/ChakraProvider/ChakraProvider";
import { Toaster } from "@/shared/ui/components";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Provider>
        {children}
        <Toaster />
      </Provider>
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
