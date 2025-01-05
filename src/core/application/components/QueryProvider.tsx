import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type QueryProviderProps = {
  children: React.JSX.Element;
};

export const QueryProvider = (props: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};
