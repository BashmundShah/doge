import { Outlet } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/modeToggle";

function App() {
  return (
    <div className="flex p-2 relative">
      <div>hello world</div>
      <Button>Click me</Button>
      <Outlet />
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </div>
  );
}

export default App;
