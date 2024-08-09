import Transaction from "../models/transaction -model";
import { connectToDatabase } from "../server";


export const getTransactions = async(req,res)=>{



   
 }
 
 export const createTransaction = async(req,res)=>{
 const transactionDetails = req.body;

 console.log(transactionDetails);
 
//  try {
//     await connectToDatabase();
//    const newTransaction = new Transaction(transactionDetails);
//    await newTransaction.save();
//  } catch (error) {
//     console.log(error,"please provide correct transaction details");
    
//  }
 }