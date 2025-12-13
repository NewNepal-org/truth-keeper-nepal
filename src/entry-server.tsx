import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import App from "./App";
import "./i18n/config";

export interface RenderContext {
  url: string;
  queryClient?: QueryClient;
}

export async function render(context: RenderContext) {
  const { url, queryClient = new QueryClient() } = context;

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  );

  // Dehydrate the query client state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return {
    html,
    dehydratedState,
  };
}
