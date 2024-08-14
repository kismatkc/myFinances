export function convertFromMiliamounts(amountToBeConverted){
    if(!amountToBeConverted) return 0
    const convertedAmount = amountToBeConverted / 1000;
  
  
    return convertedAmount;
  }

  export function convertToMiliamounts(amountToBeConverted){
    if(!amountToBeConverted) return 0
    const convertedAmount = amountToBeConverted * 1000;
  
  
    return convertedAmount;
  }