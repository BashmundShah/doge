import { capitalize } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function DogCard({ breed }: { breed: string }) {
  const [imageUrl, setImageUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const data = await response.json();
      if (data.status === "success") {
        setImageUrl(data.message);
      }
    };

    const currentCardRef = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (currentCardRef && entry.isIntersecting) {
            fetchImage();
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
      className="flex flex-col justify-center bg-card items-center px-4 py-5 border border-solid border-border rounded-lg w-60 cursor-pointer hover:shadow hover:-translate-y-1 hover:scale-105 transition-transform duration-200 hover:border-primary"
    >
      {imageUrl ? (
        <img
          className="rounded-lg object-cover h-48 w-48"
          src={imageUrl}
          alt={breed}
          loading="lazy"
        />
      ) : (
        <div className="rounded-lg h-48 w-48 animate-pulse bg-accent" />
      )}
      <span className="text-base mt-4">{capitalize(breed)}</span>
    </div>
  );
}
