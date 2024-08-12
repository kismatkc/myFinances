import {Account,Category} from "../models/account-category-model.js";
import { connectToDatabase } from "../server.js";






export const deleteUser = async(req,res)=>{
   console.log("deleteUser",req.body)
const {data,modelName} = req.body
    let deleteAccount = null;
    try {
    await connectToDatabase();
  
     
     if (modelName === "Account"){
   deleteAccount =await Account.deleteMany({_id: {$in: data}})
            
     } else{
        
        deleteAccount =await Category.deleteMany({_id: {$in: data}})
            
     }
        res.status(200).json(deleteAccount);
    }catch(error){


        res.status(500).json({message:error})


    }
}

export const getUser = async(req,res)=>{
const {modelName} = req.query
    
let getAllAccountNames = null;
    try {
        await connectToDatabase();
        if (modelName === "Account"){

getAllAccountNames = await Account.find({},"name")
              
        } else{
 getAllAccountNames = await Category.find({},"name")
              
        }
        res.status(200).json(getAllAccountNames);
      

}catch(error){


    res.status(500).json({message:"error"})


}
}


export const createUser = async(req,res)=>{
    const {name,modelName} = req.body;
    console.log(modelName)
    let newAccount = null;
try {

await connectToDatabase()
    if (modelName === "Account"){
     newAccount = new Account({
        name: name
    });
        
    }else{
newAccount = new Category({
        name: name
    });
        
        
    }
    
    await newAccount.save();

    
    res.status(200).json({newAccount: newAccount})
   

}catch(error){

res.status(500).json({error: error})

    


}
}

export const updateUser =  async (req,res)=>{
    const {_id,name,modelName} = req.body
    console.log(modelName)
    let updatedAccount = null;
    try {
       await connectToDatabase();
      if (modelName === "Account"){
          updatedAccount =  await Account.findByIdAndUpdate(_id,{name},{new: true,runValidators: true})
  
      }
        else{
updatedAccount =  await Category.findByIdAndUpdate(_id,{name},{new: true,runValidators: true})

            
        }
          
    res.status(200).json(updatedAccount)
        }catch(error){
    
    
            res.status(500).json({message:error})
    
    
        }
}
