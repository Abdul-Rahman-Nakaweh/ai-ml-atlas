import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function normalizeArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
