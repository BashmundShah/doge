import { fetchBreedList } from "@/api/api";
import { Breeds } from "@/lib/utils";
import React, { createContext, useState, useEffect, useCallback } from "react";

type BreedContextType = {
  breeds: Breeds;
  isLoading: boolean;
  error: string;
};

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined
);

export default function BreedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [breeds, setBreeds] = useState<Breeds>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBreeds = useCallback(async () => {
    setIsLoading(true);
    const { message, status } = await fetchBreedList();
    try {
      if (status === "success") {
        setBreeds(message);
      } else {
        throw new Error("Unable to fetch breeds.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    Object.keys(breeds).length === 0 && fetchBreeds();
  }, [fetchBreeds, breeds]);

  return (
    <BreedContext.Provider value={{ breeds, isLoading, error }}>
      {children}
    </BreedContext.Provider>
  );
}
