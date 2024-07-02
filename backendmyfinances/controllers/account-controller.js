import Account from "../models/account-model.js";
export const createUser = async(req,res)=>{


    try {
        // const newAccount = new Account(req.body);
        // await newAccount.save();
        let newAccount = {
            a: "5",
            b: "6"
        }
        res.status(200).json(newAccount);

    } catch (error) {
        res.status(500).json({error: error})
    }
}

