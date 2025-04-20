import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUiStore } from "./store";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient();

export const App = () => {
  const theme = useUiStore().theme;

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Navbar />
        <Home />
      </main>
    </QueryClientProvider>
  );
};
