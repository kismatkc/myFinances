
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
}
//use on prefix before methods to change the state 
 const useAddNewAccountModal =  create<NewAccountState>((set)=>({
isOpen: false,
actionType: "",
   _id: "",
   currentFieldValue: "",
    updatedcurrentFieldValue: "string",

onOpen: (action: string)=> set({isOpen: true,actionType: action}),
onClose: ()=> set({isOpen: false}),
    setId: (accountId: string) => set({ _id: accountId}),
    setNewName: (currentFieldValue: string) => set({ currentFieldValue: currentFieldValue })

}))

export default useAddNewAccountModal

