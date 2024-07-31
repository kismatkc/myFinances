import Account from "../models/account-model.js";
import { connectToDatabase } from "../server.js";






export const deleteUser = async(req,res)=>{
   

    try {
    await connectToDatabase();
  
     
        
   const deleteAccount =await Account.deleteMany({_id: {$in: req.body.data}})
            res.status(200).json(deleteAccount);

    }catch(error){


        res.status(500).json({message:error})


    }
}

export const getUser = async(req,res)=>{


    try {
await connectToDatabase();
    const getAllAccountNames = await Account.find({},"name")
        res.status(200).json(getAllAccountNames);

}catch(error){


    res.status(500).json({message:"error"})


}
}


export const createUser = async(req,res)=>{
try {
console.log(req.body);
await connectToDatabase()
    const {name} = req.body;
    const newAccount = new Account({
        name: name
    });
    await newAccount.save();

    
    res.status(200).json({newAccount: newAccount})
   

}catch(error){

res.status(500).json({error: error})

    


}
}

export const updateUser =  async (req,res)=>{
    try {
       await connectToDatabase();
      
          const {_id,name} = req.body
          console.log(_id,name);
          
            
    const updatedAccount =  await Account.findByIdAndUpdate(_id,{name},{new: true,runValidators: true})
  
                res.status(200).json(updatedAccount);
          
    
        }catch(error){
    
    
            res.status(500).json({message:error})
    
    
        }
}
