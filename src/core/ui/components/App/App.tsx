import { DevicesPage } from "@/Device/ui/components";
import { QueryProvider } from "@/core/infra";
import { ChakraProvider } from "@/core/ui/components";
import { Toaster } from "@/shared/ui/components";

export default function App() {
  return (
    <QueryProvider>
      <ChakraProvider>
        <DevicesPage />
        <Toaster />
      </ChakraProvider>
    </QueryProvider>
  );
}
