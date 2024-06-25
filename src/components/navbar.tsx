import { ModeToggle } from "@/components/modeToggle";

export default function Navbar() {
  return (
    <div className="w-full h-12">
      <div className="flex justify-between item-center w-full my-2">
        <span className="text-xl font-semibold sm:ml-6">Doge Picker</span>
        <ModeToggle />
      </div>
      <hr className="w-full" />
    </div>
  );
}
