import Account from "../models/account-model.js";
let newAccount= {};
let createdUser = {};
export const getUser = async(req,res)=>{


    try {
   
         newAccount = {
            a: "5",
            b: "6"
        }
        res.status(200).json(newAccount);

    } catch (error) {
        res.status(500).json({error: error})
    }
}


export const createUser = async(req,res)=>{
try {

createdUser = req.body
    console.log(createdUser)
res.status(200).json(createdUser);
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}
