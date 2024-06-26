import { useContext } from "react";
import { BreedContext } from "./breedProvider";

export const useBreeds = () => {
  const context = useContext(BreedContext);
  if (context === undefined) {
    throw new Error("useBreeds must be used within a BreedProvider");
  }
  return context;
};
