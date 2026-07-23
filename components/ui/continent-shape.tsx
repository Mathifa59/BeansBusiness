import { cn } from "@/lib/utils";

const PATHS: Record<string, string> = {
  northAmerica:
    "M10,5 C30,2 55,8 70,20 C80,28 75,40 65,45 C70,55 60,65 50,62 C45,75 35,85 28,75 C20,80 10,70 15,55 C5,45 8,25 10,5 Z",
  europe:
    "M20,10 C40,5 60,8 75,15 C85,20 80,30 70,28 C75,35 65,40 60,35 C65,45 55,50 48,42 C50,55 38,60 35,48 C25,55 15,45 18,32 C8,28 10,15 20,10 Z",
  latam:
    "M40,5 C55,5 65,12 68,25 C72,40 65,55 60,65 C58,80 50,95 45,90 C40,98 35,85 38,70 C30,60 28,45 32,30 C28,18 32,8 40,5 Z",
  asia: "M15,15 C40,5 70,8 90,18 C95,28 88,35 92,45 C85,55 75,50 70,58 C60,65 65,75 50,72 C40,80 25,70 20,60 C8,55 5,40 10,28 C5,22 8,16 15,15 Z",
  middleEast:
    "M30,10 C50,8 70,15 75,30 C78,42 70,55 60,65 C50,72 40,68 35,58 C25,55 20,45 22,35 C15,28 20,15 30,10 Z",
};

interface ContinentShapeProps {
  region: keyof typeof PATHS;
  className?: string;
}

export function ContinentShape({ region, className }: ContinentShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <path d={PATHS[region]} fill="currentColor" />
    </svg>
  );
}
