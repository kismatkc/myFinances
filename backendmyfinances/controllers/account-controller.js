import Account from "../models/account-model.js";
import accountData from '../data/account.js';
import fs from "fs"
import path from "path"
import {  fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const fullPathToData = path.join(__dirname,"../data/account.js");

const writeToFile = (data)=>{
    fs.writeFileSync(fullPathToData,`export default ${JSON.stringify(data,null,3)};`)
}


export const deleteUser = async(req,res)=>{
   

try {
     const deleteAccount = new Set(req.body.data);
     const newAccountData = accountData.filter(
       (item) => !item.id === deleteAccount.has(item.id)
     );
     writeToFile(newAccountData);
} catch (error) {
    console.log("backkend error",error)
}

res.status(200).json({success: "account created"})
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

accountData.push(req.body);
    
    
    writeToFile(accountData)
  
res.status(200).json(accountData);
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}

export const updateUser = async(req,res)=>{
try {

let accountData = req.body
    console.log(accountData);

res.status(200).json(accountData);
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}
