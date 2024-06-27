import { TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="text-lg h-screen w-full flex justify-center items-center">
      <TriangleAlert size={48} />
      <span className="ml-2">404 Page Not Found</span>
    </div>
  );
}
