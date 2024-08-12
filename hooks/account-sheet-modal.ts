
import { act } from "react";
import {  create } from "zustand";



type NewAccountState= {
isOpen: boolean,

onOpen: (actionType: string)=> void;
onClose: ()=> void;
  

  //edit related props
  actionType: string,
  _id: string,
  currentFieldValue: string,
   updatedcurrentFieldValue: string,
   setId: (id: string)=> void,
   setNewName: (currentFieldValue: string) => void,


   //transaction realted props
   defaultValues: {
    date: Date;
    accountId: {
        value: string;
        label: string;
    };
    categoryId: {
        value: string;
        label: string;
    };
    payee: string;
    amount: string;
    notes?: string | undefined;
}

}
//use on prefix before methods to change the state 
 const useAddNewAccountModal =  create<NewAccountState>((set)=>({
isOpen: false,
actionType: "",
   _id: "",
   currentFieldValue: "",
    updatedcurrentFieldValue: "string",

    defaultValues: {
        date: null as unknown as Date,
        accountId: {value: "",label:""},
        categoryId: {value: "",label: ""},
        payee: "",
        amount: "",
        notes: "",
      },

onOpen: (action: string)=> set({isOpen: true,actionType: action}),
onClose: ()=> set({isOpen: false}),
    setId: (accountId: string) => set({ _id: accountId}),
    setNewName: (currentFieldValue: string) => set({ currentFieldValue: currentFieldValue })

}))

export default useAddNewAccountModal

