import Transaction from "../models/transaction-model.js"
import { connectToDatabase } from "../server.js";


export const getTransactions = async(req,res)=>{

   try {
      await connectToDatabase();
      const transactions = await Transaction.find({});
     
      res.status(200).json(transactions)
   } catch (error) {
        console.log(error, "Couldnot get the acccounts");
        res.status(500).json({ error });
   }


   
 }
 
 export const createTransaction = async(req,res)=>{
const transactionDetails = req.body;
const convertAmountToNumber = parseFloat(transactionDetails.amount)

 
 try {
    await connectToDatabase();
   const newTransaction = new Transaction({...transactionDetails,amount: convertAmountToNumber});
   await newTransaction.save();
   console.log(newTransaction)
   res.status(200).json({newTransaction})
 } catch (error) {
    console.log(error,"please provide correct transaction details");
       res.status(500).json({ error });
 }
 }