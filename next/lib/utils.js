import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utility function for formatting dates
export const formatDate = (date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
  }).format(new Date(date));
};