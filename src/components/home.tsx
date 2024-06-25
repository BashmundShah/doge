import { useState, useEffect, useCallback } from "react";
import { Loader, ServerCrash } from "lucide-react";
import DogCard from "./ui/dogCard";

export default function Home() {
  const [breeds, setBreeds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBreeds = useCallback(() => {
    setIsLoading(true);
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setBreeds(data.message);
        } else {
          throw new Error("Unable to fetch breeds.");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

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
    <div className="flex flex-wrap justify-center items-center my-8 gap-x-4 gap-y-6">
      {Object.keys(breeds).map((breed) => (
        <DogCard key={breed} breed={breed} />
      ))}
    </div>
  );
}
