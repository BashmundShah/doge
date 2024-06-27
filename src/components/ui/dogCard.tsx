import { fetchRandomgDogImageByBreed } from "@/api/api";
import { capitalize } from "@/lib/utils";
import { Dog } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

type DogCardProps = {
  breed: string;
};

export default function DogCard({ breed }: DogCardProps) {
  const [imageUrl, setImageUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const isSelected = useParams().breed === breed;

  useEffect(() => {
    const setImage = async () => {
      const { message, status } = await fetchRandomgDogImageByBreed(breed);
      if (status === "success") {
        setImageUrl(message);
      }
    };

    const currentCardRef = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (currentCardRef && entry.isIntersecting) {
            setImage();
            observer.unobserve(currentCardRef);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in the viewport
    );

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.disconnect();
      }
    };
  }, [breed]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col justify-center bg-card items-center px-4 py-5 border border-solid border-border rounded-lg w-60 cursor-pointer hover:shadow hover:-translate-y-1 hover:scale-105 transition-transform duration-200 hover:border-primary ${
        isSelected
          ? "ring ring-primary dark:ring-0 dark:shadow-lg dark:shadow-primary"
          : ""
      }`}
      onClick={() => {
        setTimeout(() => {
          if (cardRef.current)
            cardRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
        }, 200);
      }}
    >
      {imageUrl ? (
        <img
          className="rounded-lg object-cover h-48 w-48"
          src={imageUrl}
          alt={breed}
          loading="lazy"
        />
      ) : (
        <div className="rounded-lg h-48 w-48 bg-accent flex justify-center items-center">
          <Dog className="h-16 w-16" />
        </div>
      )}
      <span className="text-base mt-4">{capitalize(breed)}</span>
    </div>
  );
}
