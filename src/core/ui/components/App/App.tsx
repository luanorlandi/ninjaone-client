import { DevicesPage } from "@/Device/ui/components";

import { QueryProvider } from "@/core/infra";
import { ChakraProvider } from "@/core/ui/components";

export default function App() {
  return (
    <QueryProvider>
      <ChakraProvider>
        <DevicesPage />
      </ChakraProvider>
    </QueryProvider>
  );
}
