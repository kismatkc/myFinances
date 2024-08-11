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
  if(!amountToBeConverted) return 0
  const convertedAmount = parseFloat(amountToBeConverted) / 1000;


  return convertedAmount;
}

export function formatCurrency(currencyToBeFormatted: number) {
  if(!currencyToBeFormatted) return 
  const convertedCurrency = Intl.NumberFormat("en-US",{
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(currencyToBeFormatted)
  


  return convertedCurrency;
}