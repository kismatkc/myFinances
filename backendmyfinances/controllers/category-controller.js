import Category from "../models/category-model.js";
import categoryData from '../data/category.js';
import fs from "fs"
import path from "path"
import {  fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const fullPathToData = path.join(__dirname,"../data/category.js");

const writeToFile = (data)=>{
    fs.writeFileSync(fullPathToData,`export default ${JSON.stringify(data,null,3)};`)
}


export const deleteUser = async(req,res)=>{
   

try {
     const deleteAccount = new Set(req.body.data);
     const newCategoryData = categoryData.filter(
       (item) => !item.id === deleteAccount.has(item.id)
     );
     writeToFile(newCategoryData);
} catch (error) {
    console.log("backkend error",error)
}

res.status(200).json({success: "category created"})
}

export const getUser = async(req,res)=>{


    try {
   
      
        res.status(200).json(categoryData);

    } catch (error) {
        res.status(500).json({error: error})
    }
}


export const createUser = async(req,res)=>{
try {

accountData.push(req.body);
    
    
    writeToFile(categoryData);
  
res.status(200).json(categoryData);
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}

export const updateUser = async(req,res)=>{
try {
const {name,id} = req.body;

const patchedCategoryData = categoryData.map((category) => {
  if (category.id === id) {
    category.name = name;
  }
  return category;
});
writeToFile(patchedCategoryData);

res.status(200).json({patchedCategory: req.body});
} catch (error) {
    console.log("data not recievd")
    res.status(500).json({error: "data not recieved"})
}
}
