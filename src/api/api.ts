import { Breeds } from "@/lib/utils";

type dogImageResponse = {
  message: string;
  status: string;
};

type BreedResponse = {
  message: Breeds;
  status: string;
};

export const fetchRandomgDogImageByBreed = async (breed: string) => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const data: dogImageResponse = await response.json();
  return data;
};

export const fetchBreedList = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: BreedResponse = await response.json();
  return data;
};
