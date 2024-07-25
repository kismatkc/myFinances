
import { act } from "react";
import {  create } from "zustand";



type NewAccountState= {
isOpen: boolean,
actionType: string,
onOpen: (actionType: string)=> void;
onClose: ()=> void;
}
//use on prefix before methods to change the state 
 const useAddNewAccountModal =  create<NewAccountState>((set)=>({
isOpen: false,
actionType: "",
onOpen: (action: string)=> set({isOpen: true,actionType: action}),
onClose: ()=> set({isOpen: false})

}))

export default useAddNewAccountModal

