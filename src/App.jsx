import "./App.css";
import Api from "./Api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PUT from "./PUT";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <main className="h-fit">
        <QueryClientProvider client={queryClient}>
          <Api />
          <PUT />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default App;
