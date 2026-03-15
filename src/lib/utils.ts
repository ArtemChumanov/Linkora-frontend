import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copy = (arg: string) => {
  if (navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(arg);
  }
};
