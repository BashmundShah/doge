import { Loader, ServerCrash } from "lucide-react";
import DogCard from "./ui/dogCard";
import { Link, Outlet, useParams } from "react-router-dom";
import { useBreeds } from "@/context/useBreed";

export default function Home() {
  const breed = useParams().breed;
  const { breeds, isLoading, error } = useBreeds();

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <span>Loading</span>
        <Loader size={48} className="animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <span className="mb-4">{error}</span>
        <ServerCrash
          size={48}
          className="animate-[bounce_1s_ease-in-out_2.5]"
        />
      </div>
    );

  return (
    <div className="h-full flex overflow-hidden">
      <div
        className={`flex-wrap justify-center items-center py-8 gap-x-4 gap-y-6 w-full grow overflow-y-auto ${
          breed ? "sm:flex hidden" : "flex"
        }`}
      >
        {Object.keys(breeds).map((breed, index) => (
          <Link to={breed} key={index}>
            <DogCard key={breed} breed={breed} />
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
