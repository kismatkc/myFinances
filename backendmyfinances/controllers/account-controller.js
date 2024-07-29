import Account from "../models/account-model.js";
import { connectToDatabase } from "../server.js";






export const deleteUser = async(req,res)=>{
   

try {
     




}catch(error){


    


}
}

export const getUser = async(req,res)=>{


    try {

    

}catch(error){


    


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

export const updateUser = async(req,res)=>{
try {
     


}catch(error){


    


}
}
