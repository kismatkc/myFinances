import Account from "../models/account-model.js";
import accountData from '../data/account.js';
import fs from "fs"
import path from "path"

const fullPathToData = path.join(__dirname,"../data/account.js");

const writeToFile = (data)=>{
    fs.writeFileSync(fullPathToData,`export default ${JSON.stringify(data,null,2)};`)
}

export const getUser = async(req,res)=>{


    try {
   
      
        res.status(200).json(accountData);

    } catch (error) {
        res.status(500).json({error: error})
    }
}


export const createUser = async(req,res)=>{
try {

createdUser = req.body
    writeToFile(createUser)
res.status(200).json(createdUser);
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}
