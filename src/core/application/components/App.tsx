import { DevicesPage } from "@/Device/application/components";
import { Toaster } from "@/shared/application/components";

import { QueryProvider } from "./QueryProvider";
import { Provider } from "./ChakraProvider";

export const App = () => {
  return (
    <QueryProvider>
      <Provider>
        <DevicesPage />
        <Toaster />
      </Provider>
    </QueryProvider>
  );
};
