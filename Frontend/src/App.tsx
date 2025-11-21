import HomePage from "./pages/HomePage";
import LogsPage from "./pages/LogsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      {/* Change to <LogsPage /> depending on what you’re working on */}
    </div>
  );
}

export default App;
