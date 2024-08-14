import Transaction from "../models/transaction-model.js"
import { connectToDatabase } from "../server.js";


export const getTransactions = async(req,res)=>{

   try {
      await connectToDatabase();
      const transactions = await Transaction.find({}).populate([
        "categoryId",
        "accountId",
      ]);
      const finalTransactions = transactions.map(({date,payee,categoryId,accountId,notes,transactionId,amount,_id}) => {
        
       
        return { date,payee,notes,  categoryId,accountId,transactionId,amount,_id};
      });

   
    
    
      
      res.status(200).json(finalTransactions);
   } catch (error) {
        console.log(error, "Couldnot get the acccounts");
        res.status(500).json({ error });
   }


   
 }
 
 export const createTransaction = async(req,res)=>{
const transactionDetails = req.body;
const convertAmountToNumber = parseFloat(transactionDetails.amount)
console.log(transactionDetails)
 
 try {
    await connectToDatabase();

   
const newTransaction = new Transaction({...transactionDetails,amount: convertAmountToNumber,accountId: transactionDetails.accountId.value,categoryId: transactionDetails.categoryId.value});
   
   await newTransaction.save();
   console.log(newTransaction)
  res.status(200).json({newTransaction})
 } catch (error) {
    console.log(error,"please provide correct transaction details");
       res.status(500).json({ error });
 }
 }



 export const deleteTransaction = async (req, res) => {

   const  transactions  = req.body;
   
   try {
     await connectToDatabase();

     
     const deleteTransaction = await Transaction.deleteMany({ _id: { $in: transactions } });
  
     res.status(200).json(deleteTransaction);
   } catch (error) {
     res.status(500).json({ message: error });
   }
 };
