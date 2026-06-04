import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCodigo(year: number, count: number): string {
  const padded = String(count).padStart(6, "0");
  return `LR-${year}-${padded}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
