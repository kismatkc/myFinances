

import {  create } from "zustand";
type defaultValuesProps = {
        date: string;
          accountId: {label:string,value: string};
          categoryId: {label:string,value: string};
          payee: string;
          amount: number ;
          notes?: string ;
          _id: string;
    }

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
   defaultValues : {
    date: string;
      accountId: {label:string,value: string};
      categoryId: {label:string,value: string};
      payee: string;
      amount: number ;
      notes?: string ;
      _id: string;
},

    setEditFormValues: (transaction: defaultValuesProps)=> void;
    

}
//use on prefix before methods to change the state 
 const useAddNewAccountModal =  create<NewAccountState>((set)=>({
isOpen: false,
actionType: "",
   _id: "",
   currentFieldValue: "",
    updatedcurrentFieldValue: "string",

    defaultValues: {
        date: "",
        accountId: {label: "",value: ""},
        categoryId: {label: "",value: ""},
        payee: "",
        amount: 0,
        notes: "",
        _id: "",
      },

onOpen: (action: string)=> set({isOpen: true,actionType: action}),
onClose: ()=> set({isOpen: false}),
    setId: (accountId: string) => set({ _id: accountId}),
    setNewName: (currentFieldValue: string) => set({ currentFieldValue: currentFieldValue })
     ,
     setEditFormValues: (transaction: defaultValuesProps)=> set({ defaultValues: transaction })
    

}))

export default useAddNewAccountModal

