import "./App.css";
import Navbar from "@/components/navbar";
import Home from "@/components/home";

function App() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <Navbar />
      <div className="h-full overflow-y-auto">
        <Home />
      </div>
    </div>
  );
}

export default App;
