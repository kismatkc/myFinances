import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertToMiliamounts(amountToBeConverted: string){
  const convertedAmount = parseFloat(amountToBeConverted) * 1000;


  return convertedAmount;
}



export function convertFromMiliamounts(amountToBeConverted: string){
  const convertedAmount = parseFloat(amountToBeConverted) / 1000;


  return convertedAmount;
}