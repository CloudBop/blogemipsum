import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>{(
      // provide React Query client to App
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
