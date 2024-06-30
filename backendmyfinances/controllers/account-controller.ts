import Account from "../models/account-model";
import { Request,Response } from "express";
export const createUser = async(req: Request,res: Response)=>{


    try {
        const newAccount = new Account(req.body);
        await newAccount.save();
        res.status(200).json(newAccount);

    } catch (error) {
        res.status(500).json({error: error})
    }
}