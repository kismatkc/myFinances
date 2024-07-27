
import { act } from "react";
import {  create } from "zustand";



type NewAccountState= {
isOpen: boolean,

onOpen: (actionType: string)=> void;
onClose: ()=> void;
  

  //edit related props
  actionType: string,
  id: string,
  setId: (id: string)=> void
}
//use on prefix before methods to change the state 
 const useAddNewAccountModal =  create<NewAccountState>((set)=>({
isOpen: false,
actionType: "",
   id: "5",
onOpen: (action: string)=> set({isOpen: true,actionType: action}),
onClose: ()=> set({isOpen: false}),
   setId: (accountId: string)=> set({id: accountId})

}))

export default useAddNewAccountModal

