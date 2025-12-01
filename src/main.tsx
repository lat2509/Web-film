import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
