import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Dog, X } from "lucide-react";
import { useBreeds } from "@/context/useBreed";
import { capitalize } from "@/lib/utils";

export default function BreedDetails() {
  const breed = useParams().breed;
  const navigate = useNavigate();
  const { breeds } = useBreeds();

  // Redirect to home if breed is not a string or not in the breeds list
  if (typeof breed !== "string" || !breeds[breed]) {
    navigate("/");
    return null;
  }

  const subBreeds = breeds[breed];

  return (
    <div className="w-full grow flex justify-between py-8">
      <div className="w-full flex flex-col space-y-8 px-8">
        <span className="text-3xl font-mono text-center w-full">
          {capitalize(breed)}
        </span>
        {subBreeds.length ? (
          <div className="flex flex-col space-y-2 grow overflow-y-auto">
            <span className="text-xl">Sub-breeds:</span>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {subBreeds.map((subBreed, index) => (
                <span key={subBreed} className="text-lg mx-2">
                  {`${index + 1}) ${capitalize(subBreed)}`}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <Dog className="w-24 h-24 animate-[bounce_1s_ease-in-out_2.5]" />
            <span>No sub-breed found.</span>
          </div>
        )}
      </div>
      <Button
        variant={"outline"}
        onClick={() => {
          navigate("/");
        }}
      >
        <X />
      </Button>
    </div>
  );
}
