import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { MasterProvider } from "./context/MasterContext";
import useRouteElements from "./routes/useRouteElements";
import theme from "./theme";
import React from "react";
import { LoadingProvider } from "./provider/loading.provider";
import { LoadingModule } from "./components/Loading";

export default function App() {
  const queryClient = new QueryClient();
  const routeElements = useRouteElements();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MasterProvider>
            <LoadingProvider>
              <LoadingModule />
              {routeElements}
            </LoadingProvider>
          </MasterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
