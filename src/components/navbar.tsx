import { ModeToggle } from "@/components/modeToggle";
import { Dog } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full h-12 z-10">
      <div className="flex justify-between item-center w-full">
        <span className="text-xl font-semibold sm:ml-6 flex items-center space-x-2">
          <Dog />
          <span className="text-primary">Doge</span>Picker
        </span>
        <ModeToggle />
      </div>
      <hr className="w-full mt-1" />
    </div>
  );
}
